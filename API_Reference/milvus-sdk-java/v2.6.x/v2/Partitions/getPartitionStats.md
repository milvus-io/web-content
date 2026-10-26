# getPartitionStats()

This operation lists the statistics collected on a specific partition.

```java
public GetPartitionStatsResp getPartitionStats(GetPartitionStatsReq request)
```

## Request Syntax

```java
getPartitionStats(GetPartitionStatsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of a collection.

- `partitionName(String partitionName)`

    The name of a partition in the specified collection.

**RETURN TYPE:**

*GetPartitionStatsResp*

**RETURNS:**

A **GetPartitionStatsResp** object containing collected statistics on the specified partition.

- `getNumOfEntities()` (*Long*) -

    The count of entities in the partition.

- `getStats()` (*Map\<String, String\>*) -

    A map of additional statistics collected on the partition.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

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

