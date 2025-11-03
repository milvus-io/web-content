# compact()

This operation compacts the collection by merging small segments into larger ones. It is recommended to call this operation after inserting a large amount of data into a collection.

```java
public CompactResp compact(CompactReq request)
```

## Request Syntax

```java
compact(CompactReq.builder()
    .collectionName(String collection)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collection)`

    The name of the target collection.

**RETURN TYPE:**

*CompactResp*

**RETURNS:**

A **CompactResp** object contains a compaction ID.

- **compactionID** (*Long*)

    The ID of the current compact operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.CompactReq;
import io.milvus.v2.service.utility.response.CompactResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Compact a collection
client.compact(CompactReq.builder()
    .collectionName("my_collection")
    .build();
);
```

