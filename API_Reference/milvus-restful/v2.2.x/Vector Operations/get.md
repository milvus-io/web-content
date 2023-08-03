# Get

Conducts a similarity search in a collection.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get</span>
</div>

## Example


Get a specified entity whose ID is an integer:

```shell
curl --request POST \
     --url "${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": 1
     }'
```

Get a specified entity whose ID is a string:

```shell
curl --request POST \
     --url "${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": "id1"
     }'
```

Get a list of entities whose IDs are integers:

```shell
curl --request POST \
     --url "${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": [1, 2]
     }'
```

Get a list of entities whose IDs are strings:

```shell
curl --request POST \
     --url "${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d "{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": ["id1", "id2"]
     }"
```



## Request

### Parameters

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "collectionName": "string",
    "id": "string",
    "outputFields": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `outputFields`  | **array**<br>An array of fields to return along with the search results.|
| `id`  | **string**(required)<br>The ID of the entity to be retrieved|

```json
{
    "collectionName": "string",
    "id": [],
    "outputFields": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `outputFields`  | **array**<br>An array of fields to return along with the search results.|
| `id`  | **array**(required)<br>An array of IDs of the entities to be retrieved|

```json
{
    "collectionName": "string",
    "id": "integer",
    "outputFields": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `outputFields`  | **array**<br>An array of fields to return along with the search results.|
| `id`  | **integer**(required)<br>The ID of entity to be retrieved|

```json
{
    "collectionName": "string",
    "id": [],
    "outputFields": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `outputFields`  | **array**<br>An array of fields to return along with the search results.|
| `id`  | **array**(required)<br>An array of IDs of the entities to be retrieved|

## Response

Returns the search results.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": 200,
    "data": {}
}
```

- Response body if we failed to process your request

```json
{
    "code": integer,
    "message": string
}
```

### Properties

The properties in the returned response are listed in the following table.

| Property | Description                                                                                                                                 |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br>Indicates whether the request succeeds.<br><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data`  | **array**<br>A data array of objects. |
| `message`  | **string**<br>Indicates the possible reason for the reported error. |

## Possible Errors

| Error Code | Description |
| --- | --- |
| 800 | database not found |
| 1800 | user hasn't authenticate |
| 1801 | can only accept json format request |
| 1802 | missing required parameters |
| 1805 | fail to parse search result |
| 1806 | please check the primary key and its' type can only in [int |
