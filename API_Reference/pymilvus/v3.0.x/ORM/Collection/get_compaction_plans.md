# get_compaction_plans()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation gets the current compaction plans.

## Request Syntax

```python
get_compaction_plans(
    timeout: Optional[float] = None,
    is_clustering: Optional[bool] = False,
    **kwargs
) -> CompactionPlans
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **is_clustering** (*bool*) -

    Whether to fetch the plans of a clustering compaction. Defaults to **False**.

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

## Examples

```python
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType

# Connect to localhost:19530
connections.connect()

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Insert some data
collection.insert(
    data=[
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],     # id
        [                                    # vector
            [0.1, 0.2, -0.3, -0.4, 0.5],
            [0.3, -0.1, -0.2, -0.6, 0.7],
            [-0.6, -0.3, 0.2, 0.8, 0.7],
            [0.6, 0.2, -0.3, -0.8, 0.5],
            [0.3, 0.1, -0.2, -0.6, -0.7],
            [0.1, 0.2, -0.3, -0.4, 0.5],
            [0.3, -0.1, -0.2, -0.6, 0.7],
            [-0.6, -0.3, 0.2, 0.8, 0.7],
            [0.6, 0.2, -0.3, -0.8, 0.5],
            [0.3, 0.1, -0.2, -0.6, -0.7],
        ],
    ]
)

# Flush the data so that the inserted segments are sealed and become compactable
collection.flush()

# Compact small segments
collection.compact()

# Check the compaction state
collection.get_compaction_plans()

# Compaction Plans:
#  - compaction id: 446738261026576357
#  - state: Completed
#  - plans: []
```

## Related operations

The following operations are related to `get_compaction_plans()`:

- [compact()](compact.md)

- [get_compaction_state()](get_compaction_state.md)

- [wait_for_compaction_completed()](wait_for_compaction_completed.md)

