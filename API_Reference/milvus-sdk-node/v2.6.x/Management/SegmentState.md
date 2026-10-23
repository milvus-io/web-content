# SegmentState

This enum represents the state of a segment.

```typescript
export enum SegmentState {
  SegmentStateNone,
  NotExist,
  Growing,
  Sealed,
  Flushed = 'Flushed',
  Flushing = 'Flushing',
  Dropped = 'Dropped',
  Importing = 'Importing',
}

```

**FIELDS:**

- **SegmentStateNone** (SegmentState)

    Placeholder for an unknown state.

- **NotExist** (SegmentState)

    The segment does not exist.

- **Growing** (SegmentState)

    The segment is actively accepting inserts.

- **Sealed** (SegmentState)

    The segment is sealed and no longer accepts inserts.

- **Flushed** (SegmentState)

    The segment is sealed and has been flushed to storage.

- **Flushing** (SegmentState)

    The segment is being flushed.

- **Dropped** (SegmentState)

    The segment has been dropped.

- **Importing** (SegmentState)

    The segment is being created via bulk import.
