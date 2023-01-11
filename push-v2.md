# Push integration v2

## Endpoints

Messages can be pushed to either a https POST endpoint or to Pub/Sub.

## Vehicle event types 

The following fields are present on all vehicle events

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| id       | 64 bit integer   |       | 458964867                | An auto incrementing ID, not unique since each shard has their own counter.   |
| vehicleId| 32 bit integer   |       | 324122                   | Vehicle id reference                            |
| time     | datetime | RFC 3339            | 2022-05-19T18:31:03.000Z | Time the data was recorded                      |
| type     | string   |                     | car_ignition             | String enum describing event type, see types below               |

See the following list for a description of each event type.

### gps_position

Gps position from vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| latitude | decimal   | decimal degrees             | 60.613747999999994       | Latitude of the position. NB: We work with the unaltered coordinates as floats from our GPS sensor, which can have many decimals in the coordinates. However, it should not be expected that the accuracy of the GPS positions from cars is better than around 10m. This accuracy is heavily influenced by factors such as high buildings, heavy tree cover, hills, tunnels, and parking cellars.        |
| longitude| decimal   | decimal degrees            | 17.414016999999998       | Longitude of the position. NB: We work with the unaltered coordinates as floats from our GPS sensor, which can have many decimals in the coordinates. However, it should not be expected that the accuracy of the GPS positions from cars is better than around 10m. This accuracy is heavily influenced by factors such as high buildings, heavy tree cover, hills, tunnels, and parking cellars.       |
| speed    | 16 bit integer/null   | km/h      | 50                       | The travelling speed of the vehicle when the position was recorded. This value is available based on the hardware.      |
| direction| 16 bit integer/null   | degrees      | 0                        | The degree in which the vehicle is travelling (between 0 to 360, where both 0 and 360 is north). This value may be null in cases where speed is 0, as the travelling direction of the vehicle cannot be calculated between the last two positions.       |

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
    "direction": 120
  }
]
```
### can_vin

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
### can_odometer_km

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
### car_odometer_km

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
        "value": 94636,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_fuel_level_liters

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
### can_fuel_level_percent

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
### can_vehicle_speed_kph

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
### can_adblue_remaining_distance_km

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
### can_engine_coolant_temperature_celsius

The engine coolant temperature in degrees celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value  | intger   | celsius           | 75                        | temperature celsius degrees       |

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
### can_ambient_air_temperature_celsius

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
### can_service_interval_km

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
### can_service_interval_days

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
### can_last_service_days

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
### can_last_service_km

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
### can_next_service_days

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
### can_next_service_30days

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
### can_next_service_km

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
### can_exceeded_oil_change_km

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
### can_exceeded_oil_change_days

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
### can_next_oil_change_km

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
### can_next_oil_change_days

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
### can_next_oil_change_30days

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
### can_last_oil_change_km

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
### can_last_oil_change_days

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
### can_oil_change_interval_variable_km

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
### can_oil_change_interval_variable_days

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
### can_oil_change_interval_fixed_km

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
### can_oil_change_interval_fixed_days

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
### can_oil_change_type_is_fixed

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
### car_battery_voltage

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
### gpio_battery_internal_voltage

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
### car_ignition

Ignition on/off

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value  | boolean   |                     | false                     | whether the ignition was turned off (false) or on (true)       |

Example:

``` json
[
    {
        "type": "car_ignition",
        "value": false,
        "carId": "1337",
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_odometer10_km

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
### can_last_service_at_odometer

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
### can_last_service_at_date

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
### can_oil_degration_percent

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
### can_high_voltage_battery_charge_percent

High voltage battery charge in percent

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | percent                    | 97                        | high voltage battery charge percent       |

Example:

``` json
[
    {
        "type": "can_high_voltage_battery_charge_percent",
        "id": 433642,
        "value": 97,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_high_voltage_battery_temperature_celsius

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
### can_distance_with_mil_on_km

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

### car_profiling

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
### calc_vehicle_idle

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

### calc_total_fuel_used_liters

Total liters of fuel used by the vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | decimal   | liters                    | 1844.2                        | how many liters of fuel the vehicle has used       |

Example:

``` json
[
    {
        "type": "calc_total_fuel_used_liters",
        "id": 433642,
        "value": 1844.2,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### calc_idle_time

Number of seconds the car has been idling since the last ignition on

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer   | seconds                    | 155                        | idling time in seconds       |

Example:

``` json
[
    {
        "type": "calc_idle_time",
        "id": 433642,
        "value": 155,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_dtc

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
| useFunctionalAdressing    | boolean/null   |                     | null                        | use functional adressing (true) or not (false)      |
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
        "useFunctionalAdressing": null,
        "sessionType": "01",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

### gpio_battery_external_disconnect

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
### can_engine_code

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

### can_mil_lamp

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

## Admin events types

The following fields are present on all admin events.

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| id       | 64 bit integer   |       | 458964867                | An auto incrementing ID, not unique since each shard has their own counter.   |
| time     | datetime | RFC 3339            | 2022-05-19T18:31:03.000Z | Time the data was recorded                      |
| type     | string   |                     | vehicle_added_to_fleet             | String enum describing event type, see types below               |

See the following list for a description of each event type.

### vehicle_added_to_fleet

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

### vehicle_removed_from_fleet

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

### access_granted_to_vehicle

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

### access_removed_from_vehicle

Sent when a vehicle removes access from the integration owning the data stream.

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
### access_granted_to_fleet

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

### access_removed_from_fleet

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
