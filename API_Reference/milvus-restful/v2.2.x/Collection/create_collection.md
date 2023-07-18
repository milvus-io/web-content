# Create Collection

Creates a collection in a cluster.

## Endpoint

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://{milvus_endpoint}/vector/collections/create</span>
</div>

## Example


Create a collection named `medium_articles`:

```shell
curl --request POST \
     --url '${MILVUS_ENDPOINT}/v1/vector/collections/create' \
     --header 'Authorization: Bearer <API-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
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
    "description": "string",
    "dimension": "integer",
    "metricType": "string",
    "primaryField": "string",
    "vectorField": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to create.|
| `dimension`  | **integer**(required)<br>The number of dimensions for the vector field of the collection.<br>The value ranges from **32** to **32768**.|
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

| Code | Error Message |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80007 |  This CU Size requires significant resource consumption. If you want to use it, please complete the card binding on the Billing page first. |
| 80010 | Duplicated ClusterName. You have already created a running Cluster with the same name. To avoid complexity in management, please modify the name and create a new one. |
| 80014 | Your input cuSize value is not supported yet. |
| 80022 | Dedicated cluster not support this operation. |
| 90013 | The parameter shardsNum should have a value range between 1 and 32. |
| 90014 | The length of parameter description can not exceed 4096. |
| 90015 | There are no fields. Please include at least 1 primary key field and 1 vector field in the table definition. |
| 90016 | No primary key field. |
| 90017 | There can only be one primary key field for each collection. |
| 90018 | The type of the primary key field must be int64 or varchar. |
| 90019 | AutoID can only be added to the primary key field. |
| 90020 | AutoID can only be added to a primary key field of type int64. |
| 90023 | The length of the Varchar type should be between 1 and 65535. |
| 90025 | The dimension of the vector column should be between 32 and 32768. |
| 90027 | Invalid parameter metricType. Only L2 or IP are allowed. Please refer to the documentation: https://milvus.io/docs/metric.md |
| 90100 | Parse number of field xxx type error. |
| 90102 | The cluster does not exist in current region. |
| 90106 | The collection already exists. |
| 90110 | No filter key field. |
| 90112 | The field name should not be empty. |
| 90113 | The field type of field xxx should not be empty. |
| 90114 | The index field name can only be added to a vector field. |
| 90122 | No dimension key field. |
| 90136 | No create collection content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx, but received input:xxx. |
