# SegmentState

This enum represents the state of a segment, as returned by `ListPersistentSegments()` and `ListQuerySegments()`.

```rust
pub enum SegmentState {
    Unknown,
    NotExist,
    Growing,
    Sealed,
    Flushed,
    Flushing,
    Dropped,
}
```

**VARIANTS:**

- `Unknown`

    The segment state is unknown. This is the default.

- `NotExist`

    The segment does not exist.

- `Growing`

    The segment is actively accepting new inserts.

- `Sealed`

    The segment is sealed and no longer accepts inserts.

- `Flushed`

    The segment is sealed and has been flushed to storage.

- `Flushing`

    The segment is in the process of being flushed.

- `Dropped`

    The segment has been dropped.

## Example

```rust
for segment in resp.segments() {
    if segment.get_state() == SegmentState::Flushed {
        println!("segment {} is flushed", segment.get_segment_id());
    }
}
```
