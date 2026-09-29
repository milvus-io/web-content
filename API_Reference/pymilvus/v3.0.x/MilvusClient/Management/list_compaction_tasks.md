# list_compaction_tasks()

This operation lists all compaction tasks that are still retained for a collection.

<div class="alert note">

Terminal tasks are subject to server-side garbage collection and are not an audit log.

</div>

## Request syntax

```python
client.list_compaction_tasks(
    collection_name: str,
    timeout: Optional[float] = None
) -> CompactionPlans
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*CompactionPlans*

**RETURNS:**

A `CompactionPlans` object with the following members:

- **compaction_id** (*int*) -

    The ID of the compaction job.

- **collection_name** (*str*) -

    The name of the collection that the compaction tasks run on.

- **state** (*State*) -

    The overall state of the compaction job. Possible values are **UndefiedState**, **Executing**, and **Completed**.

- **plans** (*List[Plan]*) -

    The merge plans of the compaction tasks. Each `Plan` object has the following members:

    - **plan_id** (*int*) -

        The ID of this compaction plan.

    - **task_id** (*int*) -

        An alias of **plan_id**.

    - **trigger_id** (*int*) -

        The ID of the compaction trigger.

    - **collection_id** (*int*) -

        The ID of the collection being compacted.

    - **partition_id** (*int*) -

        The ID of the partition being compacted.

    - **channel** (*str*) -

        The insert channel that the segments belong to.

    - **compaction_type** (*CompactionType*) -

        The type of this compaction.

    - **state** (*CompactionTaskState*) -

        The state of this compaction plan.

    - **failure_reason** (*str*) -

        The reason why this plan failed, or an empty string.

    - **sources** (*list*) -

        The IDs of the source segments to merge.

    - **target** (*int*) -

        The ID of the target segment.

    - **targets** (*List[int]*) -

        The IDs of the target segments. Falls back to **target** when the server does not return multiple targets.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

plans = client.list_compaction_tasks(collection_name="my_collection")
print(plans)
```

## Related methods

- [compact()](compact.md)

- [get_compaction_plans()](get_compaction_plans.md)

- [get_compaction_state()](get_compaction_state.md)
