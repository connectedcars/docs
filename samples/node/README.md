# Node service account sample

## Installation
`npm install`

## Usage
Find the path to your Connected Cars serviceaccount file and enter it into the environment variable `SERVICE_ACCOUNT_KEY_FILE` in package.json.  
If your file is named `connectedcars_serviceaccount.pem` and is in the root of the project then you don't have to change anything.  
Then start the script via `npm start`. This will query some user details print them, then it sets the user name of your service account to `api-tester` and prints that.  

Wherever you want to use the Connected Cars GraphQL API in your code you can simply include it like so: 

```const CCApi = require('./connectedcarsapi')```

This is also how it is done in the example in `index.js`
The wrapper takes care of converting your serviceaccount info into a token and the caching of the token. 

You then call the api using the `call` method like so:

```
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
```

The input to the call method can by any `query` or `mutation` on the api which you have access to.

TODO: Include information about the GraphQL API itself.