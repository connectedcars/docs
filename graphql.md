# GraphQL API

Our GraphQL API server is compliant with the GraphQL Spec: https://github.com/graphql/graphql-spec

Relevant links:
- [GraphiQL](https://api.connectedcars.io/graphql/graphiql/)
- [See API deprecations](./api-deprecations.md)
- [Introduction to GraphQL by The GraphQL Foundation](https://graphql.org/learn/)

## Sample code:
Source code: https://github.com/connectedcars/docs/tree/master/samples/

## Schema

Our `Schema` is available at https://api.connectedcars.io/graphql

## Authentification

For multi-market and region integrations, also take a look at [Multi-Market Integrations](./multi-market-integrations.md)

### Service account creation:
To be able to use the GraphQL, a service account is needed:

* [README in Java](./samples/java/full-example/README.md)
* [README in NodeJS](./samples/node/README.md)

### Bearer token header:
- Most operations require the `authorization: Bearer <token>`. 
- The `<token>` needed can be obtained after logging in via your [Service Account](#service-account-creation)

### Organization header:
- Most operations require the `x-organization-namespace` header

Example with bearer token + organization namespace header. 
https://github.com/connectedcars/docs/blob/877b8bb69da3bb66a4b408e8df5c964680f9869e/samples/node/src/connected-cars-api.js#L125-L130



## Uploading files

Some of the `Mutations` in our GraphQL `Schema` support uploading files. 

### File size limit
Every single file is limited to a `5MB` size. 

### Request format: 

> ⚠️ Important: Files should always be at the end of the format data (body)

* The request needs to be a `POST` with [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) `multipart/form-data`
* Form fields:
	1. `operationName`
	2. `query`
	3. `variables`
	4. `file`

* The `file` field needs to be **appended at the end** of the form data. 


#### Example curl:



```sh
curl 'https://api.connectedcars.io/graphql?operationName=AddAttachment' \
  --compressed \
  -X POST \
  -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NIsImtpZCI6IjIifQ.<truncated>' \
  -H 'x-organization-namespace: connectedcars:workshop' \
  -H 'Content-Type: multipart/form-data; boundary=----geckoformboundarye383ecdafba223829c043b47c11671ef' \
  --data-binary \
  $'<FORM_DATA_BODY_HERE>'
```


#### Example format data body:
```txt
-----------------------------336064377694250546081541533
Content-Disposition: form-data; name="operationName"

AddAttachment
-----------------------------336064377694250546081541533
Content-Disposition: form-data; name="query"

mutation AddAttachment($input: AddAttachmentInput!, $first: Int, $last: Int, $before: Cursor, $after: Cursor, $orderBy: MessageOrder) {
  addAttachment(input: $input) {
    id
    isRead
    isClosed
    messages(
      first: $first
      last: $last
      before: $before
      after: $after
      orderBy: $orderBy
    ) {
      ...ConversationMessageFields
      __typename
    }
    ...MessagePreview
    __typename
  }
}

fragment ConversationMessageFields on MessagesResult {
  pageInfo {
    __typename
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
  items {
    __typename
    ... on Message {
      id
      isSystemMessage
      content
      time
      __typename
    }
    ... on Note {
      id
      content
      time
      __typename
    }
    ... on Activity {
      id
      action
      time
      __typename
    }
    ... on Attachment {
      id
      fileUrl
      time
      __typename
    }
    ... on Quote {
      id
      title
      expirationDate
      useBookingUrl
      attachmentUrl
      __typename
    }
  }
  __typename
}

-----------------------------336064377694250546081541533
Content-Disposition: form-data; name="variables"

{"input":{"fromFleetId":null,"fromWorkshopId":"274","conversationId":"54215"},"first":25}
-----------------------------336064377694250546081541533
Content-Disposition: form-data; name="file"; filename="this-is-fine.0.jpg"
Content-Type: image/jpeg

(...file content bytes)
-----------------------------336064377694250546081541533--
```




### Supported file types:
For security reasons we restrict file uploads. See OWASP guidelines: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

Supported file types:
```ts
CSV, JPEG, JPG, GIF,PDF ,PNG, TXT, XLS, XLSX
```

### Mutation specific file types:
Each `Mutation` can have in it's description a subset of these file types that is allowed. 

As a general rule:
 - A `Mutation` that handle images will be restricted to the image types from the list of [Supported file types](#supported-file-types) (``` JPEG, JPG, PNG```) 
 - A `Mutation` that uploads documents will be restricted to the document types from the list of [Supported file types](#supported-file-types) (```CSV, PDF, TXT, XLS, XLSX```)




