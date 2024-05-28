# Get Partition Statistics

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/partitions/get_stats</span>
    </div>
</div>

This operations gets the number of entities in a partition.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/partitions/get_stats" \
--header "Content-Type: application/json" \
--data-raw '{
    "partitionName": "january",
    "collectionName": "quick_setup"
}'
```
Possible response is similar to the following:
```json
{
    "code": 0,
    "data": {
        "rowCount": 0
    }
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
    "partitionName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of an existing database. The value defaults to __default__.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of an existing collection.  |
| `partitionName` <span style="color:red">*</span> | __string__<br/>The name of the target partition of this operation.  |

## Response

成功

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "rowCount": "integer"
    }
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
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
| `data` | __object__<br/> |
| `data.rowCount`  | __integer__<br/>The number of entities.  |
