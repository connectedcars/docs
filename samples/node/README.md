# Node service account sample

## Installation
`npm install`

## Usage
This example shows how to use the Connected Cars API.  
A `ConnectedCarsApi` class is provided in the `connectedcarsapi.js` file.  
The `config.js` file shows how to make a singleton of the `ConnectedCarsApi` class, which can be used throughout your project. Doing this means you don't have to query the CC auth API everytime you want to call the GraphQL API.  

The `config.js` file shows how to load the Connected Cars service account data from a file, but this could of course be substituted by querying a database, by having the entirety of the service account data in an environment variable, or whatever else you choose. 

Connected Cars has two different environments you can call: a staging and a production environment. In this example the environment is chosen in `config.js` using an environment variable `process.env.CC_ENVIRONMENT`. If no environment is provided to the `ConnectedCarsApi` class it will default to the staging environment. To use the production environment use the string `production` in any casing.

How to use the API is shown in `index.js`. You import the API from the `config.js` file to make sure you use the same instance of the class everywhere in your project. Then you can call the API by invoking the `call` method like so:

``` js
const { getConnectedCarsApi } = require('./config')

const example = async () => {
  const CCApi = await getConnectedCarsApi()
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

## Try out the example
If your file is named `connectedcars_serviceaccount.pem` and is in the root of the project then you don't have to change anything.  
Otherwise, find the path to your Connected Cars serviceaccount file and enter it into the environment variable `SERVICE_ACCOUNT_KEY_FILE` in the start script of package.json.  

Start the example by calling `npm start`. This will query some user details and print them, then it sets the user name of your service account to `api-tester` and prints that.  


TODO: Include information about the GraphQL API itself.