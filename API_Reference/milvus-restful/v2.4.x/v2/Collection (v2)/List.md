# List Collections

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/collections/list</span>
    </div>
</div>

This operation lists all collections in the specified database.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/list" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default"
}'
```

The possible output will be similar to the following:

```json
{
  "code": 200,
  "data": [
    "quick_setup_new",
    "customized_setup_1",
    "customized_setup_2"
  ]
}
```



## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation. Setting this to None indicates that this operation times out when any response returns or an error occurs.<br/>|
    | `Authorization`  | **string**<br/>The authentication token|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of an existing database.  |

## Response

This operation lists all collections in the database used in the current connection.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": [
        {}
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
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data` | __array__<br/>A list of collection names. |
| `data[]`  | __string__<br/>A collection name.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
