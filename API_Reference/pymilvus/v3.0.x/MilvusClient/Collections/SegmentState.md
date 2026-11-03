# SegmentState

This is an enumeration that provides the following constants. It is used to filter segments by lifecycle state, for example in `list_persistent_segments()` or `list_segments()`.

Available in PyMilvus v3.0.2 or later.

```python
class SegmentState(IntEnum):
    SegmentStateNone = 0
    NotExist = 1
    Growing = 2
    Sealed = 3
    Flushed = 4
    Flushing = 5
    Dropped = 6
    Importing = 7
```

**Constants:**

- **SegmentStateNone** (0)

    Indicates that the segment state is unset.

- **NotExist** (1)

    Indicates that the segment does not exist.

- **Growing** (2)

    Indicates that the segment is growing. Growing segments accept incoming data until they are sealed.

- **Sealed** (3)

    Indicates that the segment is sealed. Sealed segments no longer accept incoming data and are candidates for compaction.

- **Flushed** (4)

    Indicates that the segment is flushed. Flushed segments have been persisted to object storage.

- **Flushing** (5)

    Indicates that the segment is being flushed.

- **Dropped** (6)

    Indicates that the segment is dropped. Dropped segment metadata is subject to server-side garbage collection.

- **Importing** (7)

    Indicates that the segment is being imported through a bulk import job.

## Example

```python
from pymilvus import MilvusClient, SegmentState

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# List only sealed and flushed segments
segments = client.list_segments(
    collection_name="my_collection",
    states=[SegmentState.Sealed, SegmentState.Flushed],
)
for seg in segments:
    print(f"Segment {seg.segment_id}: state={seg.state}")
```
