# RefreshLoad()

Refreshes a loaded collection or its partitions on query nodes.

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

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Use this after new data or index changes when the existing loaded view must be updated. Returns `Error` on failure.

## Example

```rust
let request = RefreshLoadRequest::builder()
    .collection_name("books")
    .build()?;
client.refresh_load(request).await?;
```
