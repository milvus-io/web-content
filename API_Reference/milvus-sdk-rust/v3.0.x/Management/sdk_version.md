# sdk_version()

Returns the compile-time Rust SDK package version.

```rust
pub fn sdk_version(&self) -> &'static str
```

**RETURN TYPE:**

*&'static str*

**RETURNS:**

The Rust SDK package version embedded at compile time.

## Example

```rust
println!("sdk version: {}", client.sdk_version());
```
