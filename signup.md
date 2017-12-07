# Sign up

## User messages

WORK IN PROGRESS

Sign up request:

``` json
{
  "license_number": "AB12234",
  "odometer": "44444",
  "service_interests": [ // You can use the id's or try to do text matching on the pre check some of the options in the "Værkstedsbesøg" screen
    {
      "key": "connectedcars",
      "title_da": "Connected Cars"
    },
    {
      "key": "service",
      "title_da": "Service"
    },
    {
      "key": "wheel_change",
      "title_da": "Dækskifte"
    },
    {
      "key": "oil_change",
      "title_da": "Olieskift"
    },
  ],
  "phone": "+4512345678",
  "first_name": "Test",
  "last_name": "Testsen",
  "email": "test@testsen.dk",
  "address": "Testvej 1",
  "postal_code": "1234",
  "city": "Testby",
  "comments": "" // We might prefil some comments that might be usefull for the workshop
};
```

https://<vendor url>/#userinfo=jwttoken
