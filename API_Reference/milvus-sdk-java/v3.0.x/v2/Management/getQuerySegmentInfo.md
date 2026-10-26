# getQuerySegmentInfo()

This operation gets information about persistent segments of a collection from the query nodes, including the number of entities.

```java
public GetQuerySegmentInfoResp getQuerySegmentInfo(GetQuerySegmentInfoReq request)
```

## Request Parameters

```java
getQuerySegmentInfo(GetQuerySegmentInfoReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of the target collection.

**RETURN TYPE:**

*GetQuerySegmentInfoResp*

**RETURNS:**

A **GetQuerySegmentInfoResp** object that contains detailed information about the persisted segments in the specified collection, including the number of entities in each of these segments. The object has the following parameters:

- `getSegmentInfos()` (*List<QuerySegmentInfo>*) -

    A list of segments, each represented by a **QuerySegmentInfo** object, which exposes the following getters

    - `getCollectionName()` (*String*) -

        The name of the collection to which the current segment belongs.

    - `getSegmentID()` (*Long*) -

        The ID of the current segment.

    - `getCollectionID()` (*Long*) -

        The ID of the collection to which the current segment belongs.

    - `getPartitionID()` (*Long*) -

        The ID of the partition to which the current segment belongs.

    - `getMemSize()` (*Long*) -

        The size that the current segment takes up in memory.

    - `getNumOfRows()` (*Long*) -

        The number of entities in the current segment.

    - `getIndexName()` (*String*) -

        The name of the index that is related to the current segment.

    - `getIndexID()` (*Long*) -

        The ID of the index that is related to the current segment.

    - `getState()` (*String*) -

        The state of the current segment. Possible values are: "Growing", "Sealed", "Flushed", "Flushing", "Dropped", "Importing".

    - `getLevel()` (*String*) -

        The compaction level of the current segment. Possible values are : "Legacy", "L0", "L1", "L2".

    - `getNodeIDs()` (*List<Long>*) -

        A list of query node IDs.

    - `getStorageVersion()` (*Long*) -

        The storage version of the current segment.

    - `getIsSorted()` (*Boolean*) -

        Whether the entities in the current segment are sorted.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.index.request.CreateIndexReq;
import io.milvus.v2.service.utility.request.GetQuerySegmentInfoReq;
import io.milvus.v2.service.utility.response.GetQuerySegmentInfoResp;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field and a "vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .build());

// 3. Create an index and load the collection
IndexParam indexParam = IndexParam.builder()
        .metricType(IndexParam.MetricType.COSINE)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .fieldName("vector")
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName("test")
        .indexParams(Collections.singletonList(indexParam))
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("test").build());

// 4. Get segment info
GetQuerySegmentInfoResp segInfoResp = client.getQuerySegmentInfo(GetQuerySegmentInfoReq.builder()
        .collectionName("test")
        .build());
```

