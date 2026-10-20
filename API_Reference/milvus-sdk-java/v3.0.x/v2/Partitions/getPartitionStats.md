# getPartitionStats()

Returns the complete partition statistics map in addition to the entity count.

```java
public GetPartitionStatsResp getPartitionStats(GetPartitionStatsReq request)
```

## Request Syntax

```java
GetPartitionStatsReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

**RETURN TYPE:**

*GetPartitionStatsResp*

**RETURNS:**

A **GetPartitionStatsResp** object that contains `numOfEntities` and the complete stats map returned by Milvus.

- `getNumOfEntities()` (*Long*) -

    The number of entities in the partition.

- `getStats()` (*Map\<String, String\>*) -

    The complete stats map returned by Milvus.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;
import io.milvus.v2.service.partition.request.CreatePartitionReq;
import io.milvus.v2.service.partition.request.GetPartitionStatsReq;
import io.milvus.v2.service.partition.response.GetPartitionStatsResp;

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
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());


// 3. Create a partition
client.createPartition(CreatePartitionReq.builder()
        .collectionName("test")
        .partitionName("test_partition")
        .build());

// 4. Get partition stats
GetPartitionStatsReq getPartitionStatsReq = GetPartitionStatsReq.builder()
        .collectionName("test")
        .partitionName("test_partition")
        .build();
GetPartitionStatsResp getPartitionStatsResp = client.getPartitionStats(getPartitionStatsReq);
```

