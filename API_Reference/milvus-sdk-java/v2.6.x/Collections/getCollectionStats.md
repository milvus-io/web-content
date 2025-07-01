# getCollectionStats()

This operation lists the statistics collected on a specific collection.

```java
public GetCollectionStatsResp getCollectionStats(GetCollectionStatsReq request)
```

## Request Syntax

```java
getCollectionStats(GetCollectionStatsReq.builder()
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

**RETURN TYPE:**

*GetCollectionStatsResp*

**RETURNS:**

A **GetCollectionStatsResp** object containing collected statistics on the specified collection.

**PARAMETERS:**

- **numOfEntities** (*long*)

    The count of entities in the collection.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetCollectionStatsReq;
import io.milvus.v2.service.collection.response.GetCollectionStatsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get collection stats
GetCollectionStatsReq getCollectionStatsReq = GetCollectionStatsReq.builder()
        .collectionName("test")
        .build();
GetCollectionStatsResp getCollectionStatsResp = client.getCollectionStats(getCollectionStatsReq);
```

