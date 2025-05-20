# getPartitionStats()

This operation lists the statistics collected on a specific partition.

```java
public GetPartitionStatsResp getPartitionStats(GetPartitionStatsReq request)
```

## Request Syntax

```java
getPartitionStats(GetPartitionStatsReq.builder()
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

- `partitionName(String partitionName)`

    The name of a partition in the specified collection.

**RETURN TYPE:**

*GetPartitionStatsResp*

**RETURNS:**

A **GetPartitionStatsResp** object containing collected statistics on the specified collection.

**PARAMETERS:**

- **numOfEntities** (*long*)

    The count of entities in the partition.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.partition.request.GetPartitionStatsReq;
import io.milvus.v2.service.partition.response.GetPartitionStatsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get partition stats
GetPartitionStatsReq getPartitionStatsReq = GetPartitionStatsReq.builder()
        .collectionName("test")
        .partitionName("default")
        .build();
GetPartitionStatsResp getPartitionStatsResp = client.getPartitionStats(getPartitionStatsReq);
```

