# path_replace()

Creates an operation that replaces a value selected by a path relative to the parent field during an upsert.

## Request Syntax

```python
FieldOp.path_replace(path: str) -> FieldPartialUpdateOp
```

**PARAMETERS:**

- **path** (*str*) -

    **[REQUIRED]**

    The path of the value to replace, relative to the parent field. For a struct, use `[index]` to replace one complete element or `[index][child]` to replace one child. Each operand row contains one struct element, with only the selected child for a child path.

**RETURN TYPE:**

*FieldPartialUpdateOp*

**RETURNS:**

Operation message that selects PATH_REPLACE behavior.

**EXCEPTIONS:**

- **[MilvusException](../../../Exceptions/MilvusException.md)**

    Raised when **path** is not a non-empty string.

## Example

Replaces one child of a struct field using a path.

```python
from pymilvus import FieldOp, MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create a collection with a STRUCT field and load it
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=3)
schema.add_field(field_name="meta", datatype=DataType.STRUCT, nullable=True)
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
            "vector": [0.1, 0.2, 0.3],
            "meta": [{"tags": ["science"]}],
        }
    ],
    field_ops={"meta": FieldOp.path_replace("[1][tags]")},
)
```
