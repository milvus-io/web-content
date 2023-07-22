# Delete

Deletes one or more entities from a collection.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://{public_endpoint}/v1/vector/delete</span>
</div>

## Example


Delete a collection whose ID is an integer:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "id": 1
     }'
```

Delete a collection whose ID is a string:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "id": "id1"
     }'
```

Delete a list of collections whose IDs are integers:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "collection1",
        "id": [1,2,3,4]
      }'
```

Delete a list of collections whose IDs are strings:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "collection1",
        "id": ["id1", "id2", "id3","id4"]
      }'
```


## Request

### Parameters

- No query parameters required

- Path parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `public-endpoint`  | **string**(required)<br>|

### Request Body

```json
{
    "collectionName": "string",
    "id": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **string**(required)<br>The ID of the entity to be retrieved|

```json
{
    "collectionName": "string",
    "id": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **array**(required)<br>An array of IDs of the entities to be retrieved|

```json
{
    "collectionName": "string",
    "id": "integer"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `id`  | **integer**(required)<br>The ID of the entity to be retrieved|

```json
{
    "collectionName": "string",
    "id": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
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

None