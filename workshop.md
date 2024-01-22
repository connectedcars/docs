# Workshop

## Endpoints

All endpoints accepts `token` in the URL hash/fragment param (eg. `#token=foobar`), which will be used for authentication. If no token is provided in the request, the client will look for one saved in the browser's storage. If no token is available the client will be redirected to the Auth service.

**Please note that all URI components must be encoded.**

### `GET /integration/vehicle/add`

Prefill form data on the "Add vehicle" page and the "vehicle activation guide" if customer details are included in the request as well.

| Query param            |           Type/constraints           |                   Example                   | Description                                                                                                                                       |
| :--------------------- | :----------------------------------: | :-----------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `queryType` (required) |       `vin` \| `licensePlate`        |                    `vin`                    | Whether to add a vehicle based on its `vin` or `licensePlate`. Different forms will be shown.                                                     |
| `source`   (required)  |                                      |                `some_system`                | Where the vehicle details came from, works similarly to a browser User Agent.                                                                     |
| `vehicleVin`           | `/[ABCDEFGHJKLMNPRSTUVWXYZ0-9]{17}/` |             `WVWZZZ1KZAW123456`             | The chassis number/vin of the vehicle being added.                                                                                                |
| `vehicleCountryCode`   |           Defaults to `DK`           |                    `DK`                     | Two letter country code. Get [list of supported codes](https://api.connectedcars.io/graphql/graphiql/) from the API's `addressCountryCode` query. |
| `vehicleLicensePlate`  |                                      |                 `AB123456`                  | The license plate of the vehicle being added.                                                                                                     |
| `vehicleWorkshopId`    |                                      |                    `42`                     | The workshop ID of the vehicle should be added to.                                                                                                |
| `vehicleName`          |                                      | `VW Golf GTI Performance 2,0TSI 245HK DSG7` | The vheicle's full name, including model description.                                                                                             |
| `vehicleYear`          |              `/\d{4}/`               |                   `2018`                    | The production year of the vehicle.                                                                                                               |
| `vehicleBrand`         |               `Brand`                |                `volkswagen`                 | The vehicle brand/make, get [list of supported brands](https://api.connectedcars.io/graphql/graphiql/) from the API's `Brand` type.               |
| `vehicleUnitSerial`    |                                      |                 `12345678`                  | The serial number of the unit in the vehicle.                                                                                                     |
| `vehicleFuelType`      |             `FuelType`               |                 `electric`                  | The vehicle's fuel type, whether it's gasoline, diesel, electric, or similar.                                                                     |
| `vehicleEngineCode`    |                                      |                   `EBJ`                     | The vehicle's engine code.                                                                                                                        |
| `customerFirstname`    |                                      |                   `John`                    | First name of the customer being added to the vehicle.                                                                                            |
| `customerLastname`     |                                      |                   `Smith`                   | Last name of the customer being added to the vehicle.                                                                                             |
| `customerEmail`        |                                      |              `foo@example.com`              | Email address of the customer being added to the vehicle.                                                                                         |
| `customerPhone`        |      Must include +country code      |               `+45 1234 5678`               | Phone number of the customer being added to the vehicle.                                                                                          |

Example request:

```
/integration/vehicle/add?queryType=vin&source=some_system&vehicleVin=WVWZZZ1KZAW123456&customerEmail=johnsmith%40example.com
```
