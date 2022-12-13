[Go back to Integrations](./integrations/intro)

# Show news feed in app
When a customer open their app, Connected Cars can show news with for example marketing or informational content from an endpoint you make available. The news information needed are listed below.

The endpoint should be available via HTTPS and can require authentication via a symmetric key (like an API key listed in the example below). The endpoint must return a JSON response with a 200 status code.

Once the endpoint is ready, provide Connected Cars with the details. Connected Cars will then implement the prefill based on the provided endpoint.

## Field descriptions
| Key           | Type                                     | Example                                             | Notes                                              |
|:--------------|:-----------------------------------------|:----------------------------------------------------|:---------------------------------------------------|
| `title`       | String                                   | `Some title`                                        | Required                                           |
| `content`     | String                                   | `Some content description`                          | Required                                           |
| `url`         | String                                   | `https://example.com/videos/get-your-car-connected` | Required                                           |
| `tags`        | Array of strings                         | `["connected", "car"]`                              | Optional                                           |
| `images`      | Array of [images](?id=image-description) | See below                                           | Required                                           |
| `publishedAt` | Datetime, RFC3339                        | `2022-08-06T12:00:00.000Z`                          | Optional, will default to be published immediately |
| `createdAt`   | Datetime, RFC3339                        | `2022-08-01T13:37:00.000Z`                          | Required                                           |

### Image description
| Key      | Type   | Example                                                        | Notes    |
|:---------|:-------|:---------------------------------------------------------------|:---------|
| `url`    | String | `https://example.com/resources/get-your-car-connected-800.jpg` | Required |
| `width`  | Number | `800`                                                          | Required |
| `height` | Number | `450`                                                          | Required |
| `size`   | Number | `43008`                                                        | Optional |

## Example request and output
```
GET https://example.com/latest-news
X-Api-Key: some-api-key
```

```json
[
  {
    "title": "Get your car connected",
    "content": "This is a description.\n\nWhich is text displayed near the video.",
    "url": "https://example.com/news/get-your-car-connected",
    "slug": "get-your-car-connected-123",
    "tags": ["connected", "car"],
    "images": [
      {
        "url": "https://example.com/resources/get-your-car-connected-800.jpg",
        "width": 800,
        "height": 450,
        "size": 43008
      }
    ],
    "publishedAt": "2022-08-06T12:00:00.000Z",
    "createdAt": "2022-08-01T13:37:00.000Z"
  }
]
```
