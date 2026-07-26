# array_remove()

Creates an operation that removes matching array elements from the existing field value during an upsert.

## Request Syntax

```python
FieldOp.array_remove() -> FieldPartialUpdateOp
```

**RETURN TYPE:**

*FieldPartialUpdateOp*

**RETURNS:**

Operation message that selects ARRAY_REMOVE behavior.

## Examples

Applies ARRAY_REMOVE to the tags field.

```python
from pymilvus import FieldOp, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
client.upsert(
    collection_name="book_chunks",
    data=[
        {
            "id": 1,
            "vector": [0.1, 0.2, 0.3, 0.4],
            "tags": ["obsolete"],
        }
    ],
    field_ops={"tags": FieldOp.array_remove()},
)
```
