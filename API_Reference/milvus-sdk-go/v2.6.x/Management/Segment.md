# Segment

Represents a persistent segment with its ID, row count, and state.

```go
type Segment struct {
    ID int64
    CollectionID int64
    ParititionID int64
    NumRows int64
    State commonpb.SegmentState
}
```

**FIELDS:**

- **ID** (*int64*)

      The unique identifier.

- **CollectionID** (*int64*)

      The ID of the collection.

- **ParititionID** (*int64*)

      The paritition i d.

- **NumRows** (*int64*)

      The number of rows in the segment.

- **State** (*commonpb.SegmentState*)

      The current state.

**METHODS:**

- `Flushed() bool`

      Flushed indicates segment is flushed