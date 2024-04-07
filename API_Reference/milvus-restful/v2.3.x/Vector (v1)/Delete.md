# Delete

Deletes one or more entities from a collection.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://${MILVUS_URI}/v1/vector/delete</span>
</div>

## Example


Delete a collection whose ID is an integer:

```shell
export MILVUS_URI="http://localhost:19530"


curl --request POST \
     --url "${MILVUS_URI}/v1/vector/delete" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "id": 1
     }'
```

Delete a collection whose ID is a string:

```shell
export MILVUS_URI="http://localhost:19530"


curl --request POST \
     --url "${MILVUS_URI}/v1/vector/delete" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "id": "id1"
     }'
```

Delete a list of collections whose IDs are integers:

```shell
export MILVUS_URI="http://localhost:19530"


curl --request POST \
     --url "${MILVUS_URI}/v1/vector/delete" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
        "collectionName": "medium_articles",
        "id": [1,2,3,4]
      }'
```

Delete a list of collections whose IDs are strings:

```shell
export MILVUS_URI="http://localhost:19530"


curl --request POST \
     --url "${MILVUS_URI}/v1/vector/delete" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
        "collectionName": "medium_articles",
        "id": ["id1", "id2", "id3","id4"]
      }'
```


## Request

### Parameters

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "collectionName": "string",
    "dbName": "string",
    "id": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **string**(required)<br>The ID of the entity to be retrieved|

```json
{
    "collectionName": "string",
    "dbName": "string",
    "id": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **array**(required)<br>An array of IDs of the entities to be retrieved|

```json
{
    "collectionName": "string",
    "dbName": "string",
    "id": "integer"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **integer**(required)<br>The ID of the entity to be retrieved|

```json
{
    "collectionName": "string",
    "dbName": "string",
    "id": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **array**(required)<br>An array of IDs of the entities to be retrieved|

## Response

Returns an empty object.

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
| `data`    | **object**<br>A data object. |
| `message`  | **string**<br>Indicates the possible reason for the reported error. |

## Possible Errors

| Error Code | Description |
| --- | --- |
| 800 | database not found |
| 1800 | user hasn't authenticate |
| 1801 | can only accept json format request |
| 1802 | missing required parameters |
| 1806 | please check the primary key and its' type can only in [int |
