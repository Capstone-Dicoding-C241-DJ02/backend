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

Status Code 201:

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
  "message": "Max file is 2MB"
}
```

## PATCH

Endpoint: /candidates/summarize/cv

request body:

```json
{
  "cv_name": "<cv_name>",
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

## GET

Endpoint: /candidates/:id

status code: 200

response

```json
{
  "message": "Successfully get data",
  "data": {
    "candidate": {
      "id": <candidateId>,
      "fullname": "<candidate_fullname>",
      "title": "<candidate_fullname>",
      "email": "<email>",
      "phone": "<phone>",
      "additional_link": "<additional_link>",
      "passphoto": "<pasphoto_url>",
      "original_cv_url": "<original_cv_url>",
      "cv_summary": "<cv_summary>",
      "match_percentage": <percentage>
    }
  }
}
```

status code 404:

```json
{
  "message": "Data not found"
}
```
