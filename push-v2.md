# Push integration v2

## Endpoints

Messages can be pushed to either a https POST endpoint or to Pub/Sub.

## Vehicle event types 

The following fields are present on all vehicle events

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| id       | 64 bit integer   |       | 458964867                | An auto incrementing ID, not unique since each shard has their own counter.   |
| vehicleId| 32 bit integer   |       | 324122                   | Vehicle id reference                            |
| time     | datetime | ISO 8601            | 2022-05-19T18:31:03.000Z | Time the data was recorded                      |
| type     | string   |                     | can_ignition             | String enum describing event type, see types below               |

The following events exists, and are detailed below: `can_mil_lamp`,`gps_position`,`can_vin`,`can_odometer_km`,`car_odometer_km`,`can_fuel_level_liters`,`can_fuel_level_percent`,`can_vehicle_speed_kph`,`can_adblue_remaining_distance_km`,`can_engine_coolant_temperature_celsius`,`can_ambient_air_temperature_celsius`,`can_service_interval_km`,`can_service_interval_days`,`can_last_service_days`,`can_last_service_km`,`can_next_service_days`,`can_next_service_30days`,`can_next_service_km`,`can_exceeded_oil_change_km`,`can_exceeded_oil_change_days`,`can_next_oil_change_km`,`can_next_oil_change_days`,`can_next_oil_change_30days`,`can_last_oil_change_km`,`can_last_oil_change_days`,`can_oil_change_interval_variable_km`,`can_oil_change_interval_variable_days`,`can_oil_change_interval_fixed_km`,`can_oil_change_interval_fixed_days`,`can_oil_change_type_is_fixed`,`can_hv_battery_discharge_kwh`,`can_hv_battery_charge_kwh`,`car_battery_voltage`,`gpio_battery_internal_voltage`,`car_ignition`,`can_odometer10_km`,`can_last_service_at_odometer`,`can_last_service_at_date`,`can_oil_degration_percent`,`can_high_voltage_battery_charge_percent`,`can_high_voltage_battery_temperature_celsius`,`can_distance_with_mil_on_km`,`car_profiling`,`calc_vehicle_idle`,`calc_total_fuel_used_liters`,`calc_engine_idle_time`,`can_dtc`

### can_mil_lamp

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| enabled  | bit      |                     | 0                        | whether the mil lamp is off (0) or on (1)       |

Example:

``` json
[
    {
        "type": "can_mil_lamp",
        "id": 123,
        "enabled": "0",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### gps_position

Gps position from vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| latitude | decimal   | decimal degrees             | 60.613747999999994       | Latitude of the position. NB: We work with the unaltered coordinates as floats from our GPS sensor, which can have many decimals in the coordinates. However, it should not be expected that the accuracy of the GPS positions from cars is better than around 10m. This accuracy is heavily influenced by factors such as high buildings, heavy tree cover, hills, tunnels, and parking cellars.        |
| longitude| decimal   | decimal degrees            | 17.414016999999998       | Longitude of the position. NB: We work with the unaltered coordinates as floats from our GPS sensor, which can have many decimals in the coordinates. However, it should not be expected that the accuracy of the GPS positions from cars is better than around 10m. This accuracy is heavily influenced by factors such as high buildings, heavy tree cover, hills, tunnels, and parking cellars.       |
| speed    | 16 bit integer/null   | km/h      | 50                       | The travelling speed of the vehicle when the position was recorded. This value is only available for vendor `traffilog`.      |
| direction| 16 bit integer/null   | degrees      | 0                        | The degree in which the vehicle is travelling (between 0 to 360, where both 0 and 360 is north). This value may be null in cases where speed is 0, as the travelling direction of the vehicle cannot be calculated between the last two positions.       |
| gpsCached | bit/null   |                     | 0                        | Whether the data point is an old data point, which has been cached on the unit. Note: We may omit data points where gpsCached=1 in the future. This value is only available for vendor `traffilog`.       |
| numberOfSattelites| integer/null   |                     | 3                        | How many satellites that was available when the data point was recorded. This value is only available for vendor `traffilog`.      |
| ignition | bit/null   |                     | 0                        | Whether the vehicle had an ignition when the data point was recorded.. This value is only available for vendor `traffilog`.      |
| altHAE | integer/null   |                     | 74                        | From [gpsd documentation](https://gpsd.gitlab.io/gpsd/gpsd_json.html): "Altitude, height above ellipsoid, in meters. Probably WGS84." This value is only available for vendor `cc`.      |
| eph | integer/null   |                     | 2                        | From [gpsd documentation](https://gpsd.gitlab.io/gpsd/gpsd_json.html): "Estimated horizontal Position (2D) Error in meters. Also known as Estimated Position Error (epe). Certainty unknown." This value is only available for vendor `cc`.      |
| hdop | integer/null   |                     | 0                        | From [gpsd documentation](https://gpsd.gitlab.io/gpsd/gpsd_json.html): "Horizontal dilution of precision, a dimensionless factor which should be multiplied by a base UERE to get a circular error estimate." This value is only available for vendor `cc`.      |

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
    "direction": 0,
    "gpsCached": 0,
    "ignition": 1,
    "numberOfSatellites": 7
  }
]
```
### can_vin

The vin from the vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| vin      | string   |                     | ZAR94000007021883        | the vehicle's vin       |

Example:

``` json
[
    {
        "type": "can_vin",
        "id": 433642,
        "vin": "ZAR94000007021883",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_odometer_km

The odometer from the CAN of the vehicle in kilometers

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| odometer | integer   |  whole km            | 94636                    | odometer in whole km       |

Example:

``` json
[
    {
        "type": "car_odometer_km",
        "id": 433642,
        "odometer": 94636,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### car_odometer_km

The odometer from the vehicle in kilometers, from can or gps

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| odometer | decimal   |  km            | 94636.363                    | odometer in km       |

Example:

``` json
[
    {
        "type": "car_odometer_km",
        "id": 433642,
        "odometer": 94636,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_fuel_level_liters

The fuel level of the car in whole liters

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| liter    | integer   | whole liters             | 34                       | amount of liters of fuel in the vehicle     |

Example:

``` json
[
    {
        "type": "can_fuel_level_liters",
        "id": 433642,
        "liter": 34,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_fuel_level_percent

The fuel level in percent in the vehicle

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| percent  | integer   | percent             | 68                       | percentage of fuel left in the car       |

Example:

``` json
[
    {
        "type": "can_fuel_level_percent",
        "id": 433642,
        "percent": 68,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_vehicle_speed_kph

The vehicle speed in kilometers per hour

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| speed    | decimal   | km/h             | 110.54                   | speed in km/h       |

Example:

``` json
[
    {
        "type": "can_vehicle_speed_kph",
        "id": 433642,
        "speed": 110.54,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_adblue_remaining_distance_km

How many kilometers can be driven with the current adblue

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km       | integer   | km             | 14154                    | kilometers current adblue will last       |

Example:

``` json
[
    {
        "type": "can_adblue_remaining_distance_km",
        "id": 433642,
        "km": 14154,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_engine_coolant_temperature_celsius

The engine coolant temperature in degrees celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| celsius  | intger   | celsius           | 75                        | temperature celsius degrees       |

Example:

``` json
[
    {
        "type": "can_engine_coolant_temperature_celsius",
        "id": 433642,
        "celsius": 75,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_ambient_air_temperature_celsius

The temperature outside the car in degrees celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| celsius    | decimal   | celsius                    | 10.50                        | outside temperature in degrees celsius       |

Example:

``` json
[
    {
        "type": "can_ambient_air_temperature_celsius",
        "id": 433642,
        "celsius": 10.50,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_service_interval_km

The car's service interval in km

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| serviceIntervalInKm    | integer   | km                    | 30000                        | car service interval in km       |

Example:

``` json
[
    {
        "type": "can_service_interval_km",
        "id": 433642,
        "serviceIntervalInKm": 30000,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_service_interval_days

The car's service interval in days

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| serviceIntervalInDays    | integer   | days                    | 730                        | car service interval in days       |

Example:

``` json
[
    {
        "type": "can_service_interval_days",
        "id": 433642,
        "serviceIntervalInDays": 730,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_last_service_days

Amount of days since last service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| daysSinceLastService    | integer   | days                    | 207                        | days since last service       |

Example:

``` json
[
    {
        "type": "can_last_service_days",
        "id": 433642,
        "daysSinceLastService": 207,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_last_service_km

Amount of km since last service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| kmSinceLastService    | integer   |  km                   | 14700                        | km since last service       |

Example:

``` json
[
    {
        "type": "can_last_service_km",
        "id": 433642,
        "kmSinceLastService": 14700,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_next_service_days

Days until next service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| days    | integer   | days                    | 28                        | number of days till next service       |

Example:

``` json
[
    {
        "type": "can_next_service_days",
        "id": 433642,
        "days": 28,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_next_service_30days

Days until next service in 30 day increments

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| days    | integer   | days                     | 390                        | number of days till next service       |

Example:

``` json
[
    {
        "type": "can_next_service_30days",
        "id": 433642,
        "days": 390,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_next_service_km

Kilometers until next service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km                    | 4700                        | number of km till next service       |

Example:

``` json
[
    {
        "type": "can_next_service_km",
        "id": 433642,
        "km": 4700,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_exceeded_oil_change_km

Kilometers driven after oil service should have been done

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km                    | 380                        | km driven after oil service should have been done       |

Example:

``` json
[
    {
        "type": "can_exceeded_oil_change_km",
        "id": 433642,
        "km": 380,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_exceeded_oil_change_days

Days passed after oil service should have been done

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| days    | integer   | days                    | 0                        | number of days after oil service should have been done       |

Example:

``` json
[
    {
        "type": "can_exceeded_oil_change_days",
        "id": 433642,
        "days": "0",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_next_oil_change_km

Kilometers until next oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| nextOilChangeInKm    | integer   | km                    | 13100                        | km till next oil service       |

Example:

``` json
[
    {
        "type": "can_next_oil_change_km",
        "id": 433642,
        "nextOilChangeInKm": 13100,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_next_oil_change_days

Days until next oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| nextOilChangeInDays | integer   | days                    | 290                        | days till next oil service       |

Example:

``` json
[
    {
        "type": "can_next_oil_change_days",
        "id": 433642,
        "nextOilChangeInDays": 290,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_next_oil_change_30days

Days until next oil service in 30 day increments

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| nextOilChangeInDays    | integer   | days            | 300                        | days till next oil service in 30 days increments       |

Example:

``` json
[
    {
        "type": "can_next_oil_change_30days",
        "id": 433642,
        "nextOilChangeInDays": 300,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_last_oil_change_km

Km since last oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km                    | 4144                        | km since last oil service       |

Example:

``` json
[
    {
        "type": "can_last_oil_change_km",
        "id": 433642,
        "km": 4144,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_last_oil_change_days

Days since last oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| days    | integer   | days                    | 46                        | days since last oil service       |

Example:

``` json
[
    {
        "type": "can_last_oil_change_days",
        "id": 433642,
        "days": 46,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_oil_change_interval_variable_km

The maximum number of km between oil service for variable oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km                    | 30000                        | max number of km between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_variable_km",
        "id": 433642,
        "km": 30000,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_oil_change_interval_variable_days

The maximum number of days between oil service for variable oil service
|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| days    | integer   | days                    | 730                | max number of days between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_variable_days",
        "id": 433642,
        "days": 730,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_oil_change_interval_fixed_km

The number of km between oil service for fixed oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km                    | 15000                | number of km between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_fixed_km",
        "id": 433642,
        "km": 15000,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_oil_change_interval_fixed_days

The number of days between oil service for fixed oil service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| days    | integer   | days                    | 365                        | number of days between oil service       |

Example:

``` json
[
    {
        "type": "can_oil_change_interval_fixed_days",
        "id": 433642,
        "days": 365,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_oil_change_type_is_fixed

Whether oil service is fixed or variable

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| value    | integer  |                     | 1                        | whether the oil service is fixed (1) or not (2) |

Example:

``` json
[
    {
        "type": "can_oil_change_type_is_fixed",
        "id": 433642,
        "value": 1,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_hv_battery_discharge_kwh 

Current discharging rate of high voltage battery

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| kwh    | decimal   | kwh                    | -1285.192              | current discharge rate of high voltage battery       |

Example:

``` json
[
    {
        "type": "can_hv_battery_discharge_kwh",
        "id": 433642,
        "kwh": 0,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_hv_battery_charge_kwh 

Current charging rate of high voltage battery

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| kwh    | decimal   | kwh                    | 1566.202                 | current charge rate of high voltage battery       |

Example:

``` json
[
    {
        "type": "can_hv_battery_charge_kwh",
        "id": 433642,
        "kwh": 1566.202,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```

### car_battery_voltage

Car's battery voltage

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| voltage    | decimal   | volt                    | 3.989                        | voltage of the car's battery       |

Example:

``` json
[
    {
        "type": "car_battery_voltage",
        "id": 433642,
        "voltage": 3.989,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### gpio_battery_internal_voltage

Unit internal battery voltage

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| voltage    | decimal   | volt                    | 4.016                        | voltage of the internal battery       |

Example:

``` json
[
    {
        "type": "gpio_battery_internal_voltage",
        "id": 433642,
        "voltage": 4.016,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### car_ignition

Ignition on/off

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| enabled  | bit   |                     | 0                        | whether the ignition is off (0) or on (1)       |

Example:

``` json
[
    {
        "type": "can_ignition",
        "enabled": 0,
        "carId": "1337",
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_odometer10_km

Odometer from CAN in 10 km increments

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| odometer    | integer   | km             | 67740                    | odometer in 10 km increments       |

Example:

``` json
[
    {
        "type": "can_odometer10_km",
        "id": 433642,
        "odometer": 67740,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_last_service_at_odometer

The odometer at the latest service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km             | 115446                        | odometer in km at latest service       |

Example:

``` json
[
    {
        "type": "can_last_service_at_odometer",
        "id": 433642,
        "km": 115446,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_last_service_at_date

The date at the latest service

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| date    | string   | YYYY-MM-DD                    | 2014-01-03                        | date at the latest service       |

Example:

``` json
[
    {
        "type": "can_last_service_at_date",
        "id": 433642,
        "date": "2014-01-03",
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_oil_degration_percent

How many percent the oil has degraded

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| percent    | integer   | percent                    | 5                        | oil degration in percent       |

Example:

``` json
[
    {
        "type": "can_oil_degration_percent",
        "id": 433642,
        "percent": 0,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_high_voltage_battery_charge_percent

High voltage battery charge in percent

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| percent    | integer   | percent                    | 97                        | high voltage battery charge percent       |

Example:

``` json
[
    {
        "type": "can_high_voltage_battery_charge_percent",
        "id": 433642,
        "percent": 97,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_high_voltage_battery_temperature_celsius

High voltage battery temperature in celsius

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| celsius    | decimal   | celsius                    | 22.5                        | high voltage battery temperature in celsius       |

Example:

``` json
[
    {
        "type": "can_high_voltage_battery_temperature_celsius",
        "id": 433642,
        "celsius": 22.5,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_distance_with_mil_on_km

Distance driven with MIL lamp on in km

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| km    | integer   | km                    | 4352                        | distance driven with MIL lamp on in km       |

Example:

``` json
[
    {
        "type": "can_distance_with_mil_on_km",
        "id": 433642,
        "km": 4352,
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

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| idling    | bit   |                     | 0                        | whether the vehicle is idling (1) or not (0)       |

Example:

``` json
[
    {
        "type": "calc_vehicle_idle",
        "id": 433642,
        "idling": 0,
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
        "value": 0,
        "vehicleId": 1337,
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### calc_engine_idle_time

How long the vehicle has idled in a row

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| idleTime    | integer   | seconds                    | 155                        | idling time in seconds       |

Example:

``` json
[
    {
        "type": "calc_engine_idle_time",
        "id": 433642,
        "idleTime": 155,
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
| useFunctionalAdressing    | bit/null   |                     | null                        | use functional adressing (1) or not (0)      |
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

## Unit event types 

The following fields are present on all unit events

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| id       | 64 bit integer   |       | 458964867                | An auto incrementing ID, not unique since each shard has their own counter.   |
| unitProvider| string   |       | `cc`, `traffilog`                   | The provider of the unit                            |
| unitSerial     | string |             | 112cc24e0a3391d2 | The serial of the unit                      |
| time     | datetime | ISO 8601            | 2022-05-19T18:31:03.000Z | Time the data was recorded                      |
| type     | string   |                     | can_ignition             | String enum describing event type, see below               |

The following events exists, and are detailed below: `gpio_battery_external_disconnect`,`can_engine_code`


### gpio_battery_external_disconnect

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| disconnected    | bit   |                     | 0                        | whether the unit was connected (0) or disconnected (1)       |

Example:

``` json
[
    {
        "type": "gpio_battery_external_disconnect",
        "id": 433642,
        "disconnected": 0,
        "unitProvider": "cc",
        "unitSerial": "112cc24e0a3391d2",
        "time": "2022-01-01T12:30:10Z",
    }
]
```
### can_engine_code

Engine code of the car

|   Name   |   Type   |  Unit/Format        | Example                  |                   Description                   |
|:--------:|:--------:|:-------------------:|--------------------------|-------------------------------------------------|
| engineCode    | string   |                     | DFBA                        | the engine code of the car       |

Example:

``` json
[
    {
        "type": "can_engine_code",
        "id": 433642,
        "engineCode": "DFBA",
        "unitProvider": "cc",
        "unitSerial": "112cc24e0a3391d2",
        "time": "2022-01-01T12:30:10Z",
    }
]
```