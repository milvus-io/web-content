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

**RETURN TYPE:**

*Result\<ListDatabasesResponse\>*

**RETURNS:**

A **ListDatabasesResponse** containing the names of the databases. Returns an `Error` if the operation fails.

```rust
ListDatabasesResponse
    database_names() // -> &[String]
```

**METHODS:**

- `database_names()` (*&[String]*) -

    The names of the databases.

## Example

```rust
let request = ListDatabasesRequest::builder().build()?;
let resp = client.list_databases(request).await?;
for name in resp.database_names() {
    println!("database: {name}");
}
```
