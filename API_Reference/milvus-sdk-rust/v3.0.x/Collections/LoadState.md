# LoadState

This enum represents the load state of a collection or partition, as returned by `GetLoadState()`.

```rust
pub enum LoadState {
    NotExist,
    NotLoad,
    Loading,
    Loaded,
    Unknown,
}
```

**Constants:**

- **NotExist**

    The collection does not exist on the server. This is the default.

- **NotLoad**

    The collection exists but its data is not loaded.

- **Loading**

    The collection is currently being loaded.

- **Loaded**

    The collection is fully loaded and available for queries.

- **Unknown**

    The load state could not be determined.

## Example

```rust
let resp = client.get_load_state(request).await?;
if resp.state() == LoadState::Loaded {
    println!("collection is ready for queries");
}
```
