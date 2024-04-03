# Get Started

Milvus offers RESTful API for you to manipulate your collections and data stored in them. Before you dive in, there are several things that are worth noting:

## Understanding the API endpoints

These API endpoints involve manipulating collections in a specified cluster as well as the data in a specific collection.

The prefix of an API endpoint should always be the URI of your Milvus instance

For instance we have:
* **GRPC Port:** localhost:19530
* **REST Port:** localhost:9091

Each port has its own set of APIs with different base endpoints:
* **GRPC:** /v1/vector/
* **REST:** /api/v1/

Example API Endpoints:
* The following is the API endpoint used to list collections in a Milvus cluster using the grpc port

```shell
curl --request GET \
    --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections' \
    --header 'Authorization: Bearer <TOKEN>' \
    --header 'accept: application/json' \
    --header 'content-type: application/json'
```
* Success Response:
```shell
{"code":200,"data":["hello_milvus"]}
```

* The following is the API endpoint is used to retrieve information about collections, including their names, IDs, and creation timestamps, using the REST port. 

```shell
curl --request GET \
    --url '${MILVUS_HOST}:${MILVUS_PORT}/api/v1/collections' \
    --header 'Authorization: Bearer <TOKEN>' \
    --header 'accept: application/json' \
    --header 'content-type: application/json'
```
* Success Response:
```shell
{
  "status": {},
  "collections": [
    {
      "name": "hello_milvus",
      "id": 448806594909840297,
      "created_timestamp": 448807071230197770,
      "created_utc_timestamp": 1712063107415
    }
  ]
}
```


## Authentication credentials

You can use a token as the authentication method when you access the API endpoints. To obtain a token, you should use a colon (:) to concatenate the username and password that you use to access your Milvus instance. For example, `root:milvus`.
