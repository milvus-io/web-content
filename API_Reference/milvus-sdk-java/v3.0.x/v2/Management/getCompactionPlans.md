# getCompactionPlans()

This operation returns the compaction plans for a specific compaction job, including the merge plans showing which segments will be combined.

```java
public GetCompactionPlansResp getCompactionPlans(GetCompactionPlansReq request)
```

## Request Syntax

```java
getCompactionPlans(GetCompactionPlansReq.builder()
    .compactionID(Long compactionID)
    .build()
);
```

**BUILDER METHODS:**

- `compactionID(Long compactionID)` -

    **[REQUIRED]**

    The ID of the compaction job returned by `compact()`.

**RETURN TYPE:**

*GetCompactionPlansResp*

**RETURNS:**

A **GetCompactionPlansResp** object that contains the compaction state and merge plans.

- `getCompactionId()` (*Long*) -

    The ID of the compaction.

- `getCollectionName()` (*String*) -

    The name of the collection the compaction plans belong to.

- `getState()` (*[CompactionState](CompactionState.md)*) -

    The overall state of the compaction job. See [CompactionState](CompactionState.md).

- `getPlans()` (*List\<CompactionPlan\>*) -

    The merge plans of the compaction. Each **CompactionPlan** has the following getters:

    - `getPlanId()` (*Long*) -

        The ID of this compaction plan.

    - `getTriggerId()` (*Long*) -

        The ID of the compaction trigger.

    - `getCollectionId()` (*Long*) -

        The ID of the collection being compacted.

    - `getPartitionId()` (*Long*) -

        The ID of the partition being compacted.

    - `getChannel()` (*String*) -

        The insert channel that the segments belong to.

    - `getCompactionType()` (*[CompactionType](CompactionType.md)*) -

        The type of this compaction. See [CompactionType](CompactionType.md).

    - `getState()` (*[CompactionTaskState](CompactionTaskState.md)*) -

        The state of this compaction plan. See [CompactionTaskState](CompactionTaskState.md).

    - `getFailureReason()` (*String*) -

        The reason why this plan failed, or an empty string.

    - `getTarget()` (*Long*) -

        The ID of the target segment.

    - `getTargets()` (*List\<Long\>*) -

        The IDs of the target segments. Falls back to `getTarget()` when the server does not return multiple targets.

    - `getSources()` (*List\<Long\>*) -

        The IDs of the source segments.

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
import io.milvus.v2.service.utility.request.CompactReq;
import io.milvus.v2.service.utility.request.GetCompactionPlansReq;
import io.milvus.v2.service.utility.response.CompactResp;
import io.milvus.v2.service.utility.response.GetCompactionPlansResp;

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

// 4. Get the compaction plans
GetCompactionPlansResp plans = client.getCompactionPlans(
    GetCompactionPlansReq.builder()
        .compactionID(compactResp.getCompactionID())
        .build()
);
System.out.println(plans);
```
