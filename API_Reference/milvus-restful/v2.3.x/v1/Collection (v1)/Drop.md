# Drop Collection

Drops a collection. This operation erases your collection data. Exercise caution when performing this operation.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://${MILVUS_URI}/v1/vector/collections/drop</span>
</div>

## Example


Drop a collection named `medium_articles`:

```shell
export MILVUS_URI="http://localhost:19530"


curl --request POST \
     --url "${MILVUS_URI}/v1/vector/collections/drop" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
        "collectionName": "medium_articles"
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

- Path parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `CLUSTER_ENDPOINT`  | **string**(required)<br>The endpoint of your cluster.|

### Request Body

```json
{
    "collectionName": "string",
    "dbName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br>The name of the database.|
| `collectionName`  | **string**(required)<br>The name of the collection to delete.|

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

| Error Code | Description |
| --- | --- |
| 800 | database not found |
| 1800 | user hasn't authenticate |
| 1801 | can only accept json format request |
| 1802 | missing required parameters |
