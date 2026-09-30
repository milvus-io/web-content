# DropDatabase()

Drops a database and the resources owned by it according to server policy.

```rust
pub async fn drop_database(&self, request: DropDatabaseRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
client.drop_database(request).await?;
```
