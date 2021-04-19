# Auth API documentation
The auth API makes it possible to register users, authorize users, manage users and more via a RESTful interface.

The base URL for production is `https://auth-api.connectedcars.io`. Most requests requires an organization namespace header which can be found either in the first party clients or via your contact within Connected Cars.

An access token granted by this service is formatted as a JWT and normally have a lifetime of one hour while having the option of being exchanged for a new access token up to one hour after expiration. For system-to-system integrations or other setups with a requirement for automatic authorization, there is either the option of using a service account or a device token.

If nothing else is specified, the parameters listed are required.

## Endpoints

### Register user via email/password
Registers a user in the specified organization namespace.

```
POST /auth/register/email
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `email` | string | body | - |
| `password` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/register/email \
  -d '{"email":"email","password":"password"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Register user via Apple
Registers a user via Apple in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/register/apple
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/register/apple \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Register user via Azure AD
Registers a user via Azure AD in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/register/azure
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/register/azure \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Register user via Facebook
Registers a user via Facebook in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/register/facebook
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/register/facebook \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Register user via Google
Registers a user via Google in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/register/google
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/register/google \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Register user via Volkswagen ID
Registers a user via Volkswagen ID in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/register/we-id
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/register/we-id \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Login via email/password
Logs in a user in the specified organization namespace.

```
POST /auth/login/email/password
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `email` | string | body | - |
| `password` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/email/password \
  -d '{"email":"email","password":"password"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Login via Apple
Logs in a user via Apple in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/login/apple
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/apple \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Login via Azure AD
Logs in a user via Azure AD in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/login/azure
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/azure \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Login via Facebook
Logs in a user via Facebook in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/login/facebookConverter
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/facebookConverter \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Login via Google
Logs in a user via Google in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/login/googleConverter
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/googleConverter \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Login via Volkswagen ID
Logs in a user via Volkswagen ID in the specified organization namespace. This requires client credentials matching the server credentials for the organization namespace.

```
POST /auth/login/we-id
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/we-id \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Refresh access token
Returns a new access token authorized by a previous access token expired at most one hour ago.

```
GET /auth/tokenRefresh
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X GET \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/auth/tokenRefresh
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Initiate password recovery
Initiates a password recovery flow which will send an email to user with a link to set a new password.

```
POST /auth/recover/password/init
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `email` | string | body | - |
| `state` | string | body | - |
| `redirectUrl` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/recover/password/init \
  -d '{"email":"email","state":"state","redirectUrl":"redirectUrl"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "status": "ok"
}
```

### Complete password recovery
Completes a password recovery flow by setting a new password.

```
POST /recover/password/change
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `newPassword` | string | body | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/recover/password/change \
  -d '{"newPassword":"newPassword","token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600,
  "state": "{\"some\":\"value\"}",
  "redirectUrl": "https://app.minvolkswagen.dk/login"
}
```

### Get user information
Returns information about the logged in user.

```
GET /user/info
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X GET \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/info
```

#### Response
```
Status: 200 OK
```

```json
{
  "id": 1,
  "email": "john@connectedcars.dk",
  "mobile": "+4512345678",
  "facebookId": null,
  "hasDeprecatedFb": false,
  "googleId": null,
  "firstname": "John",
  "lastname": "Doe",
  "lang": "en"
}
```

### Update user information
Updates information on the logged in user. This should primarily be used for changing the password. Other operations can be performed via the [GraphQL API](https://api.connectedcars.io/graphql/graphiql/).

```
PATCH /user/update
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `firstname` | string | body | Optional. |
| `lastname` | string | body | Optional. |
| `email` | string | body | Optional. |
| `mobile` | string | body | Optional. |
| `lang` | string | body | Optional. |
| `password` | string | body | Optional. |
| `oldPassword` | string | body | Must be supplied along with `password`. Otherwise ignored. |

#### Code samples

```sh
curl \
  -X PATCH \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/update \
  -d '{"firstname":"firstname","lastname":"lastname","email":"email","mobile":"mobile","lang":"lang","password":"password","oldPassword":"oldPassword"}'
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### Link user with Apple
Links logged in user to Apple.

```
POST /user/link/apple
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/link/apple
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "token"
}
```

### Unlink user from Apple
Unlinks logged in user from Apple.

```
POST /user/unlink/apple
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/unlink/apple
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### Link user with Azure AD
Links logged in user to Azure AD.

```
POST /user/link/azure
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/link/azure
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "token"
}
```

### Unlink user from Azure AD
Unlinks logged in user from Azure AD.

```
POST /user/unlink/azure
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/unlink/azure
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### Link user with Facebook
Links logged in user to Facebook.

```
POST /user/link/facebook
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/link/facebook
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "token"
}
```

### Unlink user from Facebook
Unlinks logged in user from Facebook.

```
POST /user/unlink/facebook
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/unlink/facebook
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### Link user with Google
Links logged in user to Google.

```
POST /user/link/google
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/link/google
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "token"
}
```

### Unlink user from Google
Unlinks logged in user from Google.

```
POST /user/unlink/google
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/unlink/google
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### Link user with Volkswagen ID
Links logged in user to Volkswagen ID.

```
POST /user/link/we-id
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/link/we-id
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "token"
}
```

### Unlink user from Volkswagen ID
Unlinks logged in user from Volkswagen ID.

```
POST /user/unlink/we-id
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/unlink/we-id
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### List devices
Returns the devices registered for the logged in user. The `deviceToken` returned in the response only contains the first identifying part of the actual token used for authorizing the device.

```
GET /user/devices
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |

#### Code samples

```sh
curl \
  -X GET \
  -H "X-Organization-Namespace: organization:namespace" \
  -H "Authorization: Bearer TOKEN" \
  https://auth-api.connectedcars.io/user/devices
```

#### Response
```
Status: 200 OK
```

```json
[
  {
    "deviceModel": "iPhone 11 Pro",
    "deviceName": "John's iPhone",
    "deviceToken": "deviceTokenWithoutKeyPart",
    "lastLogin": "2021-08-06T12:00:00.000Z"
  }
]
```

### Register device
Registers a device for the logged in user.

```
POST /user/registerDevice
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `deviceName` | string | body | Optional but recommended. |
| `deviceModel` | string | body | Optional but recommended. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/user/registerDevice \
  -d '{"deviceName":"deviceName","deviceModel":"deviceModel"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "deviceModel": "iPhone 11 Pro",
  "deviceName": "John's iPhone",
  "deviceToken": "deviceToken"
}
```

### Login via device token
Logs in a user via a device token in the specified organization namespace. The device token can be obtained by registering a device.

```
POST /auth/login/deviceToken
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `deviceToken` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/deviceToken \
  -d '{"deviceToken":"deviceToken"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### Delete device
Deletes a device registered to the logged in user.

```
POST /user/deleteDevice
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `Authorization` | string | header | Use format `Bearer TOKEN`. |
| `deviceExternalId` | string | body | The `deviceToken` field from the `GET /user/devices` response. |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/user/deleteDevice \
  -d '{"deviceExternalId":"deviceExternalId"}'
```

#### Response
```
Status: 200 OK
```

```json
{}
```

### Service account login
Logs in a service account in the specified organization namespace. This requires a service account set up by Connected Cars, for reference see [example in Java](https://github.com/connectedcars/docs/tree/master/samples/java/full-example).

```
POST /auth/login/serviceAccountConverter
```

#### Parameters

| Name | Type | In | Description |
|:-----|:-----|:---|:------------|
| `X-Organization-Namespace` | string | header | - |
| `token` | string | body | - |

#### Code samples

```sh
curl \
  -X POST \
  -H "X-Organization-Namespace: organization:namespace" \
  https://auth-api.connectedcars.io/auth/login/serviceAccountConverter \
  -d '{"token":"token"}'
```

#### Response
```
Status: 200 OK
```

```json
{
  "token": "JWT",
  "level": "AM1",
  "expires": 3600
}
```

### List public keys
Returns an object with valid public keys.

```
GET /pubKeys
```

#### Code samples

```sh
curl \
  -X GET \
  https://auth-api.connectedcars.io/pubKeys
```

#### Response
```
Status: 200 OK
```

```json
{
  "https://auth-api.connectedcars.io": {
    "kty": "RSA",
    "kid": "1",
    "alg": "RS256",
    "pem": "-----BEGIN PUBLIC KEY-----\npublicKey\n-----END PUBLIC KEY-----"
  }
}
```

## Errors
The `type` field in the error responses can be expected to be stable while the `message` field may change over time. Below are (non-exhaustive) examples of different status codes and errors you may encounter.

#### Bad Request
```
Status: 400 Bad Request
```

```json
{
  "message": "Password is too short",
  "type": "password_too_short"
}
```

#### Unauthorized
```
Status: 401 Unauthorized
```

```json
{
  "message": "JWT verification error",
  "type": "jwt_verify_error"
}
```

#### Forbidden
```
Status: 403 Forbidden
```

```json
{
  "message": "User is archived",
  "type": "user_archived"
}
```

#### Not Found
```
Status: 404 Not Found
```

```json
{
  "message": "User not found",
  "type": "user_not_found"
}
```

#### Method Not Allowed
```
Status: 405 Method Not Allowed
```

```json
{
  "message": "Invalid CORS origin",
  "type": "invalid_cors_origin"
}
```

#### Conflict
```
Status: 409 Conflict
```

```json
{
  "message": "Email already exists",
  "type": "email_exists"
}
```

#### Too Many Requests
Use the `Retry-After` response header to determine the amount of seconds to wait before retrying.

```
Status: 429 Too Many Requests
```

```json
{
  "message": "Too many login attempts",
  "type": "too_many_requests"
}
```

#### Internal Server Error
```
Status: 500 Internal Server Error
```

```json
{
  "message": "Internal server error",
  "type": "internal_server_error"
}
```

## Rate limiting
You might get rate limited if you run too many requests against this API. If you hit the rate limit, you will get an error message with the status code 429. This response will include a `Retry-After` header indicating how many seconds you at the least need to wait before making another request.
