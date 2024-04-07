# Describe Alias

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  http://${MILVUS_URI}/v2/vectordb/aliases/describe</span>
</div>

This operation describes the details of a specific alias.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/aliases/describe" \
--header "Content-Type: application/json" \
--data-raw  '{
    "aliasName": "bob"
}'
```
Possible response is similar to the following
```shell
{
    "code": 200,
    "data": {
        "aliasName": "bob",
        "collectionName": "quick_setup",
        "dbName": "default"
    }
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation in seconds. Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "aliasName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database to which the collection belongs.  |
| `aliasName` <span style="color:red">*</span> | __string__<br/>The name of the alias whose details are to be listed.  |

## Response

An alias object that contains the detailed description of an alias.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "dbName": "string",
        "collectionName": "string",
        "aliasName": "string"
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
| `data.dbName`  | __string__<br/>The name of the database to which the collection belongs.  |
| `data.collectionName`  | __string__<br/>the name of the collection to which an alias belongs.  |
| `data.aliasName`  | __string__<br/>The name of the alias.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
