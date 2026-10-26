# GetLoadState()

Returns the load state and loading progress of a collection or partition.

```rust
pub async fn get_load_state(&self, request: GetLoadStateRequest) -> Result<GetLoadStateResponse>
```

## Request Syntax

```rust
let request = GetLoadStateRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to inspect. Required.

- `partition_names: Vec<String>`

    Partition names to check the load state of. Use `partition_name()` to add one.

**RETURN TYPE:**

*Result\<GetLoadStateResponse\>*

**RETURNS:**

A **GetLoadStateResponse** containing the load state and progress of the target. Returns an `Error` if the operation fails.

```rust
GetLoadStateResponse
    state() // -> LoadState
    progress() // -> i64
```

**METHODS:**

- `state()` (*LoadState*) -

    The load state of the collection or partition.

    **Constants:**

    - `NotExist`

    The collection does not exist on the server. This is the default.

    - `NotLoad`

    The collection exists but its data is not loaded.

    - `Loading`

    The collection is currently being loaded.

    - `Loaded`

    The collection is fully loaded and available for queries.

    - `Unknown`

    The load state could not be determined.

- `progress()` (*i64*) -

    The loading prog

## Example

```rust
let request = GetLoadStateRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.get_load_state(request).await?;
println!("state: {:?}, progress: {}", resp.state(), resp.progress());
```
