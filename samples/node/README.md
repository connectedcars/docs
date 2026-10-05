# Node service account sample

## Installation
`npm install`

## Getting access to the API

In order to give you access Connected Cars will create a service account for you.  
A service account has data that looks like the following:

```
----- BEGIN CONNECTEDCARS INFO -----
iss: XXX@XXX.serviceaccount.connectedcars.io
aud: https://auth-api.connectedcars.io/auth/login/serviceAccountConverter
kid: YYY
----- END CONNECTEDCARS INFO -----
-----BEGIN ZZZ PRIVATE KEY-----
YOU_CREATE_THIS
-----END ZZZ PRIVATE KEY-----
```

After you receive your service account data you must generate an asymmetric key pair. Refer to the documentation [here](../GenerateAsymmetricKeyPair.md).

Now put your unencrypted private key into the key block of your service account data (also make sure to update the header `-----BEGIN ZZZ PRIVATE KEY-----` and footer `-----END ZZZ PRIVATE KEY-----` by replacing `ZZZ`). Then send Connected Cars your public key, your algorithm of choice (e.g. ed25519 or RSA), and the key size if relevant (e.g. 4096). After confirmation from Connected Cars you will have access to the staging environment. After confirming that you can call the staging API you can get access to the production API.

## Usage

This example shows how to use the Connected Cars GraphQL API.  
A `ConnectedCarsApi` class is provided in the `connectedcarsapi.js` file.  
The `config.js` file shows how to make a singleton of the `ConnectedCarsApi` class, which can be used throughout your project. This means you don't have to query the Connected Cars auth API everytime you want to call the GraphQL API.  

The `config.js` file shows how to load the Connected Cars service account data from a file, but this could of course be substituted by querying a database, by having the entirety of the service account data in an environment variable, or whatever else you choose. 

Connected Cars has two different environments you can call: a staging and a production environment. By default the production environment is called. To change this you change the `CC_API_ENDPOINT` and the `CC_AUTH_API_ENDPOINT` which are used in `config.js`. If no environment is provided to the `ConnectedCarsApi` class will default to the production environment. This is also where you find the `ORGANIZATION_NAMESPACE` environment variable. This is used to specify organization and namespace on your requests. Ask Connected Cars for more info.

How to use the API is shown in `index.js`. You import the API from the `config.js` file to make sure you use the same instance of the class everywhere in your project. Then you can call the API by invoking the `call` method like so:

``` js
const CCApi = require('./config')

const example = async () => {
  const getFirstname = `query User {
                        viewer {
                          id
                          email
                          firstname
                        }
                      }`

  try {
    const result = await CCApi.call(getFirstname)
    console.log(result)
  } catch (err) {
    console.error('Error during CC api call')
    console.error(err)
  }
}

example()
```

The `ConnectedCarsApi` class takes care of converting your serviceaccount info into a token, the caching of the token, and refreshing your token. 

If there are other fields in the token header or body that you send they will need to conform to the following types (shown here as TypeScript types):

```
interface JwtHeader {
  typ?: string | null
  alg?: string | null
  kid?: string | null
}

interface JwtBody {
  iss?: string | null
  ons?: string | null
  sub?: string | null
  aud?: string | string[] | null
  acr?: string | null
  jti?: string | null
  sid?: string | null
  amr?: string[] | null
  exp?: number | null
  iat?: number | null
  nbf?: number | null
  clt?: number | null
  email?: string | null
  email_verified?: boolean | null
  scope?: string | string[] | null
}
```

## Try out the example against the staging environment
If your service account file is named `connectedcars_serviceaccount.pem` and is in the root of the project then you don't have to change anything.  
Otherwise, find the path to your Connected Cars service account file and enter it into the environment variable `SERVICE_ACCOUNT_KEY_FILE` in the start script of `package.json`.  

Start the example by calling `npm start`. This will query your user details and print them. Then it sets the user name of your service account to `api-tester` and prints that.

To call the production environment simply change the endpoints in `npm start` or delete the `CC_API_ENDPOINT` and `CC_AUTH_API_ENDPOINT` environment variables in `package.json` to default to production.


# TODO: Include information about the GraphQL API itself.
