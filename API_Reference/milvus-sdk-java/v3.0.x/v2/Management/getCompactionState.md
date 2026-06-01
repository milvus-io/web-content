# getCompactionState()

This operation gets the state of a specific compact operation.

```java
public GetCompactionStateResp getCompactionState(GetCompactionStateReq request)
```

## Request Syntax

```java
getCompactionState(GetCompactionStateReq.builder()
    .compactionID(Long compactionID)
    .build();
)
```

**BUILDER METHODS:**

- `compactionID(Long compactionID)`

    The ID of a compact operation, which is returned by a `compact()` call.

**RETURN TYPE:**

*GetCompactionStateResp*

**RETURNS:**

A **GetCompactionStateResp** instance, which comprises the following parameters:

- **state** (*CompactState*)

    The current state of the specified compact operation. Possible values are:

    - UndefinedState(0)

    - Executing(1)

    - Completed(2)

- **executingPlanNo** (*Long*)

    The ID of the corresponding execution plan.

- **timeoutPlanNo** (*Long*)

    The ID of the timeout plan.

- **completedPlanNo** (*Long*) 

    The ID of the completed plan.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.CompactReq;
import io.milvus.v2.service.utility.request.GetCompactionStateReq;
import io.milvus.v2.service.utility.response.CompactResp;
import io.milvus.v2.service.utility.response.GetCompactionStateResp;

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

// 3. Get the compaction status
client.getCompactionState(GetCompactionStateReq.builder()
    .compactionID(3431948932481L)
    .build();
);
```
