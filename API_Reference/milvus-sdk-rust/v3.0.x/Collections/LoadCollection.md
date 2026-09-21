# LoadCollection()

Loads collection data into query-node memory.

```rust
pub async fn load_collection(&self, request: LoadCollectionRequest) -> Result<()>
```

## Request Syntax

```rust
let request = LoadCollectionRequest::builder()
    .collection_name("books")
    .replica_number(1)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to load. Required.

- `sync: bool`

    Whether to wait for the load to complete before returning. Defaults to `true`. With `false`, the method returns after the load request is accepted.

- `replica_number: i32`

    Number of replicas to load. Defaults to `1`.

- `timeout_ms: i64`

    Overall loading wait timeout in milliseconds; values less than or equal to zero wait indefinitely. Defaults to `60000`.

- `refresh: bool`

    Whether to refresh the loaded view. Defaults to `false`.

- `load_fields: Vec<String>`

    Subset of fields to load.

- `skip_load_dynamic_field: bool`

    Whether to skip loading the dynamic field. Defaults to `false`.

- `resource_groups: Vec<String>`

    Resource groups that host the loaded replicas.

- `load_priority: Option<String>`

    Load priority forwarded as the `load_priority` load param, such as `low`.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = LoadCollectionRequest::builder()
    .collection_name("books")
    .replica_number(1)
    .build()?;
client.load_collection(request).await?;
```
