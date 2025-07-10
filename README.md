# Connected Cars Documentation

Public documentation and sample code for integration with Connected Cars

## Integrations

List of common integrations for markets.

[Read more here](./integrations/intro)

## Organization Key (`organizationKey`): Multi-Market and Region Isolation

The Organization Key (`organizationKey`) is a globally unique identifier (GUID).
It defines which market or country your data belongs to and guarantees that all IDs are correctly scoped and isolated across regions. 

[Read more here](./multi-region-integrations.md)


## Auth API

The auth API provides a RESTful API that gives access to registering, authorizing and in a limited capacity manage users.

[Read more here](./auth-api.md)

## GraphQL API

The GraphQL API provides a pull API that gives access to all collected parameters with a flexible extraction.

[Read more here](https://api.connectedcars.io/graphql/graphiql/)

Sample code and service account creation:

* [Java](./samples/java/full-example/README.md)
* [NodeJS](./samples/node/README.md)

Source code: https://github.com/connectedcars/docs/tree/master/samples/

[See deprecations](./api-deprecations.md)

## Push (data streams)

The push api integration provides a close to real time data stream for all the collected parameters, and makes it possible to manage which exact vehicles to get data from.

[Read more here](./push-v2.md)

## Workshop

The "Frontend API" for the Workshop product. Explains how to prefill forms, pre-select buttons, etc.

[Read more here](./workshop.md)

## FTPS/SFTP

Legacy integration can be done with FTPS and SFTP but we try to avoid it.

## Data overview

* [English](./data-overview/english.md)

## Push (legacy)

The push api provides a close to real time data steam for all the collected parameters.

[Read more here](./push.md)
