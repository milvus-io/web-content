# batchDescribeCollection()

This operation gets the descriptions of multiple collections in a batch.

```java
public List<DescribeCollectionResp> batchDescribeCollection(BatchDescribeCollectionReq request)
```

## Request Syntax

```java
batchDescribeCollection(BatchDescribeCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionNames(List<String> collectionNames)
    .collectionIds(List<Long> collectionIds)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionNames(List<String> collectionNames)` -

    A list of collection names to describe in batch.

- `collectionIds(List<Long> collectionIds)` -

    A list of collection IDs to describe in batch.

**RETURN TYPE:**

*List\<DescribeCollectionResp\>*

**RETURNS:**

A list of **DescribeCollectionResp** objects, one per requested collection. Each object exposes:

- `getCollectionName()` (*String*) -

    The name of the collection.

- `getCollectionID()` (*Long*) -

    The internal ID of the collection.

- `getDatabaseName()` (*String*) -

    The name of the database the collection belongs to.

- `getDescription()` (*String*) -

    The description of the collection.

- `getNumOfPartitions()` (*Long*) -

    The number of partitions in the collection.

- `getFieldNames()` (*List\<String\>*) -

    The names of all fields in the collection.

- `getVectorFieldNames()` (*List\<String\>*) -

    The names of all vector fields in the collection.

- `getPrimaryFieldName()` (*String*) -

    The name of the primary key field.

- `getEnableDynamicField()` (*Boolean*) -

    Whether the dynamic field is enabled.

- `getAutoID()` (*Boolean*) -

    Whether primary key values are auto-generated.

- `getCollectionSchema()` (*CollectionSchema*) -

    The schema of the collection. See [CollectionSchema](CollectionSchema/CollectionSchema.md).

- `getCreateTime()` (*Long*) -

    The creation time of the collection.

- `getCreateUtcTime()` (*Long*) -

    The UTC creation time of the collection.

- `getConsistencyLevel()` (*ConsistencyLevel*) -

    The consistency level of the collection. See [ConsistencyLevel](ConsistencyLevel.md).

- `getShardsNum()` (*Integer*) -

    The number of shards in the collection.

- `getProperties()` (*Map\<String, String\>*) -

    The properties of the collection.

- `getAliases()` (*List\<String\>*) -

    The aliases of the collection.

- `getUpdateTimestamp()` (*Long*) -

    The last update timestamp of the collection.

- `getEnableNamespace()` (*Boolean*) -

    Whether namespace is enabled.

- `getSchemaVersion()` (*Integer*) -

    The schema version of the collection.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

Returns metadata for multiple collections selected by name or ID.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.BatchDescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create two collections
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
for (String name : Arrays.asList("books", "articles")) {
    client.createCollection(CreateCollectionReq.builder()
            .collectionName(name)
            .collectionSchema(collectionSchema)
            .indexParams(Collections.singletonList(indexParam))
            .build());
}

// 3. Batch describe the collections
List<DescribeCollectionResp> collections = client.batchDescribeCollection(
    BatchDescribeCollectionReq.builder()
        .databaseName("default")
        .collectionNames(Arrays.asList("books", "articles"))
        .build());
```
