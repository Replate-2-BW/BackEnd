# BackEnd

## Deployed version
https://replate-2.herokuapp.com/

## User End Points
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



## Pickup End Points
### POST /api/auth/pickup/add
Endpoint for Biz to create a Pickup:
* Requires a valid "Authorization" token in the header.
* pass a 1 for volUserID to link it to the place holder ID untill an actual user claims it
* bizUserID should be the ID of the biz creating the pickup
* both IDs must be valid to create a new pick up.
#### Sample Object:
```
{
    "id": (SYSTEM GENERATED),
    "typeOfFood": "required",
    "qty": 10, (required integer)
    "preferredPickupTime": "required",
    "bizUserID": 3, (required valid user ID)
    "VolClaimed": 0, (boolean defaults to false)
    "volUserID": 1, (SEE ABOVE, set to 1 is no user is claiming)
    "delivered": 0 (boolean defaults to false)
}
```
Endpoint returns the object created.

### PUT /api/auth/pickup/:id
Endpoint for editing a Pick-up by the ID of the pick-up.
* Requires a valid "Authorization" token in the header.
* Requires the values to be updated
```
{
	"typeOfFood": "apple"
}
```
Returns the updated object.

### GET /api/auth/pickup/
* Requires a valid "Authorization" token in the header.
* Returns an  array list of all unclaimed pick ups for volunteers to claim.

### GET /api/auth/pickup/:id/vol
* Requires a valid "Authorization" token in the header.
* Returns a list of pick ups claimed by the volunteers ID passed.

### GET /api/auth/pickup/:id/biz
* Requires a valid "Authorization" token in the header.
* Returns a list of pick ups claimed by the biz ID passed.

### DEL /api/auth/pickup/:id/del
Endpoint to DEL a Pickup buy the pickup ID passed
* Requires a valid "Authorization" token in the header.
#### NOTE: This should only be used with a biz user to del their pick up.
* claim and drop off changes should be done with the PUT for editing a pick up.
