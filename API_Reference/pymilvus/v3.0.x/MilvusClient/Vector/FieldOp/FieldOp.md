# FieldOp

Factory class for field-level partial-update operations.

**RETURN TYPE:**

*FieldOp*

**RETURNS:**

Factory class whose static methods create field partial-update operation messages.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Uses FieldOp.array_append() to append values instead of replacing the existing array.

```python
from pymilvus import FieldOp, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
client.upsert(
    collection_name="book_chunks",
    data=[{"id": 1, "vector": [0.1, 0.2, 0.3], "tags": ["science"]}],
    field_ops={"tags": FieldOp.array_append()},
)
```
