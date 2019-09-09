# Webhook integration

## Endpoints

Events will be pushed to the endpoint URL defined in organization settings in the workshop tool. Preferably the URL contains some non-guessable string unique to this integration.

Request Headers:
* `X-Request-Id`: Identifier for this request
* `Authorization`: Authorization header storing a [JWT](https://jwt.io/) containing the request identifier signed with a private key corresponding to the public key found at http://api.connectedcars.io/public-key

Acceptable return HTTP codes:
* 200: Messages have been consumed successfully
* not 200: Something went wrong, retry

Requests will be retried 3 times after 20 seconds delay. If no response is received on the first 3 retry attempts, each following attempt is made afterwards with an exponential backoff starting at 2 minutes.

Messages will be sent one at a time. Order is not guaranteed, but timestamps are included in the messages.

Requests should only be rejected in case you have issues parsing, validating or storing the event, for example not recognizing the VIN should not result in a rejection as this is a configuration synchronization issue and not related to the transfer of the messages.

## Event structure

Every event will contain an event identifier, the type of event, a timestamp and a data object.

The timestamp defines when the action triggering the webhook occurred. The data object can be an empty object.

|   Name    |   Type   |  Unit/Format    | Example | Description |
|:---------:|:--------:|:---------------:|---------|-------------|
| id        | string   | ID              | `90123e1c-7512-523e-bb28-76fab9f2f73d` | Event identifier |
| type      | string   | utf8            | `vehicle_activated` | Event type |
| time      | string   | RFC 3339        | `2019-08-06T13:37:00.000Z` | Event time |
| data      | object   | -               | `{ "vin": "WVWZZZ3HZKE123456" }` | Type specific data |

## Events

### Vehicle activated

|   Name    |   Type   |  Unit/Format    | Example | Description |
|:---------:|:--------:|:---------------:|---------|-------------|
| vin       | string   | utf8            | `WVWZZZ3HZKE123456` | Vehicle identification number |

Example payload:
```json
{
  "id": "90123e1c-7512-523e-bb28-76fab9f2f73d",
  "type": "vehicle_activated",
  "time": "2019-08-06T13:37:00.000Z",
  "data": {
    "vin": "WVWZZZ3HZKE123456"
  }
}
```

### Vehicle deactivated

|   Name    |   Type   |  Unit/Format    | Example | Description |
|:---------:|:--------:|:---------------:|---------|-------------|
| vin       | string   | utf8            | `WVWZZZ3HZKE123456` | Vehicle identification number |

Example payload:
```json
{
  "id": "90123e1c-7512-523e-bb28-76fab9f2f73d",
  "type": "vehicle_deactivated",
  "time": "2019-08-06T13:37:00.000Z",
  "data": {
    "vin": "WVWZZZ3HZKE123456"
  }
}
```

## Future features

### Vehicle unit dismounted

|   Name    |   Type   |  Unit/Format    | Example | Description |
|:---------:|:--------:|:---------------:|---------|-------------|
| vin       | string   | utf8            | `WVWZZZ3HZKE123456` | Vehicle identification number |

Example payload:
```json
{
  "id": "90123e1c-7512-523e-bb28-76fab9f2f73d",
  "type": "vehicle_unit_dismounted",
  "time": "2019-08-06T13:37:00.000Z",
  "data": {
    "vin": "WVWZZZ3HZKE123456"
  }
}
```
