# Create Collection

Creates a collection in a cluster.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://${MILVUS_URI}/v1/vector/collections/create</span>
</div>

## Example


Create a collection named `medium_articles`:

```shell
export MILVUS_URI="http://localhost:19530"


curl --request POST \
     --url "${MILVUS_URI}/v1/vector/collections/create" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "dbName": "default",   
       "collectionName": "medium_articles",
       "dimension": 256,
       "metricType": "L2",
       "primaryField": "id",
       "vectorField": "vector"
      }'
```

Success response:

```shell
{
    "code": 200,
    "data": {}
}
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
    "description": "string",
    "dimension": "integer",
    "metricType": "string",
    "primaryField": "string",
    "vectorField": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database. |
| `collectionName`  | **string**(required)<br>The name of the collection to create.|
| `dimension`  | **integer**(required)<br>The number of dimensions for the vector field of the collection. For performance-optimized CUs, this value ranges from 1 to 32768. For capacity-optimized and cost-optimized CUs, this value ranges from 32 to 32768.<br>The value ranges from **1** to **32768**.|
| `metricType`  | **string**<br>The distance metric used for the collection.<br>The value defaults to **L2**.|
| `primaryField`  | **string**<br>The primary key field.<br>The value defaults to **id**.|
| `vectorField`  | **string**<br>The vector field.<br>The value defaults to **vector**.|
| `description`  | **string**<br>The description of the collection|

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
| 1803 | fail to marshal collection schema |
