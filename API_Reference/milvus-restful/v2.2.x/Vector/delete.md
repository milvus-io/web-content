# Delete

Deletes one or more entities from a collection.

## Endpoint

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://{milvus_endpoint}/vector/delete</span>
</div>

## Example


Delete a collection whose ID is an integer:

```shell
curl --request POST \
     --url '${MILVUS_ENDPOINT}/v1/vector/delete' \
     --header 'Authorization: Bearer <API-Key>' \
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
     --url '${MILVUS_ENDPOINT}/v1/vector/delete' \
     --header 'Authorization: Bearer <API-Key>' \
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
     --url '${MILVUS_ENDPOINT}/v1/vector/delete' \
     --header 'Authorization: Bearer <API-Key>' \
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
     --url '${MILVUS_ENDPOINT}/v1/vector/delete' \
     --header 'Authorization: Bearer <API-Key>' \
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

- No path parameters required

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

| Code | Error Message |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Invalid clusterId or you do not have permission to access that Cluster. |
| 80022 | Dedicated cluster not support this operation. |
| 90001 | The collection xxx does not exist. You can use ListCollections to view the list of existing collections. |
| 90011 | Invalid CollectionName. Reason: xxx |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90110 | No filter key field. |
| 90123 | The inputted ID value does not match the field xxx, expecting xxx but received xxx instead. |
| 90124 | no id key field, please check your request. |
| 90127 | Please use xxx in (a,b,c) filtering in the expression. |
| 90128 | Not contains data to filter, please check the filter field |
| 90129 | Filter dataType not support, please check the filter field |
| 90132 | No delete content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx, but received input:xxx. |
| 90140 | The number of elements in parameter 'id' should not exceed 100. |
