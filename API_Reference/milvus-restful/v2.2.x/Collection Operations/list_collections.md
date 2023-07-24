# List Collections

Lists collections in a cluster.

<div>
    <div style="display: inline-block; background: #0d8d67; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>GET</span>
    </div>
    <span style="font-weight: bold;">  https://{public_endpoint}/v1/vector/collections</span>
</div>

## Example


List all collections in a cluster:

```shell
curl --request GET \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

Sample response:

```shell
{
   code: 200,
   data: [
         "collection1",
         "collection2",
         ...
         "collectionN",
         ]
}
```



## Request

### Parameters

- No query parameters required

- Path parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `public-endpoint`  | **string**(required)<br>|

### Request Body

No request body required

## Response

Returns a list of collections in the specified cluster.

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
| `data`  | **array**<br>A data array of strings. |
| `message`  | **string**<br>Indicates the possible reason for the reported error. |

## Possible Errors

| Error Code | Description |
| --- | --- |
| 800 | database not found |
| 1800 | user hasn't authenticate |
