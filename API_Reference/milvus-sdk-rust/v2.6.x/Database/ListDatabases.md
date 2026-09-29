# ListDatabases()

Lists databases visible to the authenticated user.

```rust
pub async fn list_databases(&self, request: ListDatabasesRequest) -> Result<ListDatabasesResponse>
```

## Request Syntax

```rust
let request = ListDatabasesRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

This request takes no fields.

**RETURNS:**

*Result\<ListDatabasesResponse\>*

`ListDatabasesResponse` exposes `database_names()` returning the database names visible to the authenticated user. Returns an `Error` on failure.

## Example

```rust
let request = ListDatabasesRequest::builder().build()?;
let resp = client.list_databases(request).await?;
for name in resp.database_names() {
    println!("database: {name}");
}
```
