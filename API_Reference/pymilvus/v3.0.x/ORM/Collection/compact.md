# compact()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation compacts and merges small segments in the current collection.

## Request Syntax

```python
compact(
    is_clustering: bool = False,
    timeout: float | None,
)
```

**PARAMETERS:**

- **is_clustering** (*bool* | *None*) -

    Whether to trigger a clustering compaction that reorganizes segment data to improve query performance. The value defaults to **False**.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

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
```

## Related operations

The following operations are related to `compact()`:

- [get_compaction_plans()](get_compaction_plans.md)

- [get_compaction_state()](get_compaction_state.md)

- [wait_for_compaction_completed()](wait_for_compaction_completed.md)

