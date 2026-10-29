# SegmentState

The state of a segment on a query node.

```csharp
public enum SegmentState
{
    None = 0,
    NotExist = 1,
    Growing = 2,
    Sealed = 3,
    Flushed = 4,
    Flushing = 5,
    Dropped = 6,
    Importing = 7
}
```

**Constants:**

- **None** (0)

    Default value, not set.

- **NotExist** (1)

    The segment no longer exists.

- **Growing** (2)

    The segment is being built or loaded.

- **Sealed** (3)

    The segment is sealed and searchable.

- **Flushed** (4)

    The segment has been flushed to storage.

- **Flushing** (5)

    The segment is currently being flushed.

- **Dropped** (6)

    The segment has been dropped.

- **Importing** (7)

    The segment is being imported.

The level of a segment.

```csharp
public enum SegmentLevel
{
    Legacy = 0,
    L0 = 1,
    L1 = 2,
    L2 = 3
}
```

**Constants:**

- **Legacy** (0)

    Legacy level, zero value.

- **L0** (1)

    L0 segment: contains delta data for the current channel.

- **L1** (2)

    L1 segment: normal segment, with no extra compaction attribute.

- **L2** (3)

    L2 segment: segment with extra data distribution info.
