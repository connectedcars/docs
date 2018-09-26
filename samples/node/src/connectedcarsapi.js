const axios = require('axios')
const { JwtUtils } = require('@connectedcars/jwtutils')

const _readServiceAccountData = ccServiceAccountKeyData => {
  const [ccInfo, rsa] = ccServiceAccountKeyData.split(
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

const _getToken = async (parsedServiceAccountInfo, authApiEndpoint) => {
  try {
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

    const res = await axios.default.post(authApiEndpoint, { token: jwt })
    if (!res.data.token) {
      throw new Error('No token returned')
    }
    return res.data
  } catch (err) {
    throw err
  }
}

class ConnectedCarsApi {
  /**
   * Create an instance of the Connected Cars api, which can be used to call the GraphQL api. Requires specifying service account key data and an environment
   * @param {string} ccServiceAccountKeyData a string containing the Connected Cars service account data
   * @param {string} [endpoint] specify the connected cars api endpoint, default is production endpoint
   * @param {string} [authEndpoint] specify the connected cars auth endpoint, default is production endpoint
   * @throws an error if the service account data is malformed
   */
  constructor(
    ccServiceAccountKeyData,
    endpoint = 'https://api.connectedcars.io/graphql',
    authEndpoint = 'https://auth-api.connectedcars.io/auth/login/serviceAccountConverter'
  ) {
    this._API_ENDPOINT = endpoint
    this._AUTH_API_ENDPOINT = authEndpoint
    this._ccAccessToken = null
    this._parsedServiceAccountInfo = _readServiceAccountData(
      ccServiceAccountKeyData
    )
  }

  /**
   * Gets a Connected Cars access token, if you want to interact with the api without using the call() method
   * @returns {Promise<string>}
   * @throws an error if the CC auth api cannot validate your credentials
   */
  async getAccessToken() {
    const now = Date.now()
    if (
      !this._ccAccessToken ||
      this._ccAccessToken.expires < now + 5 * 60 * 1000
    ) {
      this._ccAccessToken = await _getToken(
        this._parsedServiceAccountInfo,
        this._AUTH_API_ENDPOINT
      )
    }
    return this._ccAccessToken.token
  }

  /**
   * Clears the Connected Cars token, which will force a refetch next time call() is used.
   * This is done automatically in case the token is invalid on a call()
   */
  async _clearToken() {
    this._ccAccessToken = null
  }

  /**
   * Call the Connected Cars GraphQL api
   * @param {Object} graphQLInput Should be valid graphql input, such as `query User {user(id:52163) {id firstname} }`
   * @returns {Promise<Object>} returns a graphql response such as user: {id: "52163", firstname: null}
   * @throws an error if the call to the CC api fails, or if the CC auth api cannot validate your credentials
   */
  async call(graphQLInput) {
    const bearerToken = await this.getAccessToken()

    const config = {
      headers: { Authorization: 'Bearer ' + bearerToken }
    }
    const query = {
      query: graphQLInput
    }

    try {
      const result = await axios.default.post(this._API_ENDPOINT, query, config)
      return result.data.data
    } catch (err) {
      // Retry once with a new token in case of 401
      if (err.response && err.response.status === 401) {
        await this._clearToken()
        const newBearerToken = await this.getAccessToken()
        const newConfig = {
          headers: { Authorization: 'Bearer ' + newBearerToken }
        }
        const result = await axios.default.post(
          this._API_ENDPOINT,
          graphQLInput,
          newConfig
        )
        return result.data.data
      }
      throw err
    }
  }
}

module.exports = ConnectedCarsApi
