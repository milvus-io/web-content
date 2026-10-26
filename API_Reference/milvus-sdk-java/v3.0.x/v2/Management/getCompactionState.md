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

    **[REQUIRED]**

    The ID of a compact operation, which is returned by a `compact()` call.

**RETURN TYPE:**

*GetCompactionStateResp*

**RETURNS:**

A **GetCompactionStateResp** instance, which comprises the following parameters:

- `getState()` (*[CompactionState](CompactionState.md)*) -

    The current state of the specified compact operation. See [CompactionState](CompactionState.md) for the possible values.

- `getExecutingPlanNo()` (*Long*) -

    The ID of the corresponding execution plan.

- `getTimeoutPlanNo()` (*Long*) -

    The ID of the timeout plan.

- `getCompletedPlanNo()` (*Long*) -

    The ID of the completed plan.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
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

// 2. Create a collection with an "id" field and a "vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .build());


// 3. Compact a collection and get the compaction ID
CompactResp compactResp = client.compact(CompactReq.builder()
    .collectionName("test")
    .build());

// 4. Get the compaction status
client.getCompactionState(GetCompactionStateReq.builder()
    .compactionID(compactResp.getCompactionID())
    .build());
```
