# Describe Index

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/indexes/describe</span>
    </div>
</div>

This operation describes the current index.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/indexes/describe" \
--header "Content-Type: application/json" \
--data-raw '{
    "indexName": "vector",
    "collectionName": "quick_setup"
}'
```
Possible response is similar to the following:
```json
{
    "code": 0,
    "data": [
        {
            "failReason": "",
            "fieldName": "vector",
            "indexName": "vector",
            "indexState": "Finished",
            "indexType": "AUTOINDEX",
            "indexedRows": 0,
            "metricType": "COSINE",
            "pendingRows": 0,
            "totalRows": 0
        }
    ]
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
    "indexName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database to which the collection belongs.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of an the collection to which the index belongs.  |
| `indexName` <span style="color:red">*</span> | __string__<br/>The name of the index to describe.  |

## Response

An object that contains the detailed description of the current index.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": [
        {
            "fieldName": "string",
            "indexName": "string",
            "indexState": "string",
            "indexType": "string",
            "indexedRows": "integer",
            "metricType": "string",
            "pendingRows": "integer",
            "totalRows": "integer",
            "failReason": "string"
        }
    ]
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
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`0`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
| `data` | __array__<br/> |
| `data[]` | __object__<br/> |
| `data[].fieldName`  | __string__<br/>The name of the target field.  |
| `data[].indexName`  | __string__<br/>The name of the index.  |
| `data[].indexState`  | __string__<br/>The status of the indexing progress.  |
| `data[].indexType`  | __string__<br/>The type of this index.  |
| `data[].indexedRows`  | __integer__<br/>The total number o rows that have been indexed.  |
| `data[].metricType`  | __string__<br/>The type of the metric.  |
| `data[].pendingRows`  | __integer__<br/>The number of rows that are waiting to be indexed.  |
| `data[].totalRows`  | __integer__<br/>The total number of entities/rows  |
| `data[].failReason`  | __string__<br/>The reason for the failure to build indexes.  |
