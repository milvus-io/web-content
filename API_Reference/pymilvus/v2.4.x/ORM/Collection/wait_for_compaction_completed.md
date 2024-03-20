# wait_for_compaction_completed()

This operation blocks the current session until the compaction request is completed.

## Request Syntax

```python
wait_for_compaction_completed(
    timeout: float | None
)
```

__PARAMETERS:__

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

    This arises when any error occurs during this operation.

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

# Check the compaction state
collection.wait_for_compaction_completed()
```

## Related operations

The following operations are related to `wait_for_compaction_completed()`:

- [compact()](./compact.md)

- [get_compaction_plans()](./get_compaction_plans.md)

- [get_compaction_state()](./get_compaction_state.md)

