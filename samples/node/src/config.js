const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const ConnectedCarsApi = require('./connectedcarsapi')

const createConnectedCarsApi = async () => {
  const environment = process.env.CC_ENVIRONMENT

  // Read the config however you like
  const ccConfig = await readFileAsync(process.env.SERVICE_ACCOUNT_KEY_FILE, {
    encoding: 'utf8'
  })

  return new ConnectedCarsApi(ccConfig, environment)
}
let connectedCarsApi
const getConnectedCarsApi = async () => {
  if (!connectedCarsApi) {
    connectedCarsApi = await createConnectedCarsApi()
  }
  return connectedCarsApi
}

module.exports = { getConnectedCarsApi }
