# Has Collection

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  http://${MILVUS_URI}/v2/vectordb/collections/has</span>
</div>

This operation checks whether a collection exists.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/has" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default",
    "collectionName": "quick_setup"
}'
```

The possible response is similar to the following:

```json
{
  "code": 200,
  "data": {
    "has": true
  }
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation. Setting this to None indicates that this operation times out when any response returns or an error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "collectionName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName` <span style="color:red">*</span> | __string__<br/>The name of the database in which to check the existence of a collection.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of an existing collection.  |

## Response

A boolean value indicates whether the specified partition exists.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "has": "boolean"
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
| `data` | __object__<br/> |
| `data.has`  | __boolean__<br/>A boolean value indicates whether the specified partition exists.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
