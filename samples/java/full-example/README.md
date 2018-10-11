# Java service account sample

## Installation
From this directory run `gradle build`

## Usage
This example shows how to use the Connected Cars GraphQL API.
A `ConnectedCarsApi` class is provided under `io.connectedcars.api`.
The `Config` class from `io.connectedcars.sample` shows how to make a singleton of the `ConnectedCarsApi` class, which can be used throughout your project. This means you don't have to query the Connected Cars auth API every time you want to call the GraphQL API.

The `Config` class loads the Connected Cars service account data from a file, but this could of course be substituted by querying a database, by having the entirety of the service account data in an environment variable, or whatever else you choose.

Connected Cars has two different environments you can call: a staging and a production environment. To change endpoint you change the `CC_API_ENDPOINT` and the `CC_AUTH_API_ENDPOINT` environment variables which are used in the `Config` class.
In this sample the environment varialbes are set through `build.gradle` in the root.

How to use the API is shown in the `Sample` class in `io.connectedcars.sample`. You get the API from the Config class, to make sure you use the same instance of the class everywhere in your project. Then you can call the API by invoking the `call` method like so:

``` java
public static void main(String[] args) {
        try {
            ConnectedCarsApi CCApi = Config.getCCApi();
            String result = CCApi.call("query Viewer { viewer { id email firstname } }");
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

The `ConnectedCarsApi` Class takes care of converting your serviceaccount info into a token, the caching of the token, and refreshing your token.

## Try out the example against the staging environment
If your service account file is named `connectedcars_serviceaccount.pem` and is in the root of the project then you don't have to change anything.
Otherwise, find the path to your Connected Cars service account file and enter it into the environment variable `SERVICE_ACCOUNT_KEY_FILE` in the `build.gradle` in the root.

Start the example with `gradle sample`. This will query your user details and print them.

To call the production environment simply change the endpoints in `build.gradle` in the root.
The production endpoints are:
`auth: https://auth-api.connectedcars.io/auth/login/serviceAccountConverter`
`api: https://api.connectedcars.io/graphql`

## IntelliJ IDEA
You should be able to import the folder `full-example` as an existing gradle project in IntelliJ and simply have everything set up for you for through the built-in gradle setup. You can then run the `sample` task through gradle in IntelliJ as well.


TODO: Include information about the GraphQL API itself.
