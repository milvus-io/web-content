# upsert()

This operation updates existing entities and inserts new entities into a collection.

## Request Syntax

```python
upsert(
    collection_name: str,
    data: Union[Dict, List[Dict]],
    timeout: Optional[float] = None,
    partition_name: Optional[str] = "",
    **kwargs,
) -> MutationResult
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection into which entities are upserted.

- **data** (*Union[Dict, List[Dict]]*) -
**[REQUIRED]**
The entities to upsert. Iterable input is converted to a list when necessary.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC. This value overrides the client default.

- **partition_name** (*Optional[str]*) -
Default: `""`
The name of the partition into which entities are upserted.

- **kwargs** (*Any*) -
The additional upsert options.

    - **partial_update** (*bool*) -
Default: `False`
The flag that controls whether only specified fields are updated. When `True`, unspecified fields remain unchanged.

    - **field_ops** (*Optional[Dict[str, Any]]*) -
Default: `None`
The per-field merge operations applied during a partial update. Each value can be a `FieldOp` factory result, `array_append`, `array_remove`, or `replace`, or a `FieldPartialUpdateOp` message. Any operation other than `replace` enables partial updates.

**RETURN TYPE:**

*MutationResult*

**RETURNS:**

Mutation result containing the primary keys and counts reported for the upsert operation.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates upsert usage.

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
