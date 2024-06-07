# Leaderboard API

## GET

Endpoint: /jobs/:jobId/leaderboard

required headers:

```json
{
  "authorization": "Bearer ${token}"
}
```

status code: 200

response:

```json
{
  "message": "Successfully retrieved data",
  "data": {
    "job": {
      "id": "<ID>", //number
      "logo": "<Logo Url>",
      "title": "<Job Title>",
      "city": "<Location>",
      "business_sector": "<Business Sector>"
    },
    "candidates": [
      {
        "id": <candidateId>,
        "fullname": "<candidate_fullname>",
        "title": "<candidate_title>"
      },
      {
        "id": <candidateId>,
        "fullname": "<candidate_fullname>",
        "title": "<candidate_title>"
      },
      {
        "id": <candidateId>,
        "fullname": "<candidate_fullname>",
        "title": "<candidate_title>"
      },
    ]
  }
}
```

status code: 404

```json
{
  "message": "job is not found"
}
```

status code: 403

```json
{
  "message": "No token provided"
}
```

#
