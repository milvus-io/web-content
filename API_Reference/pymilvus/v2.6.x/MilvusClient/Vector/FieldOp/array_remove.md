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
from pymilvus import FieldOp, MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create a collection with an ARRAY field and load it
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=4)
schema.add_field(field_name="tags", datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=10, max_length=64)
client.create_collection(collection_name="book_chunks", schema=schema)
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="COSINE")
client.create_index(collection_name="book_chunks", index_params=index_params)
client.load_collection(collection_name="book_chunks")

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
