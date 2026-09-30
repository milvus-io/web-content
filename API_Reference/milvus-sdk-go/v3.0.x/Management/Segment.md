# Segment

Represents a persistent data segment in Milvus. Returned by `GetPersistentSegmentInfo()`.

```go
type Segment struct {
    ID           int64
    CollectionID int64
    ParititionID int64
    NumRows      int64
    State        commonpb.SegmentState
}
```

**FIELDS:**

- **ID** (*int64*) -
The unique identifier of the segment.

- **CollectionID** (*int64*) -
The identifier of the collection the segment belongs to.

- **ParititionID** (*int64*) -
The identifier of the partition the segment belongs to.

- **NumRows** (*int64*) -
The number of rows in the segment.

- **State** (*commonpb.SegmentState*) -
The current segment state.

**METHODS:**

- `Flushed() bool`

    Returns true when the segment is in the flushed state.
