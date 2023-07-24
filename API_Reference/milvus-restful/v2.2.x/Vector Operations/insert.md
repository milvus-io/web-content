# Insert

Inserts one or more entities into a collection.

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://{public_endpoint}/v1/vector/insert</span>
</div>

## Example


Insert an entity to a collection named `collection1`:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/insert' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
         "collectionName": "collection1",
         "data": {
             "id": "id1",
             "vector": [0.1, 0.2, 0.3],
             "name": "tom",
             "email": "tom@zilliz.com",
             "date": "2023-04-13"
          }
     }'
```

Insert multiple entities:

```shell
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/insert' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
         "collectionName": "collection1",
         "data": [
             {
                "id": "id1",
                "vector": [0.1, 0.2, 0.3],
                "name": "bob",
                "email": "bob@zilliz.com",
                "date": "2023-04-13"
             },{
                "id": "id2",
                "vector": [0.1, 0.2, 0.3],
                "name": "ally",
                "email": "ally@zilliz.com",
                "date": "2023-04-11"
             }
         ]
     }'
```



## Request

### Parameters

- No query parameters required

- Path parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `public-endpoint`  | **string**(required)<br>|

### Request Body

```json
{
    "collectionName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which entities will be inserted.|
| `data`  | **object**(required)<br>An entity object. Note that the keys in the entity should match the collection schema.|

```json
{
    "collectionName": "string",
    "data": []
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which entities will be inserted.|
| `data`  | **array**(required)<br>An array of entity objects. Note that the keys in an entity object should match the collection schema|

## Response

Returns the number of inserted entities and an array of their IDs.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": 200,
    "data": {
        "insertCount": "integer"
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
| `code`   | **integer**<br>Indicates whether the request succeeds.<br><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data`    | **object**<br>A data object. |
| `data.insertCount`   | **integer**<br>The number of inserted entities. |
| `data.insertIds`   | **array**<br>An array of the IDs of inserted entities. |
| `message`  | **string**<br>Indicates the possible reason for the reported error. |

## Possible Errors

| Error Code | Description |
| --- | --- |
| 800 | database not found |
| 1800 | user hasn't authenticate |
| 1801 | can only accept json format request |
| 1802 | missing required parameters |
| 1804 | fail to deal the insert data |
| 1806 | please check the primary key and its' type can only in [int |
