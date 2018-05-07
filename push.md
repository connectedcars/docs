# Push integration

## Endpoints

Messages will be pushed to different endpoints depending on type:

* Account URL: https POST endpoint where account feed will be pushed
* Car URL: https POST endpoint where car feed will be pushed

URL's should be provided for staging/testing and production environments.

Request Headers:

* `X-Request-Id`: Identifier for this request

Acceptable return http codes:

* 200: Messages have been consumed successfully
* not 200: Something went wrong, retry

Requests will be retried 3 times after 20 seconds delay. If no response is received on the first 3 retry attempts, each following attempt is made afterwards with an exponential back off starting at 2 minutes.

Messages will be sent in bulk of up to 1000 at a time, in case of failure the full bulk will be retried. Which means you should discard the entire request, if you return anything other than 200.

Requests should only be rejected in case you have issues parsing, validating or storing the full bulk, fx. not knowing a carId should not result in rejection as this is a configuration synchronization issue and not related to the transfer of the messages.

## IDs

The ID format should be treated as an ascii string which is case insensitive and holds at most 64 characters

## Scopes

The feed will only output information corresponding the the requested and authorized scope, the scopes a service can request is:

* `user_name`
* `user_email`
* `vehicle_license_plate`
* `vehicle_make`
* `vehicle_model`
* `vehicle_ignition`
* `vehicle_position`
* `vehicle_odometer`
* `vehicle_fuel_level`
* `vehicle_fuel_consumed`

## User Consents

Once your application is listed as a service provider in our third party section, users will be able to connect their vehicle to your system.

Once a user initiates the connection to your application, two things will happen, first, we will initiate the sending of the account feed and car feed, as defined by the given scope. This will happen from our backend servers to your feed urls as you have provided. Secondly, the user will be prompted to continue on to your application service URL to finish the sign up. This happens via a redirect, where you will be able to ask the user for additinoal sign up info, as needed.

The redirect point to the service URL which you have provided: `${serviceUrl}?userId=${userId}&carId=${carId}`

## Account feed

### user_signup message - New user sign up

|   Name    |   Type   |  Unit/Format    | Example                               |          Description                             |
|:---------:|:--------:|:---------------:|---------------------------------------|--------------------------------------------------|
| userId    | string   | ID              | 90123e1c-7512-523e-bb28-76fab9f2f73d  | User id                                          |
| firstName | string   | utf8            | Test Middlename                       | User first names (Requires `user_name` scope)    |
| lastName  | string   | utf8            | Testsen                               | User last name (Requires `user_name` scope)      |
| email     | string   | utf8            | test@testsen.dk                       | User e-mail (Requires `user_email` scope)        |

Cars:

|   Name        |   Type   |  Unit/Format     | Example                              |          Description                                         |
|:-------------:|:--------:|:----------------:|--------------------------------------|--------------------------------------------------------------|
| carId         | string   | ID               | 90123e1c-7512-523e-bb28-76fab9f2f73d | Car id                                                       |
| make          | string   | utf8             | Audi                                 | Car make (Requires `vehicle_make` scope)                     |
| model         | string   | utf8             | Q2 Sport                             | Car model (Requires `vehicle_model` scope)                   |
| year          | string   | utf8             | 2009                                 | Car model year (Requires `vehicle_model` scope)              |
| licensePlate  | string   | utf8             | AB12345                              | Car license plate (Requires `vehicle_license_plate` scope)   |

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

### car_add message - Car was added

``` json
[
    {
        "type": "car_add",
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

### car_remove message - Car was removed

``` json
[
    {
        "type": "car_remove",
        "userId": "90123e1c-7512-523e-bb28-76fab9f2f73d",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
    }
]
```

## Car feed

### Standard information on all messages

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| carId    | string   |                     | 3bbcee75-3bbcee75        | Car id reference                                |
| time     | datetime | ISO 8601            | 2017-05-19T18:31:03.000Z | Time the data was recorded                      |
| type     | string   |                     | ignition_on              | String enum describing event type               |

### ignition_on message - Ignition on

This message type requires the `vehicle_ignition` scope

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

This message type requires the `vehicle_ignition` scope

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

This message type requires the `vehicle_position` scope


|   Name    |   Type        |  Unit/Format        | Example              |                   Description                   |
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

This message type requires the `vehicle_odometer` scope


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



### fuel_level message - Tank fuel level

This message type requires the `vehicle_fuel_level` scope

Nb: Fuel levels reported by each cars, note that this is only reported in whole liters

|    Name    |   Type   |  Unit/Format        | Example              |                   Description                   |
|:----------:|:--------:|:-------------------:|----------------------|-------------------------------------------------|
| fuel_level | decimal  | whole liters        | 40                   | Fuel level as reported by the car               |


``` json
[
    {
        "type": "fuel_level",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
        "time": "2017-01-01T12:30:10Z",
        "fuel_level": 40
    }
]
```



### fuel_consumed message - Fuel consumed since unit installation

This message type requires the `vehicle_fuel_consumed` scope

|      Name     |   Type   |  Unit/Format        | Example              |                   Description                   |
|:-------------:|:--------:|:-------------------:|----------------------|-------------------------------------------------|
| fuel_consumed | decimal  | liters              | 57.23                | Fuel consumption since unit instalation         |


``` json
[
    {
        "type": "fuel_consumed",
        "carId": "3bbcee75-cecc-5b56-8031-b6641c1ed1f1",
        "time": "2017-01-01T12:30:10Z",
        "fuel_level": 57.23
    }
]
```

### WORK IN PROGRESS

This section is for apis that are currently beeing developed or in our road map


#### Error and warning lamps
#### Error codes and Diagnostic Trouble Codes


|      Name     |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:-------------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| vendor        | string   | string              | VAG                      | Which vendor the code comes from                |
| type          | string   | string              | OBD2                     | Describes the type of error code                |
| description   | string   | string              | Tire preasure warning    | Human redable translation of the error          |
| code          | string   | SAE code            | P001                     | Translated error code                           |
| enabled       | boolean  |                     | true                     | Indicates if the error is currently present     |


#### Driver profiling events (Acceleration, Breaking, Hard Turns)
#### Engine profiling events (High / Low RPM, Idle Time)

#### door_lock message - Describes the lock state of the vehicle
#### battery_voltage message - Describes the vehicle battery voltage
#### service_interval_days message - Describes how many days must at most pass between services
#### service_interval_km message - Describes how many km must at most be driven between services
#### last_service_days message - Describes how many days has passed since the last service
#### last_service_km message - Describes how many km has been driven since the last service
#### next_oil_change_km - Describes how many km must at most be driven before next oil change
#### next_oil_change_days - Describes how many days must at most pass before next oil change
#### oil_quality_ok - Describes if the vehicle reports OK oil quality

#### Tow away alert
#### Wiper status
#### Seat belt status
#### Door open/close status