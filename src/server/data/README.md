# GraphQL
## Queries
Viewer Query

```
{
  viewer {
    id
    totalCount
    completedCount
    todos {
      edges {
        node {
          text
          complete
        }
      }
    }
  }
}


...

{
  "data": {
    "viewer": {
      "id": "VXNlcjptZQ==",
      "totalCount": 2,
      "completedCount": 1,
      "todos": {
        "edges": [
          {
            "node": {
              "text": "Taste JavaScript",
              "complete": true
            }
          },
          {
            "node": {
              "text": "Buy a unicorn",
              "complete": false
            }
          }
        ]
      }
    }
  }
}

```
