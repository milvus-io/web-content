# SegmentLevel

This enum represents the level of a segment, as returned by `ListPersistentSegments()` and `ListQuerySegments()`.

```rust
pub enum SegmentLevel {
    Unknown,
    Legacy,
    L0,
    L1,
    L2,
}
```

**Constants:**

- `Unknown`

    The segment level is unknown. This is the default.

- `Legacy`

    A legacy segment written before level-based segmentation.

- `L0`

    Level-0 segment holding uncommitted or delta data.

- `L1`

    Level-1 segment holding committed data.

- `L2`

    Level-2 segment holding sealed, queryable data.

## Example

```rust
for segment in resp.segments() {
    if segment.get_level() == SegmentLevel::L0 {
        println!("L0 segment: {}", segment.get_segment_id());
    }
}
```
