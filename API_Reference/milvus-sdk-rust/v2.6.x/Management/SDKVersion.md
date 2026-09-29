# SDKVersion()

Returns the compile-time Rust SDK package version.

```rust
pub fn sdk_version(&self) -> &'static str
```

## Example

```rust
println!("sdk version: {}", client.sdk_version());
```
