# describeCollection()

This operation lists detailed information about a specific collection.

```java
public DescribeCollectionResp describeCollection(DescribeCollectionReq request)
```

## Request Syntax

```java
describeCollection(DescribeCollectionReq.builder()
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

    Setting this to a non-existing collection results in **MilvusException**.

**RETURN TYPE:**

*DescribeCollectionResp*

**RETURNS:**

A **DescribeCollectionResp** object that contains detailed information about the specified collection.

**PARAMETERS:**

- **collection_name** (*String*)

    The name of the current collection.

- **description** (*String*)

    The description of the current collection.

- **numOfPartitions** (*long*)

    The number of partitions in the current collection.

- **fieldNames** (*List\<String\>*)

    A list of fields in the current collection.

- **vectorFieldName** (*List\<String\>*)

    The name of the vector field.

- **primaryFieldName** (*String*)

    The name of the primary field.

- **enableDynamicField** (*Boolean*)

    Whether to use the reserved JSON field **$meta** to save non-schema-defined fields and their values as key-value pairs.

- **autoID** (*Boolean*)

    Whether Milvus automatically generates the primary key for the collection.

- **collectionSchema** (CreateCollectionReq.CollectionSchema)

    The scheme of the collection.

- **createTime** (*long*)

    The time when the collection was created.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// get the collection detail
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
        .collectionName("test")
        .build();
DescribeCollectionResp describeCollectionResp = client.describeCollection(describeCollectionReq);
/*DescribeCollectionResp(collectionName=test, description=test, numOfPartitions=1, fieldNames=[id, vector], vectorFieldName=[vector], primaryFieldName=id, enableDynamicField=false, autoID=false, collectionSchema=CreateCollectionReq.CollectionSchema(fieldSchemaList=[CreateCollectionReq.FieldSchema(name=id, description=, dataType=Int64, maxLength=65535, dimension=null, isPrimaryKey=true, isPartitionKey=false, autoID=false, elementType=null, maxCapacity=null), CreateCollectionReq.FieldSchema(name=vector, description=, dataType=FloatVector, maxLength=65535, dimension=2, isPrimaryKey=false, isPartitionKey=false, autoID=false, elementType=null, maxCapacity=null)]), createTime=0)*/

```
