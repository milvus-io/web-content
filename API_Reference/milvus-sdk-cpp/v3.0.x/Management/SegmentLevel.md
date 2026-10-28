# SegmentLevel

This enum identifies the level of a segment returned by `ListQuerySegments()` or `ListPersistentSegments()`.

```cpp
enum class SegmentLevel {
    UNKNOWN = -1,
    LEGACY = 0,
    L0 = 1,
    L1 = 2,
    L2 = 3,
};
```

**Constants:**

- **UNKNOWN** (-1) - The segment level is unknown.

- **LEGACY** (0) - Legacy segment.

- **L0** (1) - Level-0 segment (delta log).

- **L1** (2) - Level-1 sealed segment.

- **L2** (3) - Level-2 sealed segment.
