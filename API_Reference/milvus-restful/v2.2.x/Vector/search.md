# Search

Conducts a similarity search in a collection. 

## Endpoint

<div>
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    <span style="font-weight: bold;">  https://{milvus_endpoint}/vector/search</span>
</div>

## Example


Search entities based on a given vector:

```shell
curl --request POST \
     --url '${MILVUS_ENDPOINT}/v1/vector/search' \
     --header 'Authorization: Bearer <API-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "collection1",
        "vector": [0.0128121, 0.029119, .... , 0.09121]
      }'
```

Search entities and return specific fields:

```shell
curl --request POST \
     --url '${MILVUS_ENDPOINT}/v1/vector/search' \
     --header 'Authorization: Bearer <API-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "vector": [0.0128121, 0.029119, .... , 0.09121],
       "filter": "id in (1, 2, 3)",
       "limit": 100,
       "offset": 0
     }'
```



## Request

### Parameters

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "collectionName": "string",
    "filter": "string",
    "limit": "integer",
    "offset": "integer",
    "outputFields": [],
    "vector": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `collectionName`  | **string**(required)<br>The name of the collection to which this operation applies.|
| `filter`  | **string**<br>The filter used to find matches for the search|
| `limit`  | **integer**<br>The maximum number of entities to return.<br>The value defaults to **100**.<br>The value ranges from **1** to **3000**.|
| `offset`  | **integer**<br>The number of entities to skip in the search results.<br>The maximum value is **16384**.|
| `outputFields`  | **array**<br>An array of fields to return along with the search results.|
| `vector`  | **string**(required)<br>The label of this field should be the name of the indexed vector field in the collection. For example, if the name of the indexed vector field is **title_vector**, the label of this field should be **title_vector**.|

## Response

Returns the search results.

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
| `data`  | **array**<br>A data array of objects. |
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
| 90002 | The return value property xxx does not exist on collection xxx. |
| 90004 | The parameter value for 'limit' should be between 1 and 100. |
| 90005 | The parameter value for 'offset' should not be less than 0. |
| 90006 | The attribute xxx is not of vector type, and therefore can not be used for approximate retrieval. |
| 90007 | The vector dimensions do not match on the field xxx. The input vector has a dimension of xxx, while the expected vector dimension is xxx. |
| 90011 | Invalid CollectionName. Reason: xxx |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90110 | No filter key field. |
| 90111 | The parameter value for 'level' should be between 1 and 3. |
| 90115 | The number of columns inserted does not match the defined number of columns in the set. |
| 90125 | No vector key field. |
| 90126 | The sum of the 'offset' parameter value and the 'limit' parameter value should not exceed 16384. |
| 90135 | No search content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx, but received input:xxx. |
