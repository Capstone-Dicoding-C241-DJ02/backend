# Candidate API

## POST

Endpoint: /candidates/apply/jobs/:id

required headers:

```json
{
  "Content-Type": "multipart/form-data"
}
```

request body:

```json
{
  "fullname": "<name>",
  "email": "<email>",
  "phone": "<phone>",
  "portofolio_link": "<link>",
  "passphoto": "<img>",
  "cv": "<pdf>"
}
```

Status Code 200:

Response body:

```json
{
  "message": "Successfully apply the job"
}
```

Status Code 400:

Response Body:

```json
{
  "message": "Max cv file is 2MB"
}
```

#

Endpoint: /candidates/:id/summarize/cv

request body:

```json
{
  "summarized_cv": "<raw_text>"
}
```

status code: 201

```json
{
  "message": "Succesfully added summarized CV"
}
```

status code: 400

```json
{
  "message": "summarized CV is should not be empty"
}
```

status code: 404

```json
{
  "message": "candidate is not found"
}
```
