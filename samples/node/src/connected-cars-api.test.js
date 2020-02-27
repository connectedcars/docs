const expect = require('unexpected')
const sinon = require('sinon')
const axios = require('axios')
const ConnectedCarsApi = require('./connected-cars-api')
const { JwtUtils } = require('@connectedcars/jwtutils')

describe('utils/cc-api/connectedcars-api.js', () => {
  const jwtHeader = {
    typ: 'JWT',
    alg: 'RS256',
    kid: '1'
  }
  // Don't use this key for anything but testing as this is the key from jwt.io
  const TEST_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw
33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW
+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB
AoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS
3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5Cp
uGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE
2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0
GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0K
Su5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY
6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5
fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523
Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aP
FaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==
-----END RSA PRIVATE KEY-----`
  beforeEach(() => {
    this.clock = sinon.useFakeTimers(new Date('2020-02-21 00:00:00'))
    const fakeServiceAccount = `----- BEGIN CONNECTEDCARS INFO -----
iss: testing@cc.serviceaccount.connectedcars.io
aud: https://auth-api.staging.connectedcars.io/auth/login/serviceAccountConverter
kid: 999
----- END CONNECTEDCARS INFO -----
-----BEGIN RSA PRIVATE KEY-----
could_totally_be_a_real_key
-----END RSA PRIVATE KEY-----`
    this.ccApi = new ConnectedCarsApi(fakeServiceAccount)
    this.postStub = sinon.stub(axios, 'post').resolves()
  })
  afterEach(async () => {
    sinon.restore()
  })

  describe('_readServiceAccountData', () => {
    it('constructor reads service account data', () => {
      expect(this.ccApi._parsedServiceAccountInfo, 'to equal', {
        iss: 'testing@cc.serviceaccount.connectedcars.io',
        aud: 'https://auth-api.staging.connectedcars.io/auth/login/serviceAccountConverter',
        kid: '999',
        rsa: '-----BEGIN RSA PRIVATE KEY-----\ncould_totally_be_a_real_key\n-----END RSA PRIVATE KEY-----'
      })
    })
    it('throws error on malformed service data', () => {
      let badServiceAccountData = 'qwerty'
      expect(() => new ConnectedCarsApi(badServiceAccountData), 'to be rejected with', 'Malformed service account file')
      badServiceAccountData = `----- BEGIN CONNECTEDCARS INFO -----
iss: testing@cc.serviceaccount.connectedcars.io
kid: 999
----- END CONNECTEDCARS INFO -----
-----BEGIN RSA PRIVATE KEY-----
could_totally_be_a_real_key
-----END RSA PRIVATE KEY-----`
      expect(() => new ConnectedCarsApi(badServiceAccountData), 'to be rejected with', 'Malformed service account file')
      badServiceAccountData = `----- BEGIN CONNECTEDCARS INFO -----
iss: testing@cc.serviceaccount.connectedcars.io
aud: https://auth-api.staging.connectedcars.io/auth/login/serviceAccountConverter
kid: 
----- END CONNECTEDCARS INFO -----
-----BEGIN RSA PRIVATE KEY-----
could_totally_be_a_real_key
-----END RSA PRIVATE KEY-----`
      expect(() => new ConnectedCarsApi(badServiceAccountData), 'to be rejected with', 'Malformed service account file')
    })
  })

  describe('_clearToken()', () => {
    it('clears token', async () => {
      this.ccApi._ccAccessToken = { token: 'stuff', expires: 123 }
      await this.ccApi._clearToken()
      expect(this.ccApi._ccAccessToken, 'to equal', null)
    })
  })

  describe('getAccessToken', () => {
    it('gets a new token if none exists and then reuses it', async () => {
      const unixNow = Date.now() / 1000

      let jwtBody = {
        aud: 'connectedcars/app',
        iss: 'https://auth-api',
        iat: unixNow,
        exp: unixNow + 3600
      }

      const jwt = JwtUtils.encode(TEST_PRIVATE_KEY, jwtHeader, jwtBody)

      // Stub encode that _getToken calls
      this.encodeStub = sinon.stub(JwtUtils, 'encode').returns('jwt')
      this.postStub.resolves({
        status: 200,
        statusText: 'success',
        data: { token: jwt, expires: 3600 }
      })
      const token = await this.ccApi.getAccessToken()
      const sameToken = await this.ccApi.getAccessToken()
      expect(token, 'to equal', sameToken)

      expect(
        token,
        'to equal',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJjb25uZWN0ZWRjYXJzL2FwcCIsImlzcyI6Imh0dHBzOi8vYXV0aC1hcGkiLCJpYXQiOjE1ODIyNDMyMDAsImV4cCI6MTU4MjI0NjgwMH0.gOdbG9xSWKvBbUx9aiO_6QB_iZh4aM2Hw2YTp4XAdqGAq40k43ytaFq26QWe3oOst7l3FyEnzEDpahwWFOoL2S_Ep-GBRhZMPq9MU00gWIPPojVga89qi4-lgEmZtlo2_AL3_wmUMc35VlWfUVmNV0iL1UVyzuLIuMpbS6OBnLQ'
      )
      expect(this.postStub.callCount, 'to be', 1)
      expect(this.postStub.args[0], 'to equal', [
        'https://auth-api.connectedcars.io/auth/login/serviceAccountConverter',
        { token: 'jwt' },
        { headers: { 'x-organization-namespace': 'semler:workshop' } }
      ])
    })
    it('does not get a new token if it is not close to expiration', async () => {
      this.ccApi._ccAccessToken = {
        expires: Date.now() + 10 * 60 * 1000,
        token: 'testToken'
      }

      const token = await this.ccApi.getAccessToken()
      const sameToken = await this.ccApi.getAccessToken()
      expect(token, 'to equal', sameToken)

      expect(this.postStub.callCount, 'to be', 0)
    })
    it('gets a new token if close to expiration', async () => {
      const unixNow = Date.now() / 1000

      let jwtBody = {
        aud: 'connectedcars/app',
        iss: 'https://auth-api',
        iat: unixNow,
        exp: unixNow + 60
      }

      let secondJwtBody = {
        aud: 'connectedcars/app',
        iss: 'https://auth-api',
        iat: unixNow,
        exp: unixNow + 3600
      }

      const jwt = JwtUtils.encode(TEST_PRIVATE_KEY, jwtHeader, jwtBody)
      const secondJwt = JwtUtils.encode(TEST_PRIVATE_KEY, jwtHeader, secondJwtBody)

      // Stub encode that _getToken calls
      this.encodeStub = sinon.stub(JwtUtils, 'encode').returns('jwt')
      this.postStub.onCall(0).resolves({
        status: 200,
        statusText: 'success',
        data: { token: jwt, expires: 60 }
      })
      this.postStub.onCall(1).resolves({
        status: 200,
        statusText: 'success',
        data: { token: secondJwt, expires: 3600 }
      })
      const token = await this.ccApi.getAccessToken()
      const anotherToken = await this.ccApi.getAccessToken()
      expect(token, 'not to equal', anotherToken)

      expect(
        token,
        'to equal',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJjb25uZWN0ZWRjYXJzL2FwcCIsImlzcyI6Imh0dHBzOi8vYXV0aC1hcGkiLCJpYXQiOjE1ODIyNDMyMDAsImV4cCI6MTU4MjI0MzI2MH0.FhPJCDUnb74DApAEoDTZcX_BaAwQtjtoeGLWVhOoS85Ihm9AECp3KQlSzqslxw9_POgsZzppRI_krud9Moo6vGKBzNyoQgfNzKLYdXEmhmE7QKN7Fdz74pzHU74ErBZMIpmtKOvR8aOoulmcnlmi7vDR-gw4pPAheKsGvPP0yyc'
      )
      expect(
        anotherToken,
        'to equal',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJjb25uZWN0ZWRjYXJzL2FwcCIsImlzcyI6Imh0dHBzOi8vYXV0aC1hcGkiLCJpYXQiOjE1ODIyNDMyMDAsImV4cCI6MTU4MjI0NjgwMH0.gOdbG9xSWKvBbUx9aiO_6QB_iZh4aM2Hw2YTp4XAdqGAq40k43ytaFq26QWe3oOst7l3FyEnzEDpahwWFOoL2S_Ep-GBRhZMPq9MU00gWIPPojVga89qi4-lgEmZtlo2_AL3_wmUMc35VlWfUVmNV0iL1UVyzuLIuMpbS6OBnLQ'
      )
      expect(this.postStub.callCount, 'to be', 2)
      expect(this.postStub.args[0], 'to equal', [
        'https://auth-api.connectedcars.io/auth/login/serviceAccountConverter',
        { token: 'jwt' },
        { headers: { 'x-organization-namespace': 'semler:workshop' } }
      ])
      expect(this.postStub.args[1], 'to equal', [
        'https://auth-api.connectedcars.io/auth/login/serviceAccountConverter',
        { token: 'jwt' },
        { headers: { 'x-organization-namespace': 'semler:workshop' } }
      ])
    })
    it('throws error on missing response data', async () => {
      this.encodeStub = sinon.stub(JwtUtils, 'encode').returns('jwt')
      this.postStub.onCall(0).resolves({
        status: 200,
        statusText: 'success',
        data: {}
      })
      await expect(() => this.ccApi.getAccessToken(), 'to be rejected with', 'No token returned')
      this.postStub.onCall(1).resolves({
        status: 200,
        statusText: 'success',
        data: { token: 'token' }
      })
      await expect(() => this.ccApi.getAccessToken(), 'to be rejected with', 'No token returned')
      this.postStub.onCall(2).resolves({
        status: 200,
        statusText: 'success',
        data: { expires: 3600 }
      })
      await expect(() => this.ccApi.getAccessToken(), 'to be rejected with', 'No token returned')
    })
  })

  describe('call', () => {
    it('gets a response from the api', async () => {
      this.postStub.resolves({ data: { data: { viewer: { firstname: 'abc' } } } })
      this.ccApi._ccAccessToken = {
        expires: Date.now() + 10 * 60 * 1000,
        token: 'testToken'
      }

      const result = await this.ccApi.call(`query Viewer {
        viewer {
          firstname
        }
      }`)
      expect(result, 'to equal', { viewer: { firstname: 'abc' } })

      expect(this.postStub.callCount, 'to be', 1)
      expect(this.postStub.args[0], 'to equal', [
        'https://api.connectedcars.io/graphql',
        { query: 'query Viewer {\n        viewer {\n          firstname\n        }\n      }' },
        { headers: { Authorization: 'Bearer testToken', 'x-organization-namespace': 'semler:workshop' } }
      ])
    })
    it('Retries on 401', async () => {
      // This gets rejected
      this.ccApi._ccAccessToken = {
        expires: Date.now() + 10 * 60 * 1000,
        token: 'badToken'
      }
      const unixNow = Date.now() / 1000

      let jwtBody = {
        aud: 'connectedcars/app',
        iss: 'https://auth-api',
        iat: unixNow,
        exp: unixNow + 3600
      }

      const jwt = JwtUtils.encode(TEST_PRIVATE_KEY, jwtHeader, jwtBody)

      // Stub encode that _getToken calls
      this.encodeStub = sinon.stub(JwtUtils, 'encode').returns('jwt')
      // API call
      this.postStub.onCall(0).rejects({ response: { status: 401 } })
      // Auth API call
      this.postStub.resolves({
        status: 200,
        statusText: 'success',
        data: { token: jwt, expires: 3600 }
      })
      // 2nd API call
      this.postStub.onCall(2).resolves({ data: { data: { viewer: { firstname: 'abc' } } } })

      const result = await this.ccApi.call(`query Viewer {
        viewer {
          firstname
        }
      }`)
      expect(result, 'to equal', { viewer: { firstname: 'abc' } })

      expect(this.postStub.callCount, 'to be', 3)
      expect(this.postStub.args[0], 'to equal', [
        'https://api.connectedcars.io/graphql',
        { query: 'query Viewer {\n        viewer {\n          firstname\n        }\n      }' },
        { headers: { Authorization: 'Bearer badToken', 'x-organization-namespace': 'semler:workshop' } }
      ])
      expect(this.postStub.args[1], 'to equal', [
        'https://auth-api.connectedcars.io/auth/login/serviceAccountConverter',
        { token: 'jwt' },
        { headers: { 'x-organization-namespace': 'semler:workshop' } }
      ])
      expect(this.postStub.args[2], 'to equal', [
        'https://api.connectedcars.io/graphql',
        { query: 'query Viewer {\n        viewer {\n          firstname\n        }\n      }' },
        {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJjb25uZWN0ZWRjYXJzL2FwcCIsImlzcyI6Imh0dHBzOi8vYXV0aC1hcGkiLCJpYXQiOjE1ODIyNDMyMDAsImV4cCI6MTU4MjI0NjgwMH0.gOdbG9xSWKvBbUx9aiO_6QB_iZh4aM2Hw2YTp4XAdqGAq40k43ytaFq26QWe3oOst7l3FyEnzEDpahwWFOoL2S_Ep-GBRhZMPq9MU00gWIPPojVga89qi4-lgEmZtlo2_AL3_wmUMc35VlWfUVmNV0iL1UVyzuLIuMpbS6OBnLQ',
            'x-organization-namespace': 'semler:workshop'
          }
        }
      ])
    })
    it('test where it throws an error since its not 401', async () => {
      const error = new Error('Request failed with status code 400')
      error.response = { status: 400 }
      this.postStub.onCall(0).rejects(error)
      this.ccApi._ccAccessToken = {
        expires: Date.now() + 10 * 60 * 1000,
        token: 'testToken'
      }

      await expect(
        () =>
          this.ccApi.call(`query Viewer {
        viewer {
          firstname
        }
      }`),
        'to be rejected with',
        {
          message: 'Request failed with status code 400',
          response: { status: 400 }
        }
      )

      expect(this.postStub.callCount, 'to be', 1)
      expect(this.postStub.args[0], 'to equal', [
        'https://api.connectedcars.io/graphql',
        { query: 'query Viewer {\n        viewer {\n          firstname\n        }\n      }' },
        { headers: { Authorization: 'Bearer testToken', 'x-organization-namespace': 'semler:workshop' } }
      ])
    })
  })
})
