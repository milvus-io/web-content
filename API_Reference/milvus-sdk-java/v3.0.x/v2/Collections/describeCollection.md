# describeCollection()

This operation lists detailed information about a specific collection.

```java
public DescribeCollectionResp describeCollection(DescribeCollectionReq request)
```

## Request Syntax

```java
describeCollection(DescribeCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .collectionId(Long collectionId)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `collectionId(Long collectionId)` -

    The numeric ID of the collection. Use this when you need to identify a collection by ID instead of name.

**RETURNS:**

*DescribeCollectionResp*

A **DescribeCollectionResp** object that contains detailed information about the specified collection. The object has the following fields:

- **collectionName** (*String*) -

    The name of the collection.

- **collectionID** (*Long*) -

    The internal ID of the collection.

- **databaseName** (*String*) -

    The name of the database the collection belongs to.

- **description** (*String*) -

    The description of the collection.

- **numOfPartitions** (*Long*) -

    The number of partitions in the collection.

- **fieldNames** (*List\<String\>*) -

    The names of all fields in the collection.

- **vectorFieldNames** (*List\<String\>*) -

    The names of all vector fields in the collection.

- **primaryFieldName** (*String*) -

    The name of the primary key field.

- **enableDynamicField** (*Boolean*) -

    Whether the dynamic field is enabled.

- **autoID** (*Boolean*) -

    Whether primary key values are auto-generated.

- **collectionSchema** (*CollectionSchema*) -

    The schema of the collection.

    - **fieldSchemaList** (*List\<FieldSchema\>*) -

        The field definitions of the collection. Each **FieldSchema** has the following fields:

        - **name** (*String*) -

            The name of the field.

        - **description** (*String*) -

            The description of the field.

        - **dataType** (*DataType*) -

            The data type of the field.

        - **maxLength** (*Integer*) -

            The maximum length for VarChar fields.

        - **dimension** (*Integer*) -

            The dimension of vector fields.

        - **isPrimaryKey** (*Boolean*) -

            Whether the field is the primary key.

        - **isPartitionKey** (*Boolean*) -

            Whether the field is the partition key.

        - **isClusteringKey** (*Boolean*) -

            Whether the field is the clustering key.

        - **autoID** (*Boolean*) -

            Whether primary key values are auto-generated.

        - **elementType** (*DataType*) -

            The element type of array fields.

        - **maxCapacity** (*Integer*) -

            The maximum capacity of array fields.

        - **isNullable** (*Boolean*) -

            Whether the field accepts null values.

        - **defaultValue** (*Object*) -

            The default value of the field.

        - **enableAnalyzer** (*Boolean*) -

            Whether text analysis is enabled.

        - **analyzerParams** (*Map\<String, Object\>*) -

            The analyzer configuration.

        - **enableMatch** (*Boolean*) -

            Whether keyword matching is enabled.

        - **typeParams** (*Map\<String, String\>*) -

            Additional type parameters.

        - **multiAnalyzerParams** (*Map\<String, Object\>*) -

            The multi-language analyzer configuration.

        - **externalField** (*String*) -

            The external source field this field maps to.

        - **fieldId** (*Long*) -

            The internal ID of the field.

        - **isDynamic** (*Boolean*) -

            Whether the field is the dynamic field.

        - **isFunctionOutput** (*Boolean*) -

            Whether the field is a function output field.

        - **indexes** (*List\<Map\<String, Object\>\>*) -

            The indexes defined on the field.

    - **structFields** (*List\<StructFieldSchema\>*) -

        The struct field definitions of the collection.

    - **enableDynamicField** (*boolean*) -

        Whether the dynamic field is enabled.

    - **functionList** (*List\<Function\>*) -

        The functions defined on the collection.

    - **externalSource** (*String*) -

        The external source backing the collection.

    - **externalSpec** (*JsonObject*) -

        The external source specification.

- **createTime** (*Long*) -

    The creation time of the collection.

- **createUtcTime** (*Long*) -

    The UTC creation time of the collection.

- **consistencyLevel** (*ConsistencyLevel*) -

    The consistency level of the collection.

- **shardsNum** (*Integer*) -

    The number of shards in the collection.

- **properties** (*Map\<String, String\>*) -

    The properties of the collection.

- **aliases** (*List\<String\>*) -

    The aliases of the collection.

- **updateTimestamp** (*Long*) -

    The last update timestamp of the collection.

- **enableNamespace** (*Boolean*) -

    Whether namespace is enabled.

- **schemaVersion** (*Integer*) -

    The schema version of the collection.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;
import java.util.Set;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get the collection detail
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
        .collectionName("test")
        .build();
DescribeCollectionResp describeCollectionResp = client.describeCollection(describeCollectionReq);

```
