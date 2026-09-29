# CreateDatabase()

Creates a database in the connected Milvus instance.

```rust
pub async fn create_database(&self, request: CreateDatabaseRequest) -> Result<()>
```

## Request Syntax

```rust
let request = CreateDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database to create. Required.

- `properties: HashMap<String, String>`

    Properties of the database, for example `database.replica.number`. Optional.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = CreateDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
client.create_database(request).await?;
```
