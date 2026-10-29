# SegmentLevel

Represents the level of a segment.

```typescript
export enum SegmentLevel {
  Legacy = 0, // zero value for legacy logic
  L0 = 1, // L0 segment, contains delta data for current channel
  L1 = 2, // L1 segment, normal segment, with no extra compaction attribute
  L2 = 3, // L2 segment, segment with extra data distribution info
}
```

**Constants:**

- **Legacy** (0)

    Zero value kept for legacy logic.

- **L0** (1)

    Level-0 segment holding delta data for the current channel.

- **L1** (2)

    Level-1 normal segment, with no extra compaction attribute.

- **L2** (3)

    Level-2 segment with extra data distribution info.
