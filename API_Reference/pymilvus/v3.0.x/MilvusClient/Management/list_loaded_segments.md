# list_loaded_segments()

This operation lists all currently loaded segments for a collection, including information about row count, sort status, storage level, and memory size.

## Request Syntax

```python
client.list_loaded_segments(
    collection_name: str,
    timeout: float = None
) -> List[LoadedSegmentInfo]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*List[LoadedSegmentInfo]*

**RETURNS:**

A list of loaded segment information objects containing segment_id, collection_id, collection_name, num_rows, is_sorted, state, level, storage_version, and mem_size.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 1. Create a collection
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
client.create_collection(collection_name="my_collection", schema=schema)

# 2. Insert some data
client.insert(collection_name="my_collection", data=[{"id": i, "vector": [0.1] * 5} for i in range(10)])

# 3. Flush the data so that the inserted segments are persisted
client.flush(collection_name="my_collection")

# 4. Create a FLAT index
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="FLAT", metric_type="COSINE")
client.create_index(collection_name="my_collection", index_params=index_params)

# 5. Load the collection
client.load_collection(collection_name="my_collection")

# 6. List the loaded segments
segments = client.list_loaded_segments(collection_name="my_collection")
for seg in segments:
    print(f"Segment {seg.segment_id}: {seg.num_rows} rows, mem={seg.mem_size}")
```
