# SegmentState

Represents the state of a segment.

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

**Constants:**

- **SegmentStateNone**

    Placeholder for an unknown state.

- **NotExist**

    The segment does not exist.

- **Growing**

    The segment is actively accepting inserts.

- **Sealed**

    The segment is sealed and no longer accepts inserts.

- **Flushed** ('Flushed')

    The segment is sealed and has been flushed to storage.

- **Flushing** ('Flushing')

    The segment is being flushed.

- **Dropped** ('Dropped')

    The segment has been dropped.

- **Importing** ('Importing')

    The segment is being created via bulk import.
