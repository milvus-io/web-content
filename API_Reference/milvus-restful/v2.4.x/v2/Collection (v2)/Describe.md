# Describe Collection

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/collections/describe</span>
    </div>
</div>

Describes the details of a collection.

## Example

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/describe" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default",
    "collectionName": "test_collection"
}'
```
Possible output would be similar to the following:

```json
{
    "code": 200,
    "data": {
        "aliases": [],
        "autoId": false,
        "collectionID": 448707763883002014,
        "collectionName": "test_collection",
        "consistencyLevel": "Bounded",
        "description": "",
        "enableDynamicField": true,
        "fields": [
            {
                "autoId": false,
                "description": "",
                "id": 100,
                "name": "id",
                "partitionKey": false,
                "primaryKey": true,
                "type": "Int64"
            },
            {
                "autoId": false,
                "description": "",
                "id": 101,
                "name": "vector",
                "params": [
                    {
                        "key": "dim",
                        "value": "5"
                    }
                ],
                "partitionKey": false,
                "primaryKey": false,
                "type": "FloatVector"
            }
        ],
        "indexes": [
            {
                "fieldName": "vector",
                "indexName": "vector",
                "metricType": "COSINE"
            }
        ],
        "load": "LoadStateLoaded",
        "partitionsNum": 1,
        "properties": [],
        "shardsNum": 1
    }
}
```

## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**<br/>The timeout duration for this operation. Setting this to None indicates that this operation times out when any response returns or an error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "collectionName": "string"
}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database.  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of the collection to describe.  |

## Response

Returns the specified collection in detail.

### Response Bodies

- Response body if we process your request successfully

```json
{
    "code": "integer",
    "data": {
        "aliases": [
            {}
        ],
        "autoID": "boolean",
        "collectionID": "integer",
        "collectionName": "string",
        "consistencyLevel": "string",
        "description": "string",
        "enableDynamicField": "boolean",
        "fields": [
            {
                "autoId": "boolean",
                "description": "string",
                "id": "integer",
                "name": "string",
                "params": [
                    {
                        "key": "string",
                        "value": "string"
                    }
                ],
                "partitionKey": "boolean",
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
        "partitionNum": "integer",
        "properties": [
            {
                "key": "string",
                "value": "string"
            }
        ],
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
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
| `data` | __object__<br/> |
| `data[].aliases` | __array__<br/>A list aliases assigned to the collection. |
| `data[].aliases[]`  | __string__<br/>An alias of the collection.  |
| `data.autoID`  | __boolean__<br/>Whether the primary key of this collection automatically increments.  |
| `data.collectionID`  | __integer<int64>__<br/>The ID assigned to the collection upon creation.  |
| `data.collectionName`  | __string__<br/>The name of the current collection.  |
| `data.consistencyLevel`  | __string__<br/>The consistency level of the current collection.  |
| `data.description`  | __string__<br/>The description of the collection.  |
| `data.enableDynamicField`  | __boolean__<br/>Whether the reserved dynamic field named $meta is enabled to save non-schema-defined fields and their values in key-value pairs.  |
| `data[].fields` | __array__<br/>The collection fields in an array |
| `data[].fields[]` | __object__<br/>A field object. |
| `data[].fields[].autoId`  | __boolean__<br/>Whether this field automatically increments its value.  |
| `data[].fields[].description`  | __string__<br/>The description of the field.  |
| `data[].fields[].id`  | __integer__<br/>The field ID.  |
| `data[].fields[].name`  | __string__<br/>The name of the current field.  |
| `data[].fields[][].params` | __array__<br/>Other field parameters. |
| `data[].fields[][].params[]` | __object__<br/>A field parameter in a key-value pair |
| `data[].fields[][].params[].key`  | __string__<br/>Field parameter name.  |
| `data[].fields[][].params[].value`  | __string__<br/>Field parameter value.  |
| `data[].fields[].partitionKey`  | __boolean__<br/>Whether this field serves as a partition key.  |
| `data[].fields[].primaryKey`  | __boolean__<br/>Whether this field serves as the primary key.  |
| `data[].fields[].type`  | __string__<br/>The data type of the field.  |
| `data[].indexes` | __array__<br/>The created indexes in an array |
| `data[].indexes[]` | __object__<br/>A index parameter object |
| `data[].indexes[].fieldName`  | __string__<br/>The target field of this index.  |
| `data[].indexes[].indexName`  | __string__<br/>The name of this index.  |
| `data[].indexes[].metricType`  | __string__<br/>The metric type of this index.  |
| `data.load`  | __string__<br/>The load status of the current collection.  |
| `data.partitionNum`  | __integer__<br/>The number of partitions in the collection.  |
| `data[].properties` | __array__<br/>Extra collection properties in an array. |
| `data[].properties[]` | __object__<br/>A collection property object in a key-value pair. |
| `data[].properties[].key`  | __string__<br/>The property name  |
| `data[].properties[].value`  | __string__<br/>The property value.  |
| `data.shardsNum`  | __integer__<br/>The number of shards created along with the collection.  |
