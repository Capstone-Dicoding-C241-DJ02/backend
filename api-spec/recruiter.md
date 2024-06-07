# Recruiter API

## POST

Endpoint: /recruiters/login

request body:

```json
{
  "email": "<email>", //required
  "password": "<password>" //required
}
```

status code 200:

```json
{
  "message": "Successfully logged in",
  "access_token": "<jwt_access_token>"
}
```

status code 400:

```json
{
  "message:": "Email or password is not correct"
}
```
