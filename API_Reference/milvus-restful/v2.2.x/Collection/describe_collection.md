# Describe Collection

Describes the details of a collection.

## Endpoint

<div>
    <div style="display: inline-block; background: #0d8d67; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>GET</span>
    </div>
    <span style="font-weight: bold;">  https://{milvus_endpoint}/vector/collections/describe</span>
</div>

## Example


Describe the details of a collection named `medium_articles`:

```shell
curl --request GET \
     --url '${MILVUS_ENDPOINT}/v1/vector/collections/describe' \
     --header 'Authorization: Bearer <API-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
        "collectionName": "medium_articles"
      }'
```

Success response:

```shell
{
    "code": 200,
    "data": {
        "collectionName": "string",
        "description": "string",
        "fields": [
            {
                "autoId": true,
                "description": "string",
                "name": "string",
                "primaryKey": true,
                "type": "string"
            }
        ],
        "indexes": [
            {
                "fieldName": "string",
                "indexName": "string",
                "metricType": "string"
            }
        ],
        "load": "string",
        "shardsNum": 0,
        "enableDynamic": true
    }
}
```



## Request

### Parameters

- Query parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `collectionName`  | **string**(required)<br>The name of the collection to describe.|

- No path parameters required

### Request Body

No request body required

## Response

Returns the specified collection in detail.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": 200,
    "data": {
        "collectionName": "string",
        "description": "string",
        "enableDynamic": "boolean",
        "fields": [
            {
                "autoId": "boolean",
                "description": "string",
                "name": "string",
                "primaryKey": "boolean",
                "type": "string"
            }
        ],
        "indexes": [
            {
                "fieldName": "string",
                "indexName": "string",
                "metricType": "string"
            }
        ],
        "load": "string",
        "shardsNum": "integer"
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
| `data.collectionName`   | **string**<br>The name of the collection. |
| `data.description`   | **string**<br>An optional description of the collection. |
| `data.fields`   | **array**<br>An field array |
| `data.fields[].autoId`   | **boolean**<br>Whether the primary key automatically increments. |
| `data.fields[].description`   | **string**<br>An optional description of the field. |
| `data.fields[].name`   | **string**<br>The name of the field. |
| `data.fields[].primaryKey`   | **boolean**<br>Whether the field is a primary field. |
| `data.fields[].type`   | **string**<br>The data type of the values in this field. |
| `data.indexes`   | **array**<br>An index array |
| `data.indexes[].fieldName`   | **string**<br>The name of the indexed field. |
| `data.indexes[].indexName`   | **string**<br>The name of the generated index files. |
| `data.indexes[].metricType`   | **string**<br>The metric type used in the index process. |
| `data.load`   | **string**<br>The load status of the collection. Possible values are **unload**, **loading**, and **loaded**. |
| `data.shardsNum`   | **integer**<br>The number of shards in the collection. |
| `data.enableDynamic`   | **boolean**<br>Whether the dynamic JSON feature is enabled for this collection. |
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
| 90011 | Invalid CollectionName. Reason: xxx |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
