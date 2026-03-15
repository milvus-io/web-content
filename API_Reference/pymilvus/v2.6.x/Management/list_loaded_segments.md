# list_loaded_segments()

This operation lists all currently loaded segments for a collection, including information about row count, sort status, storage level, and memory size.

## Request syntax

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

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

segments = client.list_loaded_segments(collection_name="my_collection")
for seg in segments:
    print(f"Segment {seg.segment_id}: {seg.num_rows} rows, mem={seg.mem_size}")
```
