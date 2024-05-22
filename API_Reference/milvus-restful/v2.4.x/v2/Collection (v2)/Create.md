# Create Collection

<div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em; line-height: 1.5em;">
        <span>POST</span>
    </div>
    <div style="display: inline-block; font-size: 0.85em; font-weight: 700; margin-left: 10px;">
        <span>http://${MILVUS_URI}/v2/vectordb/collections/create</span>
    </div>
</div>

This operation creates a collection in a specified cluster.

## Example

You can choose between a quick setup or a custom setup as follows:

### Quick setup

The quick setup collection has two fields: the primary and vector fields. It also allows the insertion of undefined fields and their values in key-value pairs in a dynamic field.

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "test_collection",
    "dimension": 5
}'
```
    
In the above setup,

- The primary and vector fields use their default names (__id__ and __vector__).
- The metric type is also set to its default value (__COSINE__).
- The primary field accepts integers and does not automatically increments.
- The reserved JSON field named __$meta__ is used to store non-schema-defined fields and their values.

You can modify the names of the primary and vector fields and change the metric type. Additionally, the primary field can be set to increment automatically.
    
```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_quick_setup",
    "dimension": 5,
    "primaryFieldName": "my_id",
    "idType": "VarChar",
    "vectorFieldName": "my_vector",
    "metric_type": "L2",
    "autoId": true,
    "params": {
        "max_length": "512"
    }
}'
```

In the above code, the collection will be created and automatically loaded into memory.
    
### Custom Setup with index parameters

For a customized setup, you need to include the schema object in the request. You are advised to include the index parameters also, so that the collection will be indexed upon creation.

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_setup_indexed",
    "schema": {
        "autoId": false,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "my_id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            }
        ]
        
    },
    "indexParams": [
        {
            "fieldName": "my_vector",
            "metricType": "COSINE",
            "indexName": "my_vector",
            "indexConfig": {
                "index_type": "IVF_FLAT",
                "nlist": "1024"
            }
        },
        {
            "fieldName": "my_id",
            "indexName": "my_id",
            "indexConfig": {
                "index_type": "STL_SORT"
            }            
        }
    ]
}'
```

Of course, you can leave the index parameters unspecified in the request and create an index for the collection later.

```shell
export MILVUS_URI="localhost:19530"

curl --location --request POST "http://${MILVUS_URI}/v2/vectordb/collections/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_setup_indexed",
    "schema": {
        "autoId": false,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "my_id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            }
        ]
        
    }
}'
```
Possible responses for the above requests are similar to the following:

```json
{
    "code": 200,
    "data": {}
}
```




## Request

### Parameters

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `Request-Timeout`  | **integer**(required)<br/>The timeout duration for this operation. Setting this to None indicates that this operation times out when any response returns or an error occurs.|
    | `Authorization`  | **string**<br/>The authentication token.|

- No query parameters required

- No path parameters required

### Request Body

```json
{
    "dbName": "string",
    "collectionName": "string",
    "dimension": "integer",
    "metricType": "string",
    "idType": "string",
    "autoID": "string",
    "primaryFieldName": "string",
    "vectorFieldName": "string",
    "schema": {
        "autoID": "string",
        "enableDynamicField": "string",
        "fields": [
            {
                "fieldName": "string",
                "dataType": "string",
                "elementDataType": "string",
                "isPrimary": "boolean",
                "isPartitionKey": "boolean",
                "elementTypeParams": {
                    "max_length": "integer",
                    "dim": "integer",
                    "max_capacity": "integer"
                }
            }
        ]
    },
    "indexParams": [
        {
            "metricType": "string",
            "fieldName": "string",
            "indexName": "string",
            "indexConfig": {
                "index_type": "string",
                "M": "integer",
                "efConstruction": "integer",
                "nlist": "integer"
            }
        }
    ],
    "params": {
        "max_length": "integer",
        "enableDynamicField": "boolean",
        "shardsNum": "integer",
        "consistencyLevel": "integer",
        "partitionsNum": "integer",
        "ttlSeconds": "integer"
    }
}'
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | __string__<br/>The name of the database. <zilliz>This parameter applies only to dedicated clusters.</zilliz>  |
| `collectionName` <span style="color:red">*</span> | __string__<br/>The name of the collection to create.  |
| `dimension`  | __integer__<br/>The number of dimensions a vector value should have.<br/>This is required if **dtype** of this field is set to **DataType.FLOAT_VECTOR**.  |
| `metricType`  | __string__<br/>The metric type applied to this operation. <br/>Possible values are **L2**, **IP**, and **COSINE**.<br/>The value defaults to COSINE  |
| `idType`  | __string__<br/>The data type of the primary field. This parameter is designed for the quick-setup of a collection and will be ignored if __schema__ is defined.  |
| `autoID`  | __string__<br/>Whether the primary field automatically increments. This parameter is designed for the quick-setup of a collection and will be ignored if __schema__ is defined.<br/>The value defaults to false  |
| `primaryFieldName`  | __string__<br/>The name of the primary field. This parameter is designed for the quick-setup of a collection and will be ignored if __schema__ is defined.  |
| `vectorFieldName`  | __string__<br/>The name of the vector field. This parameter is designed for the quick-setup of a collection and will be ignored if __schema__ is defined.  |
| `schema` | __object__<br/>The schema is responsible for organizing data in the target collection. A valid schema should have multiple fields, which must include a primary key, a vector field, and several scalar fields. |
| `schema.autoID`  | __string__<br/>Whether allows the primary field to automatically increment. Setting this to True makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. Set this parameter in the field with is_primary set to True.  |
| `schema.enableDynamicField`  | __string__<br/>Whether allows to use the reserved __$meta__ field to hold non-schema-defined fields in key-value pairs.  |
| `schema[].fields` | __array__<br/>A list of field objects. |
| `schema[].fields[]` | __object__<br/>A field object |
| `schema[].fields[].fieldName`  | __string__<br/>The name of the field to create in the target collection  |
| `schema[].fields[].dataType`  | __string__<br/>The data type of the field values.  |
| `schema[].fields[].elementDataType`  | __string__<br/>The data type of the elements in an array field.  |
| `schema[].fields[].isPrimary`  | __boolean__<br/>Whether the current field is the primary field. Setting this to True makes the current field the primary field.  |
| `schema[].fields[].isPartitionKey`  | __boolean__<br/>Whether the current field serves as the partition key. Setting this to True makes the current field serve as the partition key. In this case, MilvusZilliz Cloud manages all partitions in the current collection.  |
| `schema[].fields[].elementTypeParams` | __object__<br/>Extra field parameters. |
| `schema[].fields[].elementTypeParams.max_length`  | __integer__<br/>An optional parameter for VarChar values that determines the maximum length of the value in the current field.  |
| `schema[].fields[].elementTypeParams.dim`  | __integer__<br/>An optional parameter for FloatVector or BinaryVector fields that determines the vector dimension.  |
| `schema[].fields[].elementTypeParams.max_capacity`  | __integer__<br/>An optional parameter for Array field values that determines the maximum number of elements in the current array field.  |
| `indexParams` | __array__<br/>The parameters that apply to the index-building process. |
| `indexParams[]` | __object__<br/> |
| `indexParams[].metricType`  | __string__<br/>The similarity metric type used to build the index.<br/>The value defaults to COSINE  |
| `indexParams[].fieldName`  | __string__<br/>The name of the target field on which an index is to be created.  |
| `indexParams[].indexName`  | __string__<br/>The name of the index to create, the value defaults to the target field name.  |
| `indexParams[].indexConfig` | __object__<br/>The index type and related settings. For details, refer to [Vector Indexes](https://milvus.io/docs/index.md). |
| `indexParams[].indexConfig.index_type`  | __string__<br/>The type of the index to create  |
| `indexParams[].indexConfig.M`  | __integer__<br/>The maximum degree of the node and applies only when index_type is set to __HNSW__.  |
| `indexParams[].indexConfig.efConstruction`  | __integer__<br/>The search scope. This applies only when **index_type** is set to **HNSW**  |
| `indexParams[].indexConfig.nlist`  | __integer__<br/>The number of cluster units. This applies to IVF-related index types.  |
| `params` | __object__<br/>Extra parameters for the collection. |
| `params.max_length`  | __integer__<br/>The maximum number of characters in a VarChar field. This parameter is mandatory when the current field type is VarChar.  |
| `params.enableDynamicField`  | __boolean__<br/>Whether to enable the reserved dynamic field. If set to true, non-schema-defined fields are saved in the reserved dynamic field as key-value pairs.  |
| `params.shardsNum`  | __integer__<br/>The number of shards to create along with the current collection.  |
| `params.consistencyLevel`  | __integer__<br/>The consistency level of the collection. Possible values are __STRONG__, __BOUNDED__, __SESSION__, and __EVENTUALLY__.  |
| `params.partitionsNum`  | __integer__<br/>The number of partitions to create along with the current collection. This parameter is mandatory if one field of the collection has been designated as the partition key.  |
| `params.ttlSeconds`  | __integer__<br/>The time-to-live (TTL) period of the collection. If set, the collection is to be dropped once the period ends.  |

## Response

Returns A collection object.

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
| `code`   | __integer__<br/>Indicates whether the request succeeds.<br/><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| `data` | __object__<br/> |
| `message`  | __string__<br/>Indicates the possible reason for the reported error. |
