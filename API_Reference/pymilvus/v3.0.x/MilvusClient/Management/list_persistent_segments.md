# list_persistent_segments()

This operation lists all persistent (flushed) segments for a collection, including information about row count, sort status, and storage level.

## Request syntax

```python
client.list_persistent_segments(
    collection_name: str,
    timeout: float = None,
    states: Optional[Sequence[SegmentState]] = None
) -> List[SegmentInfo]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **states** (*Optional[Sequence[SegmentState]]*) -

    The segment states to include in the result. When omitted, the server preserves the legacy persistent-state filter (growing, sealed, flushed, flushing, importing, and dropped segments).

    This parameter is available in PyMilvus v3.0.2 or later.

**RETURN TYPE:**

*List[SegmentInfo]*

**RETURNS:**

A list of persistent segment information objects with the following members:

- **segment_id** (*int*) -

    The ID of the segment.

- **collection_id** (*int*) -

    The ID of the collection that the segment belongs to.

- **collection_name** (*str*) -

    The name of the collection that the segment belongs to.

- **num_rows** (*int*) -

    The number of rows in the segment.

- **is_sorted** (*bool*) -

    Whether the data in the segment is sorted.

- **state** (*SegmentState*) -

    The lifecycle state of the segment.

- **level** (*SegmentLevel*) -

    The storage level of the segment.

- **storage_version** (*int*) -

    The storage version of the segment.

- **partition_id** (*int*) -

    The ID of the partition that the segment belongs to. Available in PyMilvus v3.0.2 or later.

- **insert_channel** (*str*) -

    The insert channel that the segment data was written to. Available in PyMilvus v3.0.2 or later.

- **compaction_from** (*List[int]*) -

    The IDs of the segments that this segment was compacted from. Available in PyMilvus v3.0.2 or later.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, SegmentState

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

segments = client.list_persistent_segments(collection_name="my_collection")
for seg in segments:
    print(f"Segment {seg.segment_id}: {seg.num_rows} rows, level={seg.level}")

# List only flushed and sealed segments
segments = client.list_persistent_segments(
    collection_name="my_collection",
    states=[SegmentState.Flushed, SegmentState.Sealed],
)
```
