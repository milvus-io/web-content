# CompactionPlan

A compaction plan describing which segments are compacted into a target segment, as returned by the `getCompactionPlans()` API. Each plan carries the per-task metadata of one compaction task.

```java
class io.milvus.v2.common.CompactionPlan
```

**METHODS:**

- `getPlanId()` (*Long*) -

    The ID of the compaction plan.

- `getTriggerId()` (*Long*) -

    The ID of the compaction that triggered this plan.

- `getCollectionId()` (*Long*) -

    The ID of the collection being compacted.

- `getPartitionId()` (*Long*) -

    The ID of the partition being compacted.

- `getChannel()` (*String*) -

    The channel on which the compaction was scheduled.

- `getCompactionType()` (*CompactionType*) -

    The type of the compaction task.

- `getState()` (*CompactionTaskState*) -

    The state of the compaction task.

- `getFailureReason()` (*String*) -

    The failure reason of the compaction task, empty when it did not fail.

- `getTarget()` (*Long*) -

    The ID of the target segment produced by the compaction.

- `getTargets()` (*List\<Long\>*) -

    The complete set of target segments produced by the compaction, which may be larger than the single legacy `getTarget()`.

- `getSources()` (*List\<Long\>*) -

    The IDs of the source segments that are compacted.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.CompactionPlan;
import io.milvus.v2.service.utility.request.GetCompactionPlansReq;
import io.milvus.v2.service.utility.response.GetCompactionPlansResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetCompactionPlansResp resp = client.getCompactionPlans(GetCompactionPlansReq.builder()
        .compactionID(compactionID)
        .build());
for (CompactionPlan plan : resp.getPlans()) {
    System.out.println("Plan " + plan.getPlanId() + " state: " + plan.getState());
}
```
