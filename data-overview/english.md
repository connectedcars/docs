# Data overview

## My Trips

My Trips allows you to get a history of your cars trips. You can see where you have driven, how far, how long and how much gas you’ve used

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car GPS position | So the user can see the car's route on a map | Saved until user requests deletion of trip |
| Direction of car | So the user can see the car's route on a map, used to optimize route viewing | Saved until user requests deletion of trip |
| Car fuel level | So the user can see the car's estimated fuel consumption | 60 days historical data. Calculated fuel consumption is saved until user requests deletion of trip |
| Car mileage | So the user can see the number of kilometers traveled for each trip | 60 days historical data. Calculated distance on trip is saved until user requests deletion of trip |
| Car fuel consumption | So the user can see the car's estimated fuel consumption for each trip | 60 days historical data. Calculated fuel consumption is saved until user requests deletion of trip |
| Drive in time | So the user can see the duration of the trip | Saved until user requests deletion of trip |

## Current status of your car

This feature gives you an overview of the current status of your car / errors and time to next service and oil change

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car GPS position | So the user can see where the car is | 1 hour historical data and most recent value |
| Ignition on | Used for logic, which quality assures data | 60 days historical data and most recent value |
| Ignition off | Used for logic, which quality assures data | 60 days historical data and most recent value |
| Car mileage | So the user can see the car's mileage in the app | 60 days historical data and most recent value |
| Car fuel level | So the user can see the car's fuel level in the app | 60 days historical data and most recent value |
| Car service interval in days | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Car service interval in kilometers | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Number of days since last service | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Number of kilometers since last service | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Number of kilometers to next oil change | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Number of days to next oil change | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Car oil quality (bad/good) | Used for calculation so that the user can see when the car needs service again | 60 days historical data and most recent value |
| Battery voltage | So the user can get a warning if the car's battery voltage is low | Saved until the user requests deletion |
| Battery health | So the user can get a warning if the car's battery voltage is low | Saved until the user requests deletion |
| Warning if the car is towed | So the user can get a warning if the car is towed | 7 days historical data and most recent value |
| Windshield wiper fluid light | So the user can get a warning if the windshield wiper fluid light is on the car | 7 days historical data and most recent value |
| Coolant light | So the user can get a warning if the coolant light is on the car | 7 days historical data and most recent value |
| Brake system light | So the user can get a warning if the brake system light is on the car | 7 days historical data and most recent value |
| Oil light | So the user can get a warning if the oil light is on the car | 7 days historical data and most recent value |
| Airbag activated | So the user can get a warning if the airbag is activated in the car or the airbag is broken | 7 days historical data and most recent value |
| Error codes from car | So the user can get a warning about technical errors on the car that does not trigger warning lights | 7 days historical data and most recent value |
| Power failure on OBD device | So the user can get a warning if the OBD device in the car is demounted | 7 days historical data and most recent value |
| Suspected collision | So the user can get a warning if a collision is suspected | 7 days historical data and most recent value |
| Oil level in mm | So the user can get a warning if the car's oil level is too low | 7 days historical data and most recent value |
| Oil temperature | So the user can get a warning if the car's oil temperature is too high | 7 days historical data and most recent value |
| Tire pressure alarm | So the user can get a warning about low tire pressure | 7 days historical data and most recent value |
| Brake fluid light | So the user can get a warning if the brake fluid light is on the car | 7 days historical data and most recent value |
| Low oil warning | So the user can get a low oil level warning | 7 days historical data and most recent value |
| ABS warning light | So the user can get a warning if there is an error on the ABS system | 7 days historical data and most recent value |
| ESP deactivation light | So the user can get a warning if the ESP is disabled or broken | 7 days historical data and most recent value |
| ESP activation light | So the user can get a warning if the ESP is disabled or broken | 7 days historical data and most recent value |
| Warning for low battery voltage on the car battery | So the user can get a warning if the car's battery voltage is low | 7 days historical data and most recent value |
| Warning on changes to the car's battery voltage | So the user can get a warning if there is a change in the car's battery voltage | 7 days historical data and most recent value |

## Technical help from your preferred workshop

This feature ensures that you get the right advice from your preferred workshop based on data directly from the car

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car mileage | So the user's preferred workshop can advise on the best service based on the car's mileage | 60 days historical data and most recent value |
| Car service interval in days | So the user's preferred workshop can advise on the best service based on the car's service interval | 60 days historical data and most recent value |
| Car service interval in kilometers | So the user's preferred workshop can advise on the best service based on the car's service interval | 60 days historical data and most recent value |
| Number of days since last service | So the user's preferred workshop can call in the user's car when there is time for service / oil change | 60 days historical data and most recent value |
| Number of kilometers since last service | So the user's preferred workshop can call in the user's car when there is time for service / oil change | 60 days historical data and most recent value |
| Number of kilometers to next oil change | So the user's preferred workshop can call in the user's car when there is time for service / oil change | 60 days historical data and most recent value |
| Number of days to next oil change | So the user's preferred workshop can call in the user's car when there is time for service / oil change | 60 days historical data and most recent value |
| Car oil quality (bad/good) | So the user's preferred workshop can call in the user's car when there is time for service / oil change | 60 days historical data and most recent value |
| Coolant light | So the user's preferred workshop can advise the user if there is an error on the cooling fluid system | Saved until the user requests deletion |
| Brake system light | So the user's preferred workshop can advise the user if there is an error on the braking system | Saved until the user requests deletion |
| Oil light | So the user's preferred workshop can advise the user if there is an error on the oil system | Saved until the user requests deletion |
| Airbag activated | So the user's preferred workshop can advise the user if there is an error on the airbag system | Saved until the user requests deletion |
| Power failure on OBD device | So the user's preferred workshop can advise the user if there is a power failure on the OBD device in the car | Saved until the user requests deletion |
| Oil temperature | So the user's preferred workshop can advise the user if the car's oil temperature becomes too high | Saved until the user requests deletion |
| Tire pressure alarm | So the user's preferred workshop can advise the user if the car lacks air in one or more tires | Saved until the user requests deletion |
| Brake fluid light | So the user's preferred workshop can advise the user if the car lacks brake fluid | Saved until the user requests deletion |
| Low oil warning | So the user's preferred workshop can advise the user if the car needs oil | Saved until the user requests deletion |
| ABS warning light | So the user's preferred workshop can advise the user if the ABS system is defective | Saved until the user requests deletion |
| ESP deactivation light | So the user's preferred workshop can advise in connection with problems with the ESP system | Saved until the user requests deletion |
| ESP activation light |  So the user's preferred workshop can advise in connection with problems with the ESP system | Saved until the user requests deletion |
| Warning for low battery voltage on the car battery | So the user's preferred workshop can advise the user in case of battery and / or starting problems | Saved until the user requests deletion |
| Warning on changes to the car's battery voltage | So the user's preferred workshop can advise the user in case of battery and / or starting problems | Saved until the user requests deletion |
| Error codes from car | So the user's preferred workshop can advise the user about technical faults on the car | Saved until the user requests deletion |
| User full name | So the user's preferred workshop has contact information | Saved until the user requests deletion |
| User phone number | So the user's preferred workshop has contact information | Saved until the user requests deletion |
| User email | So the user's preferred workshop has contact information | Saved until the user requests deletion |
| Car chassis number | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| Car registration number | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| User ID | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| OBD device ID  So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| Car model information | So the user's preferred workshop can advise the user and book the correct service or repair if necessary | Saved until the user requests deletion |
| User chat history with preferred workshop | So the user's preferred workshop can get an insight into the car's history and previous dialogue to best guide the user | Saved until the user requests deletion |
| GPS status OK (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | 7 days historical data and most recent value |
| GPRS status OK (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | 7 days historical data and most recent value |
| OBD device activated (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | Saved until the user requests deletion |

## Ancillary data

Data that is technically necessary to ensure safe and efficient reading of data from the car

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car chassis number | Used to ensure that the correct software is loaded on the OBD device | Always |
| Car technical configuration | Used to ensure that the correct software is loaded on the OBD device | Always |
| Scan of car's electronic configuration | Used to ensure that the correct software is loaded on the OBD device | Always |
| CAN-Bus raw data | Used for troubleshooting | Always |
| CAN-Bus activity on/off | Used for quality assurance of collected data | 7 days historical data and most recent value |

## Driving events

This feature gives you information about incidents and conditions for your car's trips shown in your app and summed up in benchmarks where you can track your improvements regarding safe driving. Collected data is shown in the app and used to provide you concrete areas of improvement to be a safer driver.

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Speed (with position) | Speed is known to be the single most important component of traffic accidents. It is necessary rely on speed to advise users on how and where to improve their driving | Kept until the user requests deletion. Values +130 Km/h are reduced to 130 km/h as speeds above this level is not relevant |
| Use of wind wipers | Driving in rain is associated with risks of aqua planing and many accidents every year. It is necessary to rely on use of wind wipers to detect if car is driving in rain, and therefore more risky | Kept until the user requests deletion |
| Outside temperature | Driving at cold temperatures is associated with slippery and potentially icy conditions. Slippery conditions because of cold weather is associated with multiple accidents every year. Outside temperature is an indicator for slippery conditions. Therefore, it is necessary rely on temperature to advise users on how to improve their driving | Kept until the user requests deletion |
| Vehicle acceleration above 0.2G (any direction), with position | Sudden and often change of direction (increase/decrease of speed as well as turning) are risky actions by the driver. Smooth driving is safe driving therefore acceleration events must be used to advice drivers on where  and when they make mistakes | Kept until the user requests deletion |
| ESP deactivation light | The ESP-system of the vehicle ensures stability should it loose traction on one or more wheels. Disabling the ESP-system poses a very significant risks for driving. Therefore, It is necessary to advise users who disable the ESP-system users on how to improve their driving | Kept until the user requests deletion |
| ESP activation light | Activation of the ESP-system indicates slippery surface, and therefore more risky driving conditions. Therefore, It is necessary to rely on signals from the ESP-system to advise users on how to take better care when driving in slippery conditions | Kept until the user requests deletion |
| High beam activated | Driving in dark conditions is associated with higher risk than driving in day light or where street lights are installed. Country roads are especially at dusk and at night much more risky to drive than at daylight. Use of high beam is an indicator for driving on dark. Therefore, It is necessary to rely on use of high beam to advise users to slow down in dark conditions | Kept until the user requests deletion |
| Fog lights activated | Driving in foggy conditions is hazardous and the cause of many accidents every year. Use of fog lights is an indicator for foggy conditions. Therefore, It is necessary to rely on use of fog lights to advise users on safer driving in foggy conditions | Kept until the user requests deletion |
