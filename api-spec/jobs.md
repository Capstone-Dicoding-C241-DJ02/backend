# JOBS API

#### BASE URL: http://[host]:[port]

## GET

#### Endpoint: /jobs

Status Code: 200

Response Body:

```json
{
  "message": "Successfully retrieved data",
  "data": {
    "jobs": [
      {
        "id": "<ID>", //number
        "logo": "<Logo Url>",
        "title": "<Job Title>",
        "city": "<Location>",
        "business_sector": "<Business Sector>"
      },
      {
        "id": "<ID>", //number
        "logo": "<Logo Url>",
        "title": "<Job Title>",
        "city": "<Location>",
        "business_sector": "<Business Sector>"
      }
    ]
  }
}
```

#

#### Endpoint: /jobs/:id

Status Code: 200

Response Body:

```json
{
  "message": "Successfully retrieved data",
  "data": {
    "job": {
      "id": "<ID>", //number
      "logo": "<Logo Url>",
      "title": "<Job Title>",
      "city": "<Location>",
      "business_sector": "<Business Sector>",
      "job_desc": "<Job Desc>"
    }
  }
}
```

Status Code 400:

Response Body:

```json
{
  "message": "id should be a number"
}
```

Status Code 404:

Response Body:

```json
{
  "message": "Data not found"
}
```
