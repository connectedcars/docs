[Go back to Integrations](./integrations/intro)

# Import service bookings
Service bookings can be pushed to Connected Cars when they are added, changed or cancelled. The service bookings will help reduce friction as it allows Connected Cars to for instance automatically close service reminders if the customer already booked a timeslot for getting the service done.

The import of service bookings uses the standard GraphQL pull API via the `addBookings`, `changeBookings` and `cancelBookings` mutations. Descriptions of the fields and example requests can be found below. Further details on working with the pull API can be found on [the dedicated page](./integrations/pull-api).

## Field descriptions
| Key             | Type              | Example                    | Notes    |
|:----------------|:------------------|:---------------------------|:---------|
| `bookingNumber` | String            | `abc-123`                  | Required |
| `dealerNumber`  | String            | `00123`                    | Required |
| `vin`           | String            | `WVWZZZAUZKW123456`        | Required |
| `startTime`     | Datetime, RFC3339 | `2022-08-23T13:30:00.000Z` | Required |
| `endTime`       | Datetime, RFC3339 | `2022-08-23T14:30:00.000Z` | Optional |
| `isConfirmed`   | Bool              | `true`                     | Required |
| `customerName`  | String            | `John Doe`                 | Optional |
| `bookingTime`   | Datetime, RFC3339 | `2022-08-20T13:37:00.000Z` | Optional, when the booking was made |

## Example request for adding bookings
```sh
curl 'https://api.connectedcars.io/graphql' \
  -X POST
  -H 'Authorization: Bearer my-jwt'
  -H 'Content-Type: application/json'
  -H 'User-Agent: service-booking-integration/v1'
  --data-raw '{"query":"query AddBookings($bookings: [AddBookingInput!]!) { addBookings(input: { bookings: $bookings }) }","operationName":"AddBookings","variables":{"bookings":[{"bookingNumber":"abc-123","dealerNumber":"00123","vin":"WVWZZZAUZKW123456","startTime":"2022-08-23T13:30:00.000Z","endTime":"2022-08-23T14:30:00.000Z","isConfirmed":true,"customerName":"John Doe","bookingTime":"2022-08-20T13:37:00.000Z"}]}}'
```

## Example request for changing bookings
```sh
curl 'https://api.connectedcars.io/graphql' \
  -X POST
  -H 'Authorization: Bearer my-jwt'
  -H 'Content-Type: application/json'
  -H 'User-Agent: service-booking-integration/v1'
  --data-raw '{"query":"query ChangeBookings($bookings: [ChangeBookingInput!]!) { changeBookings(input: { bookings: $bookings }) }","operationName":"ChangeBookings","variables":{"bookings":[{"bookingNumber":"abc-123","dealerNumber":"00123","vin":"WVWZZZAUZKW123456","startTime":"2022-08-23T13:30:00.000Z","endTime":"2022-08-23T14:30:00.000Z","isConfirmed":true,"customerName":"John Doe","bookingTime":"2022-08-20T13:37:00.000Z"}]}}'
```

## Example request for cancelling bookings
```sh
curl 'https://api.connectedcars.io/graphql' \
  -X POST
  -H 'Authorization: Bearer my-jwt'
  -H 'Content-Type: application/json'
  -H 'User-Agent: service-booking-integration/v1'
  --data-raw '{"query":"query CancelBookings($bookings: [CancelBookingInput!]!) { cancelBookings(input: { bookings: $bookings }) }","operationName":"CancelBookings","variables":{"bookings":[{"bookingNumber":"abc-123","dealerNumber":"00123","vin":"WVWZZZAUZKW123456","startTime":"2022-08-23T13:30:00.000Z","endTime":"2022-08-23T14:30:00.000Z","isConfirmed":true,"customerName":"John Doe","bookingTime":"2022-08-20T13:37:00.000Z"}]}}'
```
