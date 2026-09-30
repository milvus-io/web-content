# get_compaction_plans()

This operation returns the compaction plans for a specific compaction job, including the merge plans showing which segments will be combined.

## Request syntax

```python
client.get_compaction_plans(
    job_id: int,
    timeout: float = None
) -> CompactionPlans
```

**PARAMETERS:**

- **job_id** (*int*) -

    **[REQUIRED]**

    The ID of the compaction job returned by `compact()`.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*CompactionPlans*

**RETURNS:**

A `CompactionPlans` object with the following members:

- **compaction_id** (*int*) -

    The ID of the compaction job.

- **collection_name** (*str*) -

    The name of the collection that the compaction job runs on. Available in PyMilvus v3.0.2 or later. When retrieved through `get_compaction_plans()`, this member is empty; use `list_compaction_tasks()` to obtain it.

- **state** (*State*) -

    The overall state of the compaction job. Possible values are **UndefiedState**, **Executing**, and **Completed**.

- **plans** (*List[Plan]*) -

    The merge plans of the compaction job. Each `Plan` object has the following members:

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

job_id = client.compact(collection_name="my_collection")
plans = client.get_compaction_plans(job_id=job_id)
print(plans)
```
