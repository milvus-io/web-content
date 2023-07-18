# Insert

Inserts one or more entities into a collection.

## Endpoint

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://{milvus_endpoint}/vector/insert</span>
</div>

## Example


Insert an entity to a collection named `collection1`:

```shell
curl --request POST \
     --url '${MILVUS_ENDPOINT}/v1/vector/insert' \
     --header 'Authorization: Bearer <API-Key>' \
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
     --url '${MILVUS_ENDPOINT}/v1/vector/insert' \
     --header 'Authorization: Bearer <API-Key>' \
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

- No path parameters required

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

| Code | Error Message |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Invalid clusterId or you do not have permission to access that Cluster. |
| 80022 | Dedicated cluster not support this operation. |
| 90001 | The collection xxx does not exist. You can use ListCollections to view the list of existing collections. |
| 90010 | The type of field xxx does not match, expecting an xxx but xxx was inputted instead. |
| 90011 | Invalid CollectionName. Reason: xxx |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90107 | Can not assign primary field data when auto id enabled int64 |
| 90108 | Extraneous fields xxx in the json file need to be removed |
| 90109 | The max insert batch rows should below 100. |
| 90111 | The parameter value for 'level' should be between 1 and 3. |
| 90115 | The number of columns inserted does not match the defined number of columns in the set. |
| 90118 | no data key field, please check your request. |
| 90119 | The value of the 'data' parameter should be in JSON format. |
| 90120 | The value of the 'data' parameter is empty. |
| 90121 | There is an empty object in the 'data' parameter. |
| 90131 | No insert content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx, but received input:xxx. |
