const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const { JwtUtils } = require('@connectedcars/jwtutils')
const axios = require('axios')

const _readServiceAccountFile = async fileName => {
  const fileContent = await readFileAsync(fileName, {
    encoding: 'utf8'
  })

  const [ccInfo, rsa] = fileContent.split(
    '----- END CONNECTEDCARS INFO -----\n'
  )

  const ccRegex = /----- BEGIN CONNECTEDCARS INFO -----\niss: (.*)\naud: (.*)\nkid: (.*)\n/
  const [totalMatch, iss, aud, kid] = ccInfo.match(ccRegex)

  if (!(iss && aud && kid)) {
    throw new Error('Malformed service account file')
  }

  return {
    iss,
    aud,
    kid,
    rsa
  }
}

const _getServiceToken = async ccServiceAccountFile => {
  try {
    const parsedServiceAccountInfo = await _readServiceAccountFile(
      ccServiceAccountFile
    )

    const unixNow = Math.floor(Date.now() / 1000)

    let jwtHeader = {
      typ: 'JWT',
      alg: 'RS256',
      kid: parsedServiceAccountInfo.kid
    }

    let jwtBody = {
      aud: parsedServiceAccountInfo.aud,
      iss: parsedServiceAccountInfo.iss,
      iat: unixNow,
      exp: unixNow + 3600
    }

    let jwt = JwtUtils.encode(parsedServiceAccountInfo.rsa, jwtHeader, jwtBody)

    const res = await axios.default.post(
      'https://auth-api.staging.connectedcars.io/auth/login/serviceAccountConverter', // change to prod
      { token: jwt }
    )
    if (!res.data.token) {
      throw new Error('No token returned')
    }
    return res.data
  } catch (err) {
    throw new Error(`Error response status: ${err.response.status}`)
  }
}

class ConnectedCarsToken {
  /**
   * Set path to Connected Cars service account file
   * @param {string} ccServiceAccountKeyFileData
   */
  constructor(ccServiceAccountKeyFileData) {
    this._ccAccessToken = null
    this._ccServiceAccountKeyFileData = ccServiceAccountKeyFileData
  }

  /**
   * Get Connected Cars Access Token
   * @returns {Promise<string>}
   */
  async getAccessToken() {
    const now = Date.now()
    if (
      !this._ccAccessToken ||
      this._ccAccessToken.expires < now + 5 * 60 * 1000
    ) {
      this._ccAccessToken = await _getServiceToken(
        this._ccServiceAccountKeyFileData
      )
    }
    return this._ccAccessToken.token
  }

  async clearToken() {
    this._ccAccessToken = null
  }
}

const CCToken = new ConnectedCarsToken(process.env.SERVICE_ACCOUNT_KEY_FILE)

/**
 * Call the Connected Cars GraphQL api
 * @param {Object} graphQlInput Should be valid graphql input, such as `query User {user(id:52163) {id firstname} }`
 * @returns {Promise<Object>} returns a graphql response such as user: {id: "52163", firstname: null}
 * @throws an error if the call to the cc api fails, if the cc service file is malformed, or if the cc auth api cannot validate your credentials
 */
const call = async graphQlInput => {
  const bearerToken = await CCToken.getAccessToken()

  const config = {
    headers: { Authorization: 'Bearer ' + bearerToken }
  }
  const query = {
    query: graphQlInput
  }

  try {
    const result = await axios.default.post(
      'https://api.staging.connectedcars.io/graphql',
      query,
      config
    )
    return result.data.data
  } catch (err) {
    // Retry once with a new token in case of 401
    if (err.response && err.response.status === 401) {
      await CCToken.clearToken()
      const newBearerToken = await CCToken.getAccessToken()
      const newConfig = {
        headers: { Authorization: 'Bearer ' + newBearerToken }
      }
      const result = await axios.default.post(
        'https://api.connectedcars.io/graphql',
        graphQlInput,
        newConfig
      )
      return result.data.data
    }
    throw err
  }
}

module.exports = { call }
