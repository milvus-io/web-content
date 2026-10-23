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

- **SegmentStateNone**

    Placeholder for an unknown state.

- **NotExist**

    The segment does not exist.

- **Growing**

    The segment is actively accepting inserts.

- **Sealed**

    The segment is sealed and no longer accepts inserts.

- **Flushed**

    The segment is sealed and has been flushed to storage.

- **Flushing**

    The segment is being flushed.

- **Dropped**

    The segment has been dropped.

- **Importing**

    The segment is being created via bulk import.
