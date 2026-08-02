# array_append()

Creates an operation that appends incoming array elements to the existing field value during an upsert.

## Request Syntax

```python
FieldOp.array_append() -> FieldPartialUpdateOp
```

**RETURN TYPE:**

*FieldPartialUpdateOp*

**RETURNS:**

Operation message that selects ARRAY_APPEND behavior.

## Examples

Applies ARRAY_APPEND to the tags field.

```python
from pymilvus import FieldOp, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
client.upsert(
    collection_name="book_chunks",
    data=[
        {
            "id": 1,
            "vector": [0.1, 0.2, 0.3, 0.4],
            "tags": ["science"],
        }
    ],
    field_ops={"tags": FieldOp.array_append()},
)
```
