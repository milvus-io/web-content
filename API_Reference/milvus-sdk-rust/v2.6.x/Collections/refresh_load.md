# refresh_load()

Refreshes the loaded data of a collection on query nodes (its partitions are refreshed together).

```rust
pub async fn refresh_load(&self, request: RefreshLoadRequest) -> Result<()>
```

## Request Syntax

```rust
let request = RefreshLoadRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to refresh. Required.

- `sync: bool`

    Whether to poll until the refreshed load completes. Defaults to `true`.

- `timeout_ms: i64`

    Overall refresh wait timeout in milliseconds; values less than or equal to zero wait indefinitely. Defaults to `60000`.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Use this after new data or index changes when the existing loaded view must be updated. Returns `Error` on failure.

## Example

```rust
let request = RefreshLoadRequest::builder()
    .collection_name("books")
    .build()?;
client.refresh_load(request).await?;
```
