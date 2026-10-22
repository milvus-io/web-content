# FieldOp

Factory class for field-level partial-update operations.

## Request Syntax

```python
class FieldOp:
```

**RETURN TYPE:**

*FieldOp*

**RETURNS:**

Factory class whose static methods create field partial-update operation messages.

**EXCEPTIONS:**

- **[MilvusException](../../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates FieldOp usage.

```python
from pymilvus import FieldOp, MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create a collection with an ARRAY field and load it
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=3)
schema.add_field(field_name="tags", datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=10, max_length=64)
client.create_collection(collection_name="book_chunks", schema=schema)
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="COSINE")
client.create_index(collection_name="book_chunks", index_params=index_params)
client.load_collection(collection_name="book_chunks")

client.upsert(
    collection_name="book_chunks",
    data=[{"id": 1, "vector": [0.1, 0.2, 0.3], "tags": ["science"]}],
    field_ops={"tags": FieldOp.array_append()},
)
```
