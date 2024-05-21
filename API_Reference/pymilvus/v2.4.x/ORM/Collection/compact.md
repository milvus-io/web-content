# compact()

This operation compacts and merges small segments in the current collection.

## Request Syntax

```python
compact(
    timeout: float | None
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Compact small segments
collection.compact()
```

## Related operations

The following operations are related to `compact()`:

- [get_compaction_plans()](get_compaction_plans.md)

- [get_compaction_state()](get_compaction_state.md)

- [wait_for_compaction_completed()](wait_for_compaction_completed.md)

