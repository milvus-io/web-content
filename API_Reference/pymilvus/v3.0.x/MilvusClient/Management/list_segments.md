# list_segments()

This operation lists the collection segments that are still retained in the requested lifecycle states.

<div class="alert note">

Dropped segment metadata is subject to server-side garbage collection. Callers that need lineage history must poll and cache it during the retention window.

</div>

## Request syntax

```python
client.list_segments(
    collection_name: str,
    states: Optional[Sequence[SegmentState]] = None,
    timeout: Optional[float] = None
) -> List[SegmentInfo]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **states** (*Optional[Sequence[SegmentState]]*) -

    The segment states to include in the result. When omitted, the default retained states are used: **Growing**, **Sealed**, **Flushing**, **Flushed**, **Importing**, and **Dropped**.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*List[SegmentInfo]*

**RETURNS:**

A list of segment information objects with the following members:

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

    The ID of the partition that the segment belongs to.

- **insert_channel** (*str*) -

    The insert channel that the segment data was written to.

- **compaction_from** (*List[int]*) -

    The IDs of the segments that this segment was compacted from.

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

segments = client.list_segments(collection_name="my_collection")
for seg in segments:
    print(f"Segment {seg.segment_id}: state={seg.state}")

# List only sealed and flushed segments
segments = client.list_segments(
    collection_name="my_collection",
    states=[SegmentState.Sealed, SegmentState.Flushed],
)
```

## Related methods

- [list_persistent_segments()](list_persistent_segments.md)

- [list_loaded_segments()](list_loaded_segments.md)

- [compact()](compact.md)

- [get_compaction_plans()](get_compaction_plans.md)
