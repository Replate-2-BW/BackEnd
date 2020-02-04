# BackEnd

## Deployed version
https://replate-2.herokuapp.com/

## End Points
### POST /api/register
Endpoint to create a user when sending requiered values
#### User Object
```
{
    "id": (SYSTEM GENERATED),
    "username": "required",
    "password": "required",
    "phoneNumber": "required",
    "bizName": "optional",
    "bizAddress": "optional",
    "userType": "required"
}
```
Returns the User it creates.

### POST /api/login
Endpoint to Login when user and pass or sent.
#### Login Object
```
{
	"username": "required",
	"password": "required"
}
```
Returns token and user routing info.
```
{
    "yourToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsInVzZXJUeXBlIjoiYnVzaW5lc3MiLCJpYXQiOjE1ODA4MzQxNjMsImV4cCI6MTU4MDkyMDU2M30.ZwNf0eyHpEu5T5-CYkYbVwNJpHYo0p5ce9sePlzl-Ac",
    "userID": 3,
    "userType": "business"
}
```

### GET /api/auth/:id/user
Endpoint to retrieve a user by their ID.
## Requires a valid "Authorization" token in the header
Return the object for the user.
```
{
    "id": 1,
    "username": "placeholder",
    "password": "$2a...",
    "phoneNumber": "1234567890",
    "bizName": null,
    "bizAddress": null,
    "userType": "volunteer"
}
```

### PUT /api/auth/:id/user
Endpoint to edit a user object by the User ID.
* Requires a valid "Authorization" token in the header.
* Requires the values to be updated
#### This should only be used to update:
```
 {
   "phoneNumber": "1234567890",
   "bizName": "Big Company",
   "bizAddress": "123 street",
   "userType": "business"
 }
```
Returns the updated object.

### DEL /api/auth/:id/user/del
* Endpoint to del user by the ID.
* Returns the numbers of successful del.






required
optional
