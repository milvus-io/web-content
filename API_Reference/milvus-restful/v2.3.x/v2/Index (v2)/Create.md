# Create Index

This creates a named index for a target field, which can either be a vector field or a scalar field.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  http://${MILVUS_URI}/v2/vectordb/indexes/create</span>
</div>



## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/indexes/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_setup_not_indexed",
    "indexParams": [
        {
            "metricType": "L2",
            "fieldName": "my_vector",
            "indexName": "my_vector",
            "indexConfig": {
                "index_type": "IVF_FLAT",
                "nlist": "1024"
            }
        }
    ]
}'
```
Possible response is similar to the following:
```json
{
    "code": 200,
    "data": {}
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation.<br/>Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "collectionName": "string",
    "indexParams": [
        {
            "metricType": "string",
            "fieldName": "string",
            "indexName": "string",
            "indexConfig": {
                "index_type": "string",
                "M": "string",
                "efConstruction": "string",
                "nlist": "string"
            }
        }
    ]
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database to which the collection belongs.<br/>Setting this to a non-existing database results in an error.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of the target collection.<br/>Setting this to a non-existing collection results in an error.  |
| `indexParams` | __array__<br/>The parameters that apply to the index-building process. |
| `indexParams[]` | __object__<br/> |
| `indexParams[].metricType`  | __string__<br/>The similarity metric type used to build the index.<br/>The value defaults to COSINE  |
| `indexParams[].fieldName`  | __string__<br/>The name of the target field on which an index is to be created.  |
| `indexParams[].indexName`  | __string__<br/>The name of the index to create, the value defaults to the target field name.  |
| `indexParams[].indexConfig` | __object__<br/>The index type and related settings. For details, refer to [Vector Indexes](https://milvus.io/docs/index.md). |
| `indexParams[].indexConfig.index_type`  | __string__<br/>The type of the index to create  |
| `indexParams[].indexConfig.M`  | __string__<br/>The maximum degree of the node and applies only when index_type is set to __HNSW__.  |
| `indexParams[].indexConfig.efConstruction`  | __string__<br/>The search scope. This applies only when **index_type** is set to **HNSW**  |
| `indexParams[].indexConfig.nlist`  | __string__<br/>The number of cluster units. This applies to IVF-related index types.  |

## Response

A Status object indicating whether this operation succeeds.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
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
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data` | __object__<br/> |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
