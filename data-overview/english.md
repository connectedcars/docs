# Data overview

## Current status of your car

This feature gives you an overview of the current status of your car / errors and time to next service and oil change

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| GPS position | So the user can see where the car is | 1 hour historical data and most recent value |
| Ignition | Used for logic, which quality assures data | 60 days historical data and most recent value |
| Odometer | So the user can see the car's odometer in the app | 60 days historical data and most recent value |
| GPS Odometer | So the user can see the car's odometer in the app | 60 days historical data and most recent value |
| Fuel level | So the user can see the car's fuel level in the app | 60 days historical data and most recent value |
| High-voltage battery level | So the user can see the car's battery level in the app. Relevant for hybrid- and electric cars. | 60 days historical data and most recent value |
| Service and oil change data | Used for calculation so that the user can see when the car needs service or oil change again | 60 days historical data and most recent value |
| Battery voltage | So the user can see the car's current battery voltage and get a warning if it suddenly drops or if the overall health of the battery is poor | 60 days historical data and most recent value |
| Adblue range* | So the user can see the car's remaining km until next refill of adblue is needed and get a warning | 7 days historical data and most recent value |
| Dashboard warning lights* | So the user can get a warning about the warning light and advise on how to proceed | 7 days historical data and most recent value |
| Error codes from car | So the user can get a warning about technical errors on the car that does not trigger warning lights | 7 days historical data and most recent value |
| Acceleration when parked* | So the user can get a warning if something bumps into the vehicle while its parked | Saved until the user requests deletion |
| Power failure on OBD device* | So the user can get a warning if the device is unplugged | Saved until the user requests deletion |

Data points marked with "*", are also collected with the purpose of optimizing and improving the services of the application.

## Technical help from your preferred workshop

This feature ensures that you get the right advice from your preferred workshop based on data directly from the car

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Odometer | So the user's preferred workshop can advise on the best service based on the car's odometer | 60 days historical data and most recent value |
| Service and oil change data | So the user's preferred workshop can advise the car's next service or oil | 60 days historical data and most recent value |
| Battery voltage | So the user's preferred workshop can advise the user in case of battery and / or starting problems | 60 days historical data and most recent value |
| Adblue range* | So the user's preferred workshop can advise the user in case of remaining km to next Adblue refill is low | 60 days historical data and most recent value |
| Dashboard warning lights* | So the user's preferred workshop can advise the user about the warning light and advise on how to proceed | Saved until the user requests deletion |
| Error codes from car | So the user's preferred workshop can advise the user about technical faults on the car | Saved until the user requests deletion |
| User full name | So the user's preferred workshop has contact information | Saved until the user requests deletion |
| User phone number | So the user's preferred workshop has contact information | Saved until the user requests deletion |
| User email | So the user's preferred workshop has contact information | Saved until the user requests deletion |
| Chassis number | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| Registration number | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| User ID | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| OBD device ID | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| Car model information | So the user's preferred workshop can advise the user and book the correct service or repair if necessary | Saved until the user requests deletion |
| User chat history with preferred workshop | So the user's preferred workshop can get an insight into the car's history and previous dialogue to best guide the user | Saved until the user requests deletion |
| GPS status OK (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | 7 days historical data and most recent value |
| GPRS status OK (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | 7 days historical data and most recent value |
| OBD device activated (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | Saved until the user requests deletion |
| Power failure on OBD device* | So user's preferred workshop can advise the user if the device is unplugged | Saved until the user requests deletion |

Data points marked with "*", are also collected with the purpose of optimizing and improving the services of the application.

## Ancillary data

Data that is technically necessary to ensure safe and efficient reading of data from the car

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Chassis number | Used to ensure that the correct software is loaded on the OBD device | Always |
| Car technical configuration | Used to ensure that the correct software is loaded on the OBD device | Always |
| Scan of car's electronic configuration | Used to ensure that the correct software is loaded on the OBD device | Always |
| CAN-Bus raw data | Used for troubleshooting | Always |
| CAN-Bus activity on/off | Used for quality assurance of collected data | 7 days historical data and most recent value |
| Power failure on OBD device | Used for quality assurance | Always |

## My Trips

My Trips allows you to get a history of your cars trips. You can see where you have driven, how far, how long and how much gas you’ve used

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| GPS position | So the user can see the car's route on a map and get contextual information such as road toll fees | Saved until user requests deletion |
| Direction of car | So the user can see the car's route on a map, used to optimize route viewing | Saved until user requests deletion |
| Ignition | So the user can see the car's trip history | Saved until user requests deletion |
| Fuel consumption | So the user can see the car's estimated fuel consumption | Saved until user requests deletion |
| Refuel events | So the user can see when the car was refueled and how much | Saved until user requests deletion |
| Odometer | So the user can see the number of kilometers traveled for each trip | 60 days historical data. Calculated distance on a trip as well as start and end odometer of a trip is saved until user requests deletion |
| Time consumption | So the user can see the duration of the trip. It is also used to calculate an idle time | Saved until user requests deletion |
| Idle time* | So the user can see for how long the vehicles has been idling. | Saved until user requests deletion |
| Engine RPM* | So the user can see for how long time the engine RPM has been above 3500 RPM. | Saved until user requests deletion |
| Dashboard warning lights* | So the user can see where the road was slippery | Saved until user requests deletion |

Data points marked with "*", are also collected with the purpose of optimizing and improving the services of the application.

## Fuel usage
This feature allows you to get an estimate of much fuel you used on a particular trip in liters. It can be used to indicate the fuel cost of a trip.

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Fuel used per trip | So the user can see the car's estimated fuel used for each trip | Saved until user requests deletion. |

## Driving events

This feature gives you information about incidents and conditions for your car's trips shown in your app and summed up in benchmarks where you can track your improvements regarding safe driving. Collected data is shown in the app and used to provide you concrete areas of improvement to be a safer driver.

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Speed (with position) | Speed is known to be the single most important component of traffic accidents. It is necessary rely on speed to advise users on how and where to improve their driving | Saved until user requests deletion. Values +130 Km/h are reduced to 130 km/h as speeds above this level is not relevant |
| Outside temperature | Driving at cold temperatures is associated with slippery and potentially icy conditions. Slippery conditions because of cold weather is associated with multiple accidents every year. Outside temperature is an indicator for slippery conditions. Therefore, it is necessary rely on temperature to advise users on how to improve their driving | Saved until user requests deletion |
| Acceleration above 0.2G (any direction), with position | Sudden and often change of direction (increase/decrease of speed as well as turning) are risky actions by the driver. Smooth driving is safe driving therefore acceleration events must be used to advice drivers on where and when they make mistakes. The acceleration events will also be used to calculate a driver score so the user can compare against other drivers | Saved until user requests deletion |
