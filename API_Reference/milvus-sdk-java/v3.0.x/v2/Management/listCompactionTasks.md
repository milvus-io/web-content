# listCompactionTasks()

Lists all compaction tasks still retained for a collection, whether automatically or manually triggered. Terminal tasks are subject to server-side garbage collection and are not an audit log.

```java
public GetCompactionPlansResp listCompactionTasks(ListCompactionTasksReq request)
```

## Request Syntax

```java
listCompactionTasks(ListCompactionTasksReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection whose retained compaction tasks are to be listed.

**RETURN TYPE:**

*GetCompactionPlansResp*

**RETURNS:**

A **GetCompactionPlansResp** object that contains the compaction state and the retained compaction plans of the collection.

- `getCompactionId()` (*Long*) -

    The ID of the compaction.

- `getCollectionName()` (*String*) -

    The name of the collection the compaction plans belong to.

- `getState()` (*[CompactionState](CompactionState.md)*) -

    The overall state of the compaction job. See [CompactionState](CompactionState.md).

- `getPlans()` (*List\<CompactionPlan\>*) -

    The merge plans of the compaction tasks. Each **CompactionPlan** has the following getters:

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
import io.milvus.v2.common.CompactionPlan;
import io.milvus.v2.service.utility.request.ListCompactionTasksReq;
import io.milvus.v2.service.utility.response.GetCompactionPlansResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List the retained compaction tasks of the collection
GetCompactionPlansResp resp = client.listCompactionTasks(ListCompactionTasksReq.builder()
        .collectionName("test")
        .build());

for (CompactionPlan plan : resp.getPlans()) {
    System.out.println(plan);
}
```
