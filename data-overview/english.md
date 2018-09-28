# Data overview

## My Trips

My Trips allows you to get a histrory of your cars trips. You can see where you have driven, how far, how long and how much gas you’ve used

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car GPS position | So the user can see the car's route on a map | Saved until user requests deletion of trip |
| Direction of car | So the user can see the car's route on a map, used to optimize route viewing | Saved until user requests deletion of trip |
| Car fuel level | So the user can see the car's estimated fuel consumption | 8 days historical data. Calculated fuel consumption is saved until user requests deletion of trip |
| Car mileage | So the user can see the number of kilometers traveled for each trip | 60 days historical data. Udregnet distance på ture is saved until user requests deletion of trip |
| Car fuel consumtion | So the user can see the car's estimated fuel consumption for each trip | 8 days historical data. Calculated fuel consumption is saved until user requests deletion of trip |
| Drive in time | So the user can see the duration of the trip | Saved until user requests deletion of trip |

## Current status of your car

This feature gives you an overview of the current satus of your car / errors and time to next service and oil change

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car GPS position | Så brugeren kan se hvor bilen er | 1 hour historical data and most recent value |
| Ignition on | Used for logic, which quality assures data | 7 days historical data and most recent value |
| ignition off | Used for logic, which quality assures data | 7 days historical data and most recent value |
| Car mileage | So the user can see the car's mileage in the app | 60 days historical data and most recent value |
| Car fuel level | So the user can see the car's fuel level in the app | 7 days historical data and most recent value |
| Car lock status | So the user can see in the app if the car is locked or unlocked | 7 days historical data and most recent value |
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
| ESP activation light | Så brugeren kan få advarsel hvis ESP er deaktiveret eller i stykker | 7 days historical data and most recent value |
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
| Oil level i mm | So the user's preferred workshop can advise the user if the car's oil level is too low | Saved until the user requests deletion |
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
| Car chasis number | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| Car registration number | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| User ID | So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| OBD device ID  So the user's preferred workshop can identify the car | Saved until the user requests deletion |
| Car model information | So the user's preferred workshop can advise the user and book the correct service or repair if necessary | Saved until the user requests deletion |
| User chat history with preferred workshop | So the user's preferred workshop can get an insight into the car's history and previous dialogue to best guide the user | Saved until the user requests deletion |
| GPS status ok (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | 7 days historical data and most recent value |
| GPRS status ok (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | 7 days historical data and most recent value |
| OBD device activated (yes/no) | So user's preferred workshop can ensure that there is no fault with the OBD device in the car | Saved until the user requests deletion |

## Ancillary data

Data that is technically necessary to ensure safe and efficient reading of data from the car

| Parameter | Purpose of data processing | Storage |
|-----------|-----------------------|------------|
| Car chasis number | Used to ensure that the correct software is loaded on the OBD device | Always |
| Car technical configuration | Used to ensure that the correct software is loaded on the OBD device | Always |
| Scan of car's electronical configuration | Used to ensure that the correct software is loaded on the OBD device | Always |
| CAN-Bus raw data | Used for troubleshooting | Always |
| CAN-Bus activity on/off | Used for quality assurance of collected data | 7 days historical data and most recent value |
