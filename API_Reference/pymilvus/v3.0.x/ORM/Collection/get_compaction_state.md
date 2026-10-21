# get_compaction_state()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation gets the current compaction state. 

## Request Syntax

```python
get_compaction_state(
    timeout: float | None,
    is_clustering: bool
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **is_clustering** (*bool*) -

    Whether to get the state of the clustering compaction job. The value defaults to **False**.

**RETURN TYPE:**

*CompactionState*

**RETURNS:**

A `CompactionState` object with the following members:

- **compaction_id** (*int*) -

    The ID of the compaction job.

- **state** (*State*) -

    The overall state of the compaction job. Possible values are **UndefiedState**, **Executing**, and **Completed**.

- **state_name** (*str*) -

    The name of the current state.

- **in_executing** (*int*) -

    The number of plans currently executing.

- **in_timeout** (*int*) -

    The number of plans that failed due to timeout.

- **completed** (*int*) -

    The number of plans that completed successfully.

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
collection.get_compaction_state()

# CompactionState
#  - compaction id: 446738261026568285
#  - State: Completed
#  - executing plan number: 4
#  - timeout plan number: 0
#  - complete plan number: 4
```

## Related operations

The following operations are related to `get_compaction_state()`:

- [compact()](compact.md)

- [get_compaction_plans()](get_compaction_plans.md)

- [wait_for_compaction_completed()](wait_for_compaction_completed.md)

