# Push integration

## Endpoints

Messages will be pushed to different endpoints depending on type:

* Account URL: https POST endpoint where account feed will be pushed
* Car URL: https POST endpoint where car feed will be pushed

URLs should be provided for staging/testing and production environments.

Request Headers:

* `x-request-id`: Identifier for this request

Acceptable return http codes:

* 200: Messages have been consumed successfully
* not 200: Something went wrong, retry

Retry will be 5 times with 10 delay and back off with 1 min interval

Messages will be sent in bulk of up to 1000 at a time, in case of failure the full bulk will be retried. Which means you should discard the entire request, if you return anything other than 200.

## Account feed

### user_signup message - New user sign up

|   Name    |   Type   |  Unit/Format    | Example                               |          Description                   |
|:---------:|:--------:|:---------------:|---------------------------------------|----------------------------------------|
| userId    | string   | uuid-v5         | 90123e1c-7512-523e-bb28-76fab9f2f73d  | User id                                |
| firstName | string   | utf8            | Test Middlename                       | User first names                       |
| lastName  | string   | utf8            | Testsen                               | User last name                         |
| email     | string   | utf8            | test@testsen.dk                       | User e-mail                            |

Cars:

|   Name        |   Type   |  Unit/Format     | Example                              |          Description            |
|:-------------:|:--------:|:----------------:|--------------------------------------|---------------------------------|
| carId         | string   | uuid-v5          | 90123e1c-7512-523e-bb28-76fab9f2f73d | Car id                          |
| brand         | string   | utf8             | Audi                                 | Car brand                       |
| make          | string   | utf8             | Q2 Sport                             | Car make                        |
| licensePlate  | string   | utf8             | AB12345                              | Car license plate               |

Example payload:

``` json
[
    {
        "type": "user_signup",
        "userId": "90123e1c-7512-523e-bb28-76fab9f2f73d",
        "firstName": "Test",
        "lastName": "Testsen",
        "email": "test@testsen.dk",
        "cars": [
            {
                "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
                "brand": "Audi",
                "make": "Q2",
                "licensePlate": "AB12345"
            }
        ]
    }
]
```

### user_remove message - User was removed

``` json
[
    {
        "type": "user_remove",
        "userId": "90123e1c-7512-523e-bb28-76fab9f2f73d",
    },
]
```

### car_remove message - Car was removed

``` json
[
    {
        "type": "car_add",
        "userId": "90123e1c-7512-523e-bb28-76fab9f2f73d",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
    }
]
```

### car_add message - Car was added

``` json
[
    {
        "type": "car_remove",
        "userId": "90123e1c-7512-523e-bb28-76fab9f2f73d",
        "cars": [
            {
                "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
                "brand": "Audi",
                "make": "Q2",
                "licensePlate": "AB12345"
            }
        ]
    }
]
```

## Car feed

### Standard information on all messages

|   Name   |   Type   |  Unit/Format        | Example              |                   Description                   |
|:--------:|:--------:|:-------------------:|----------------------|-------------------------------------------------|
| carId    | integer  | integer number      | 60.0                 | Vehicle id                                      |
| time     | datetime | ISO 8601            | 2017-01-01T12:30:10Z | Time the data was recorded                      |

### ignition_on message - Ignition on

Example:

``` json
[
    {
        "type": "ignition_on",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
        "time": "2017-01-01T12:30:10Z",
    }
]
```

### ignition_off message - Ignition off

Example:

``` json
[
    {
        "type": "ignition_off",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
        "time": "2017-01-01T12:30:10Z",
    }
]
```

### position message - Position

|   Name    |   Type   |  Unit/Format        | Example              |                   Description                   |
|:---------:|:-------------:|:-------------------:|----------------------|-------------------------------------------------|
| lat       | decimal       | decimal degrees     | 51.12345             | Latitude part of vehicle position               |
| long      | decimal       | decimal degrees     | -2.12345             | Longitude part of vehicle position              |
| speed     | decimal/null  | km/h                | 60.0                 | Vehicle speed                                   |
| direction | decimal/null  | degrees             | 180.0                | Vehicle direction                               |

``` json
[
    {
        "type": "position",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
        "time": "2017-01-01T12:30:10Z",
        "lat": 51.12345,
        "lon": -2.12345,
        "direction": 260.0,
        "speed": 51.0
    }
]
```

### odometer message - Odometer

|   Name   |   Type   |  Unit/Format        | Example              |                   Description                   |
|:--------:|:--------:|:-------------------:|----------------------|-------------------------------------------------|
| odometer | decimal  | km                  | 45000.0              | Total distance travelled by vehicle since start |

``` json
[
    {
        "type": "odometer",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
        "time": "2017-01-01T12:30:10Z",
        "odometer": 123123.0
    }
]
```

### dtc message - Diagnostic Trouble Code

WORK IN PROGRESS

|   Name   |   Type   |  Unit/Format        | Example              |                   Description                   |
|:--------:|:--------:|:-------------------:|----------------------|-------------------------------------------------|
| vendor   | string   | VAG                 | 51.12345             | Latitude part of vehicle position               |
| code     | string   | SAE code            | P001                 | DTC error code                                  |
