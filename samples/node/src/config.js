const fs = require('fs')
const ConnectedCarsApi = require('./connected-cars-api')

const CC_API_ENDPOINT = process.env.CC_API_ENDPOINT
const CC_AUTH_API_ENDPOINT = process.env.CC_AUTH_API_ENDPOINT
const ORGANIZATION_NAMESPACE = process.env.ORGANIZATION_NAMESPACE

// Read the config however you like
const ccConfig = fs.readFileSync(process.env.SERVICE_ACCOUNT_KEY_FILE, {
  encoding: 'utf8'
})

const CCApi = new ConnectedCarsApi(ccConfig, CC_API_ENDPOINT, CC_AUTH_API_ENDPOINT, ORGANIZATION_NAMESPACE)

module.exports = CCApi
