# TargetSizeUnit

This enum specifies the unit of the `target_size` parameter in `Compact()`.

```rust
pub enum TargetSizeUnit {
    B,
    KB,
    MB,
    GB,
    TB,
    PB,
}
```

**VARIANTS:**

- `B`

    Bytes.

- `KB`

    Kilobytes.

- `MB`

    Megabytes.

- `GB`

    Gigabytes.

- `TB`

    Terabytes.

- `PB`

    Petabytes.

## Example

```rust
let request = CompactRequest::builder()
    .collection_name("books")
    .target_size(1)
    .target_size_unit(TargetSizeUnit::GB)
    .build()?;
```
