# Push integration (data streams)

Events from vehicles such as gps position, ignition etc. can be pushed to your system in real time.
This is done by creating vehicle data streams and configuring an endpoint to receive the events.

## Endpoints

Events can be pushed to either an HTTPS POST endpoint or to Pub/Sub.

Events are sent in bulk and should only be rejected in case you have issues parsing, validating or storing the full bulk. I.e. not knowing a `vehicleId` should not result in rejection as this is a configuration synchronization issue and not related to the transfer of the messages. Bulks will be retried in case of failure.

Events are sent at-least once, meaning there might be duplicates.

## Event types

There's two different event types; vehicle events and admin events.

- Vehicle events: Data points from vehicles such as gps position, ignition etc.
- Admin events: Administrative events relating to access granted or revoked.

Generally both event types will be sent to the same endpoint, but this can be changed.
All admin events are enabled by default, whereas only the agreed vehicle events will be enabled.

Events are sent as a JSON array.

### Vehicle event types 

The following fields are present on all vehicle events

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| id       | 64 bit integer   |       | 458964867                | An auto incrementing ID, not unique per event since each shard has their own counter   |
| vehicleId| 32 bit integer   |       | 324122                   | Vehicle id reference                            |
| time     | datetime | RFC 3339            | 2022-05-19T18:31:03.000Z | Time the data was recorded. Millisecond precision is only available for some events |
| type     | string   |                     | car_ignition             | String enum describing event type, see types below               |

See the following list for a description of each event type.

#### calc_vehicle_idle

Vehicle is idling or not

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | boolean   |                     | false                        | whether the vehicle is idling (true) or not (false)       |

Example:

``` json
[
    {
        "type": "calc_vehicle_idle",
        "id": 433642,
        "value": false,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_adblue_remaining_distance_km

How many kilometers can be driven with the current adblue

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value       | integer   | km             | 14154                    | kilometers current adblue will last       |

Example:

``` json
[
    {
        "type": "can_adblue_remaining_distance_km",
        "id": 433642,
        "value": 14154,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_ambient_air_temperature_celsius

The temperature outside the car in degrees celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | celsius                    | 10.50                        | outside temperature in degrees celsius       |

Example:

``` json
[
    {
        "type": "can_ambient_air_temperature_celsius",
        "id": 433642,
        "value": 10.50,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_distance_with_mil_on_km

Distance driven with MIL lamp on in km

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 4352                        | distance driven with MIL lamp on in km       |

Example:

``` json
[
    {
        "type": "can_distance_with_mil_on_km",
        "id": 433642,
        "value": 4352,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_dtc

Raw vehicle diagnostic codes

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| code    | string   | DTC code in hex                    | 0001CB                        | remote diagnostic info on the vehicle       |
| diff    | string/null   | `remove`, `change`, `add` | `add`                        | whether the DTC code has been added, changed or removed       |
| status    | string/null   | status byte in hex  | 08                        | status byte of the dtc code       |
| rxId    | string/null   |                     | 77D                        | the id requested on the canbus       |
| txId    | string   |                     | 713                        | listen for response from the ecu on this id on the canbus       |
| transport    | string   | `ISOTP`, `TP2`, `ISOTP-NOPAD`,                     | `ISOTP`             | the transport protocol used to communicate with the ecu       |
| application    | string   | `UDS`, `KWP2000`,                     | `UDS`                        | the application protocol used to communicate with the ecu       |
| ecu    | string/null   | `engine`, `aircondition`, `brakes`, `central_electrics`, `driver_door`, `engine`, `gateway`, `instruments`, `transmission` | `engine`                        | from which ecu the dtc is from       |
| type    | string   | `vag`, `j2012`                    | `vag`                        | the format of the error code       |
| rxLocalId    | string/null   |                     | null                        | local id requested on the canbus       |
| txLocalId    | string/null   |                     | null                        | local id to listen for response on the canbus       |
| serviceAndDid    | string/null   | service and dids in hex   | 1902FF    | the service requested and the parameters       |
| useFunctionalAddressing    | boolean/null   |                     | null                        | use functional addressing (true) or not (false)      |
| sessionType    | string/null   |                     | 01                        | session type       |

Example:

``` json
[
    {
        "type": "can_dtc",
        "id": 433642,
        "code": "00430e",
        "diff": "change",
        "status": "68",
        "rxId": "7E8",
        "txId": "7E0",
        "transport": "ISOTP",
        "application": "UDS",
        "ecu": "engine",
        "type": "vag",
        "rxLocalId": null,
        "txLocalId": null,
        "serviceAndDid": "19028C",
        "useFunctionalAddressing": null,
        "sessionType": "01",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_engine_code

Engine code of the car

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | string   |                     | DFBA                        | the engine code of the car       |

Example:

``` json
[
    {
        "type": "can_engine_code",
        "id": 433642,
        "value": "DFBA",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_engine_coolant_temperature_celsius

The engine coolant temperature in degrees celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value  | integer   | celsius           | 75                        | temperature celsius degrees       |

Example:

``` json
[
    {
        "type": "can_engine_coolant_temperature_celsius",
        "id": 433642,
        "value": 75,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
#### can_exceeded_oil_change_days

Days passed after oil service should have been done

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 0                        | number of days after oil service should have been done       |

Example:

``` json
[
    {
        "type": "can_exceeded_oil_change_days",
        "id": 433642,
        "value": 0,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_exceeded_oil_change_km

Kilometers driven after oil service should have been done

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 380                        | km driven after oil service should have been done       |

Example:

``` json
[
    {
        "type": "can_exceeded_oil_change_km",
        "id": 433642,
        "value": 380,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_fuel_level_liters

The fuel level of the car in whole liters

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | whole liters             | 34                       | amount of liters of fuel in the vehicle     |

Example:

``` json
[
    {
        "type": "can_fuel_level_liters",
        "id": 433642,
        "value": 34,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
#### can_fuel_level_percent

The fuel level in percent in the vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value  | integer   | percent             | 68                       | percentage of fuel left in the car       |

Example:

``` json
[
    {
        "type": "can_fuel_level_percent",
        "id": 433642,
        "value": 68,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_high_voltage_battery_charge_percent

High voltage battery charge in percent

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | percent                    | 97.5                        | high voltage battery charge percent       |

Example:

``` json
[
    {
        "type": "can_high_voltage_battery_charge_percent",
        "id": 433642,
        "value": 97.5,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_high_voltage_battery_temperature_celsius

High voltage battery temperature in celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | celsius                    | 22.5                        | high voltage battery temperature in celsius       |

Example:

``` json
[
    {
        "type": "can_high_voltage_battery_temperature_celsius",
        "id": 433642,
        "value": 22.5,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_last_oil_change_days

Days since last oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 46                        | days since last oil service       |

Example:

``` json
[
    {
        "type": "can_last_oil_change_days",
        "id": 433642,
        "value": 46,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_last_oil_change_km

Km since last oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 4144                        | km since last oil service       |

Example:

``` json
[
    {
        "type": "can_last_oil_change_km",
        "id": 433642,
        "value": 4144,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_last_service_at_date

The date at the latest service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | string   | YYYY-MM-DD                    | 2014-01-03                        | date at the latest service       |

Example:

``` json
[
    {
        "type": "can_last_service_at_date",
        "id": 433642,
        "value": "2014-01-03",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_last_service_at_odometer

The odometer at the latest service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km             | 115446                        | odometer in km at latest service       |

Example:

``` json
[
    {
        "type": "can_last_service_at_odometer",
        "id": 433642,
        "value": 115446,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_last_service_days

Amount of days since last service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 207                        | days since last service       |

Example:

``` json
[
    {
        "type": "can_last_service_days",
        "id": 433642,
        "value": 207,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_last_service_km

Amount of km since last service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   |  km                   | 14700                        | km since last service       |

Example:

``` json
[
    {
        "type": "can_last_service_km",
        "id": 433642,
        "value": 14700,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_mil_lamp

[MIL](https://en.wikipedia.org/wiki/Check_engine_light) on or off

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | boolean  |                     | false                    | whether the mil lamp has turned off (false) or on (true)       |

Example:

``` json
[
    {
        "type": "can_mil_lamp",
        "id": 123,
        "value": false,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_next_oil_change_30days

Days until next oil service in 30 day increments

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days            | 300                        | days till next oil service in 30 days increments       |

Example:

``` json
[
    {
        "type": "can_next_oil_change_30days",
        "id": 433642,
        "value": 300,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_next_oil_change_days

Days until next oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value | integer   | days                    | 290                        | days till next oil service       |

Example:

``` json
[
    {
        "type": "can_next_oil_change_days",
        "id": 433642,
        "value": 290,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_next_oil_change_km

Kilometers until next oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 13100                        | km till next oil service       |

Example:

``` json
[
    {
        "type": "can_next_oil_change_km",
        "id": 433642,
        "value": 13100,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
#### can_next_service_30days

Days until next service in 30 day increments

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                     | 390                        | number of days till next service       |

Example:

``` json
[
    {
        "type": "can_next_service_30days",
        "id": 433642,
        "value": 390,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_next_service_days

Days until next service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 28                        | number of days till next service       |

Example:

``` json
[
    {
        "type": "can_next_service_days",
        "id": 433642,
        "value": 28,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_next_service_km

Kilometers until next service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 4700                        | number of km till next service       |

Example:

``` json
[
    {
        "type": "can_next_service_km",
        "id": 433642,
        "value": 4700,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_odometer_km

The odometer from the CAN of the vehicle in kilometers

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   |  whole km            | 94636                    | odometer in whole km       |

Example:

``` json
[
    {
        "type": "can_odometer_km",
        "id": 433642,
        "value": 94636,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```


#### can_odometer10_km

Odometer from CAN in 10 km increments

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km             | 67740                    | odometer in 10 km increments       |

Example:

``` json
[
    {
        "type": "can_odometer10_km",
        "id": 433642,
        "value": 67740,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_oil_change_interval_fixed_days

The number of days between oil service for fixed oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 365                        | number of days between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_fixed_days",
        "id": 433642,
        "value": 365,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
#### can_oil_change_interval_fixed_km

The number of km between oil service for fixed oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 15000                | number of km between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_fixed_km",
        "id": 433642,
        "value": 15000,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_oil_change_interval_variable_days

The maximum number of days between oil service for variable oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 730                | max number of days between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_variable_days",
        "id": 433642,
        "value": 730,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
#### can_oil_change_interval_variable_km

The maximum number of km between oil service for variable oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 30000                        | max number of km between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_variable_km",
        "id": 433642,
        "value": 30000,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_oil_change_type_is_fixed

Whether oil service is fixed or variable

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | boolean  |                     | true                        | whether the oil service is fixed (true) or not (false) |

Example:

``` json
[
    {
        "type": "can_oil_change_type_is_fixed",
        "id": 433642,
        "value": true,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_oil_degration_percent

How many percent the oil has degraded

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | percent                    | 5                        | oil degration in percent       |

Example:

``` json
[
    {
        "type": "can_oil_degration_percent",
        "id": 433642,
        "value": 5,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_service_interval_days

The car's service interval in days

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | days                    | 730                        | car service interval in days       |

Example:

``` json
[
    {
        "type": "can_service_interval_days",
        "id": 433642,
        "value": 730,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_service_interval_km

The car's service interval in km

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | km                    | 30000                        | car service interval in km       |

Example:

``` json
[
    {
        "type": "can_service_interval_km",
        "id": 433642,
        "value": 30000,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_vehicle_speed_kph

The vehicle speed in kilometers per hour

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | km/h             | 110.54                   | speed in km/h       |

Example:

``` json
[
    {
        "type": "can_vehicle_speed_kph",
        "id": 433642,
        "value": 110.54,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### can_vin

The [VIN](https://en.wikipedia.org/wiki/Vehicle_identification_number) of the vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value      | string   |                     | ZAR94000007021883        | the vehicle's VIN       |

Example:

``` json
[
    {
        "type": "can_vin",
        "id": 433642,
        "value": "ZAR94000007021883",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### car_battery_voltage

Car battery's voltage

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | volt                    | 3.989                        | voltage of the car's battery       |

Example:

``` json
[
    {
        "type": "car_battery_voltage",
        "id": 433642,
        "value": 3.989,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### car_ignition

Ignition on/off

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value  | boolean   |                     | false                     | whether the ignition was turned off (false) or on (true)       |

Example:

``` json
[
    {
        "type": "car_ignition",
        "id": 433642,
        "value": false,
        "vehicleId": "1337",
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### car_odometer_km

The odometer from the vehicle in kilometers, from CAN or gps

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value | decimal   |  km            | 94636.363                    | odometer in km       |

Example:

``` json
[
    {
        "type": "car_odometer_km",
        "id": 433642,
        "value": 94636.363,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### car_profiling

Each unit is instrumented with a gsensor that monitors the gravitational force on the car. The g-force has to be minimum 0.2 before it's getting reported by the unit.

|         Name         |   Type   |  Unit/Format                                         | Example               |                   Description                                                       |
|:--------------------:|:--------:|:----------------------------------------------------:|-----------------------|-------------------------------------------------------------------------------------|
|        gForce        | decimal  | ratio in g's                                         | 0.24                   | [gravitational force](https://en.wikipedia.org/wiki/G-force) experienced by the car |
|       direction      | string   | `acceleration`, `brake`, `turn_left`, `turn_right` appended with `_low`, `_medium`, or `_high` | `acceleration_medium`        | the direction that caused the change in gravity and a classification       |

Example:

``` json
[
    {
        "type": "car_profiling",
        "id": 433642,
        "gForce": 0.24,
        "direction": "acceleration_medium",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### daily_can_odometer_km

The daily odometer from the CAN of the vehicle in kilometers

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   |  whole km            | 94636                    | odometer in whole km       |

Example:

``` json
[
    {
        "type": "daily_can_odometer_km",
        "id": 433642,
        "value": 94636,
        "vehicleId": 1337,
        "time": "2022-01-01"
    }
]
```

#### gpio_battery_external_disconnect

Event when the unit in the vehicle is disconnected

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | boolean   |                     | true                        | the unit was disconnected (true)       |

Example:

``` json
[
    {
        "type": "gpio_battery_external_disconnect",
        "id": 433642,
        "value": true,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### gpio_battery_internal_voltage

Unit internal battery voltage

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | volt                    | 4.016                        | voltage of the internal battery       |

Example:

``` json
[
    {
        "type": "gpio_battery_internal_voltage",
        "id": 433642,
        "value": 4.016,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### gps_position

Gps position from vehicle.

The metadata and sample rate will vary based on unit provider type. For `traffilog` units the sampling interval varies depending on the travelling speed of the vehicle (according to the vendor specification, the sampling rate happens every 1 minute OR every 500 meters OR every 10 meters if the accelerometer detects a turn) - generally the sampling happens every 5 seconds but may vary up to 30 seconds. For `cc` units the sampling interval will mostly be around 4 to 5 seconds regardless of the travelling speed of the vehicle (but may be adjusted in indivudal cases) with `eph` values outside the 0-500 range being discarded on the unit.

When the vehicle is in ignition off state, the unit will normally wake every two hours and send position along with its normal heartbeat package.

This might change in the future as we constantly optimize the data collection.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| latitude | decimal   | decimal degrees             | 60.613747999999994       | Latitude of the position. NB: We work with the unaltered coordinates as floats from our GPS sensor, which can have many decimals in the coordinates. However, it should not be expected that the accuracy of the GPS positions from cars is better than around 10m. This accuracy is heavily influenced by factors such as high buildings, heavy tree cover, hills, tunnels, and parking cellars.        |
| longitude| decimal   | decimal degrees            | 17.414016999999998       | Longitude of the position. NB: We work with the unaltered coordinates as floats from our GPS sensor, which can have many decimals in the coordinates. However, it should not be expected that the accuracy of the GPS positions from cars is better than around 10m. This accuracy is heavily influenced by factors such as high buildings, heavy tree cover, hills, tunnels, and parking cellars.       |
| speed    | 16 bit integer/null   | km/h      | 50                       | The traveling speed of the vehicle when the position was recorded. This value is available based on the hardware.      |
| direction| 16 bit integer/null   | degrees      | 0                        | The degree in which the vehicle is traveling (between 0 to 360, where both 0 and 360 is north). This value may be null in cases where speed is 0, as the traveling direction of the vehicle cannot be calculated between the last two positions.       |
| eph | 16 bit integer/null | meter | 5 | "Estimated horizontal Position (2D) Error in meters. Also known as Estimated Position Error (epe). Certainty unknown." If `eph` is present, `hdop` is always null. |
| hdop | 32 bit integer/null |  | 69 | This value needs to be divided by 100. "Horizontal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get a circular error estimate." If `hdop` is present, `eph` is always null. |

Example:

``` json
[
    {
        "type": "gps_position",
        "id": 157659647,
        "vehicleId": 228745,
        "time": "2022-10-12T07:06:45.000Z",
        "latitude": 60.613747999999994,
        "longitude": 17.414016999999998,
        "speed": 3,
        "direction": 120,
        "eph": null,
        "hdop": 69
    }
]
```


### Admin event types

The following fields are present on all admin events.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| id       | 64 bit integer   |       | 458964867                | An auto incrementing ID, not unique since each shard has their own counter.   |
| time     | datetime | RFC 3339            | 2022-05-19T18:31:03.000Z | Time the data was recorded                      |
| type     | string   |                     | vehicle_added_to_fleet             | String enum describing event type, see types below               |

See the following list for a description of each event type.

#### access_granted_to_fleet

Sent when a fleet grants the integration owning the data stream access to the fleet.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| fleetId    | 32 bit integer  |              | 47583               | the id of the fleet access was granted to |

Example:

``` json
[
    {
        "type": "access_granted_to_fleet",
        "id": 123,
        "fleetId": 47583,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### access_granted_to_vehicle

Sent when a vehicle grants the integration owning the data stream access to the vehicle.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| vehicleId| 32 bit integer   |       | 324122                   | Vehicle id reference                            |

Example:

``` json
[
    {
        "type": "access_granted_to_vehicle",
        "id": 123,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### access_removed_from_fleet

Sent when a fleet removes access from the integration owning the data stream. If a fleet is completely removed from our system, this event will also be sent.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| fleetId    | 32 bit integer  |              | 47583               | the id of the fleet access was removed from |


Example:

``` json
[
    {
        "type": "access_removed_from_fleet",
        "id": 123,
        "fleetId": 47583,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### access_removed_from_vehicle

Sent when a vehicle removes access from the integration owning the data stream. This event is also sent when a vehicle is removed from a fleet, which had granted access to the integration.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| vehicleId| 32 bit integer   |       | 324122                   | Vehicle id reference                            |


Example:

``` json
[
    {
        "type": "access_removed_from_vehicle",
        "id": 123,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```


#### vehicle_added_to_fleet

Sent when a vehicle is added to a fleet. If a vehicle is moved from one fleet to another, we'll first send a `vehicle_removed_from_fleet` event followed by a `vehicle_added_to_fleet` event for the new fleet.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| fleetId    | 32 bit integer  |                  | 47583                    | the id of the fleet the vehicle was added to    |
| vehicleId| 32 bit integer   |       | 324122                   | vehicle id reference                            |

Example:

``` json
[
    {
        "type": "vehicle_added_to_fleet",
        "id": 123,
        "fleetId": 47583,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

#### vehicle_removed_from_fleet

Sent when a vehicle is removed from a fleet. If a vehicle is moved from one fleet to another, we'll first send a `vehicle_removed_from_fleet` event followed by a `vehicle_added_to_fleet` event for the new fleet.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| fleetId    | 32 bit integer  |                   | 47583                    | the id of the fleet the vehicle was removed from|
| vehicleId| 32 bit integer   |       | 324122                   | vehicle id reference                            |

Example:

``` json
[
    {
        "type": "vehicle_removed_from_fleet",
        "id": 123,
        "fleetId": 47583,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

## Managing vehicle data streams

Managing what vehicles to receive data from is done through our [GraphQL API](./README.md#graphql-api).
The GraphQL API should be called with a service account that Connected Cars will help set up.

The following actions are possible:

- List the vehicles that have consented to an integration
- Create vehicle data streams for a topic in an integration
- Get a list of current vehicle data streams
- Delete certain vehicle data streams
- Delete all vehicle data streams for some vehicles
- Modify a vehicle data stream
- Revoke access to a vehicle or fleet

Below samples are given for each action, but more documentation can be found on [GraphiQL](https://api.connectedcars.io/graphql/graphiql/).

### List the vehicles that have consented to an integration
The service account should call our GraphQL api with a query like the following:

``` graphql
query consentedIntegrationVehicles {
  consentedIntegrationVehicles(fleetIds:[1], first:2) {
    items {
      id
      vin
      unitSerial
      unitProvider
      fleetId
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}

```
This returns the first two integration vehicles from the fleet with `id` = 1.

The result could look like the following:
``` json
{
  "data": {
    "vehicles": {
      "items": [
        {
          "id": "51848",
          "vin": "ABCDEFGHIJKLMNOPQ",
          "unitSerial": "someUnitSerial",
          "unitProvider": "cc",
          "fleetId": 1
        },
        {
          "id": "51879",
          "vin": "ABCDEFGHIJKLMNOPQ",
          "unitSerial": "someUnitSerial",
          "unitProvider": "cc",
          "fleetId": 1
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "bz01MTg0OCUyMzUxODQ4",
        "endCursor": "bz01MTg3OSUyMzUxODc5"
      }
    }
  }
}
```

The resulting `endCursor` can then be used in another query with a new `after` parameter to page through the results. Paging is only necessary for large results. The `first` parameter would usually be 100.

Here's an example of paging:

``` graphql
query consentedIntegrationVehicles {
  consentedIntegrationVehicles(fleetIds:[1,2], first:2, after:"bz01MTg3OSUyMzUxODc5"){
    items {
      id
      vin
      unitSerial
      unitProvider
      fleetId
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

The query can be called with the following filters: `fleetIds` (parent fleet ids) and `vehicleIds`.
The filters can also be combined.

There are more fields available for the vehicles such as `licensePlate`, `make`, `model` etc.

### Create vehicle data streams for a topic in an integration
The service account should call our GraphQL api with a query like the following:

``` graphql
mutation addVehicleDataStreams {
  addVehicleDataStreams(input: [
	  {vehicleId: 1, integrationTopicId: 87, referenceUrl: "test.com/1" },
	  {vehicleId: 2, integrationTopicId: 87, referenceUrl: "test.com/2" }]
  ) {
      id
      vehicleId
      integrationTopicId
      referenceUrl
    }
}
```

This would add a data stream for the vehicles with ids 1 and 2 for the topic with id 87 and adds a reference url for each.
The result is a list of data streams each with their own `id` and the supplied `vehicleId`, `integrationTopicId` and `referenceUrl`. Such as:
``` json
{
  "data": {
    "addVehicleDataStreams": [
      {
        "id": 787,
        "vehicleId": 1,
        "integrationTopicId": 87,
        "referenceUrl": "test.com/1"
      },
      {
        "id": 788,
        "vehicleId": 2,
        "integrationTopicId": 87,
        "referenceUrl": "test.com/2"
      }
    ]
  }
}
```

An error is thrown if the service account does not have the correct permissions (such as access to any of the vehicles or the topic), in which case none of the data streams will be created.

An error is thrown if there are duplicates in the input, i.e. multiple entries with the same `vehicleId` and `integrationTopicId`.

If an active vehicle data stream already exists in the database, the input will be ignored, and the existing one will be returned.

### Get a list of current vehicle data streams
The service account should call our GraphQL api with a query like the following:


``` graphql
query vehicleDataStreams {
  vehicleDataStreams(first:100) {
    items {
      id
      vehicleId
      integrationTopicId
      referenceUrl
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

This will return the first 100 accessible vehicle data streams, i.e. objects with an `id`, a `vehicleId`, a `integrationTopicId`, and a `referenceUrl`. It could look like the following: 
``` json
{
  "data": {
    "vehicles": {
      "items": [
        {
          "id": 787,
          "vehicleId": 1,
          "integrationTopicId": 87,
          "referenceUrl": "test.com/1"
      	},
        {
          "id": 788,
          "vehicleId": 2,
          "integrationTopicId": 87,
          "referenceUrl": "test.com/2"
      	}
      ],
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "bz01MTg0OCUyMzUxODQ4",
        "endCursor": "bz01MTg3OSUyMzUxODc5"
      }
    }
  }
}
```

Only the vehicle data streams that the service account has access to will be returned.

An optional `integrationTopicIds` or `vehicleIds` can also be used to narrow the results, like the following:
``` graphql
query vehicleDataStreams {
  vehicleDataStreams(first:100, integrationTopicIds: [87], vehicleIds: [1,2]) {
    items {
      id
      vehicleId
      integrationTopicId
      referenceUrl
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```
It is not necessary to use both at the same time, and both can be a list with a single item or with multiple entries.

### Delete certain vehicle data streams
The service account should call our GraphQL api with a query like the following:

``` graphql
mutation deleteVehicleDataStreams {
  deleteVehicleDataStreams(input: [1,2,3,4,5] )
}

```
The above mutation will delete the vehicle data streams with ids 1,2,3,4, and 5.
The result is a boolean and looks like: 
``` json
{
  "data": {
    "deleteVehicleDataStreams": true
  }
}
```

The result should always be true, and the vehicle data streams will be deleted. An error is thrown if the service account does not have access to any of the vehicle data streams, in which case none of the data streams will be deleted.

### Delete all vehicle data streams for some vehicles

The service account should call our GraphQL api with a query like the following:
``` graphql
mutation deleteAllVehicleDataStreams {
  deleteAllVehicleDataStreams(input: { vehicleIds:[1,2,3,4,5]} )
}
```
This will delete all vehicle data streams for the five vehicles.
The result is a boolean and looks like: 
``` json
{
  "data": {
    "deleteAllVehicleDataStreams": true
  }
}
```

The result should always be true, and the vehicles' data streams will be deleted. 
Deletes all vehicle data streams for the vehicleIds for the integrations the user has permission to manage.
Does not throw an error if no vehicle data streams are deleted.
Does not throw an error if the user does not have access to any of the supplied vehicleIds. As long as the vehicle data streams are part of an integration that the user can manage, they are allowed to delete the vehicle data streams.
Throws an error if no vehicleIds are supplied.

### Modify a vehicle data stream
The service account should call our GraphQL api with a query like the following:
``` graphql
mutation updateVehicleDataStream {
 updateVehicleDataStream(input: { id: 787, referenceUrl: "newurl.com/1"} ) {
    id
    vehicleId
    integrationTopicId
    referenceUrl
  }
}
```
This will update the `referenceUrl` of the vehicle data stream with id = 787.
The result looks like this:
``` json
{
  "data": {
    "updateVehicleDataStream": {
      "id": 787,
      "vehicleId": 1,
      "integrationTopicId": 87,
      "referenceUrl": "newurl.com/1"
    }
  }
}

```

### Revoke access to a vehicle or fleet
The service account should call our GraphQL api with a query like the following:
``` graphql
mutation revokeIntegrationAccess {
 revokeIntegrationAccess(input: { integrationId: 787, fleetId: 1} )
}
```

This will revoke the access from the integration with id 787 from the fleet with id 1.
The result looks like this:
``` json
{
  "data": {
    "revokeIntegrationAccess": true
  }
}
```

It's also possible to revoke the access for a vehicle instead, if the vehicle has granted direct access and not through the fleet:

``` graphql
mutation revokeIntegrationAccess {
 revokeIntegrationAccess(input: { integrationId: 787, vehicleId: 123} )
}
```
This will revoke the access from the integration with id 787 from the vehicle with id 123.

Revoking access will delete all data streams related to the fleet or the vehicle for that integration.

If the vehicle or fleet has not granted access to the integration (or it has already been revoked) the mutation does nothing.
