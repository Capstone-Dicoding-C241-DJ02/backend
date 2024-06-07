# Auth API

## POST

Endpoint: /auth/login

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
  "data": {
    "accessToken": "<jwt_access_token>"
  }
}
```

status code 400:

```json
{
  "message:": "Email or password is not correct"
}
```

## GET

Endpoint: /auth/tokens

request cookies:

```json
{
  "rft": "<refresh_token>"
}
```

status code 200:
response:

```json
{
  "message": "Successfully get access token",
  "data": {
    "accessToken": "<access_token>"
  }
}
```

status code 403:

```json
{
  "message": "No token provided"
}
```
