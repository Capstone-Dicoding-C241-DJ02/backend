# Leaderboard API

## GET

Endpoint: /leaderboards/:id

status code: 200

response:

```json
{
  "message": "Successfully retrieved data",
  "data": {
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
    "job": {
      "id": <job_id>,
      "title": "<job_title>",
      "business_sector": "<bussines_sector>",
      "city": "<city>"
    },
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
