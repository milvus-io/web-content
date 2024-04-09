# Delete

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/entities/delete</span>
    </div>
</div>

This operation deletes entities by their IDs or with a boolean expression.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/entities/delete" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup",
    "filter": "id in [0,1]"
}'
```
Possible response is similar to the following.
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
    "filter": "string",
    "partitionName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the target database.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of an existing collection.  |
| `filter` <span style="color:red">*</span> | __string__<br/>A scalar filtering condition to filter matching entities.    The value defaults to an empty string, indicating that no condition applies. Setting both **id** and **filter** results in an error.<br/>You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md).  |
| `partitionName`  | __string__<br/>The name of a partition in the current collection. <br/>If specified, the data is to be deleted from the specified partition.  |

## Response

A dictionary contains the number of deleted entities.

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
