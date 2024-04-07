# Get Collection Load State

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  http://${MILVUS_URI}/v2/vectordb/collections/get_load_state</span>
</div>

This operation returns the load status of a specific collection.

## Example

```shell
export MILVUS_URI="http://localhost:19530"


curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/get_load_state" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup"
}'
```
Possible response is similar to the following:
```json
{
    "code": 200,
    "data": {
        "loadProgress": 100,
        "loadState": "LoadStateLoaded"
    }
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation. Setting this to None indicates that this operation times out when any response returns or an error occurs.|
    | `Authorization`  | **string**<br/>|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "collectionName": "string",
    "partitionNames": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of a database to which the collection belongs.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of a collection.  |
| `partitionNames`  | __string__<br/>A list of partition names. If any partition names are specified, releasing any of these partitions results in the return of a NotLoad state.  |

## Response

A LoadState object that indicates the load status of the specified collection.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "loadState": "string",
        "loadProgress": "integer"
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
| `data.loadState`  | __string__<br/>An object that indicates the load status of the specified collection.  |
| `data.loadProgress`  | __integer__<br/>An integer that indicates the load progress in the percentage of the specified collection.  |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
