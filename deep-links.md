# Deep links documentation

Deep links allows to redirect a user from an email, sms or in-app notification directly to a specific page in the app.

A deep link consists of the "app domain" which tells you what app to open and the actual deep link pointing to the page in the app you want to open.

Combine the two into one link and you get a better user friendly experience.

## App domains

| Apps | Domains |
|:-----|:--------|
| MinVolkswagen | https://app.minvolkswagen.dk |
| MinSKODA | https://app.minskoda.dk |
| MinSEAT | https://app.minseat.dk |
| mitAudi | https://app.mitaudi.dk |
| Connected Cars (use as default) | https://app.connectedcars.io |
| Connected Cars Fleet | https://fleetapp.connectedcars.io |
| FleetConnect | https://fleetapp.fleetconnect.se |
| MinVolkswagenFleet | https://fleetapp.minvolkswagenfleet.dk |
| The Originals | https://app.theoriginals.es |
| Staging | https://app.staging.connectedcars.io |

## Deep links

| App page | Link |
|:---------|:-----|
| Default front page | /dashboard/ |
| Front page per vehicle | /dashboard/[vehicleID] |
| Booking page per vehicle | /dashboard/booking/[vehicleID] |
| Message page per vehicle | /messages/[vehicleID] |
| Trips page per vehicle | /trips/[vehicleID] |
| Workshop page per vehicle | /workshop/[vehicleID] |
| Lookup vehicle | /lookup/[licensePlate] |
| More | /more |
| Profile settings | /more/profile |
| Notification settings | /more/profile/notifications |
| Partnerships | /more/partnerships |
| Support | /more/support |
| Roadside assistance | /more/roadside |
| Insurance card (won't work w/o vehicle ID) | /more/insurance/[vehicleID] |
| Leasing card (won't work w/o vehicle ID) | /more/leasing/[vehicleID] |
| Audi - Video channel | /videoChannel |
| Audi - MyGarage | /myGarage |

## Example

Each deep link would look like this for MinVolkswagen:

- https://app.minvolkswagen.dk/dashboard/[vehicleID]

or

- https://app.minvolkswagen.dk/booking/[vehicleID]

For all of the ones including [vehicleID] in the deep link will default to what is already selected in the app if no vehicleID is attached to the deep link.
