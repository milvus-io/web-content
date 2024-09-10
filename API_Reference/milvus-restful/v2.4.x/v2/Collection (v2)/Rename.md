# Rename Collection

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/collections/rename</span>
    </div>
</div>

This operation renames an existing collection and optionally moves the collection to a new database.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/rename" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default",
    "collectionName": "test_collection",
    "newCollectionName": "quick_setup"
}'
```
Possible responses are similar to the following:

```json
{
    "code": 0,
    "data": {}
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation in seconds. Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.|
    | `Authorization`  | **string**<br/>The authentication token|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "collectionName": "string",
    "newDbName": "string",
    "newCollectionName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database to which the collection belongs.<br/>Setting this to a non-existing database results in an error.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of the target collection.<br/>Setting this to a non-existing collection results in an error.  |
| `newDbName`  | __string__<br/>The name of the database to which the collection belongs after this operation.<br/>The value defaults to **default**. Setting this to a database rather than the one the collection belongs to before this operation moves this collection to the specified database.<br/>Setting this to a non-existing database results in an error.  |
| `newCollectionName` <span style="color:red">*</span> | __string__<br/>The name of the target collection after this operation.<br/>Setting this to the value of **old_collection_name** results in an error.  |

## Response

None

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
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`0`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
| `data` | __object__<br/> |
