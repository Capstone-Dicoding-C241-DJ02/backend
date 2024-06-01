# Leaderboard API

## GET

Endpoint: /jobs/:jobId/leaderboard

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
  "message": "leaderboard is not found"
}
```

#

Endpoint: /leaderboards/:leaderboardId/candidate/:candidateId

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
  "message": "Leaderboard/candidate not found"
}
```
