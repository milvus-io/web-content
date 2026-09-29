# AlterDatabaseProperties()

Updates mutable properties of a database.

```rust
pub async fn alter_database_properties(&self, request: AlterDatabasePropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterDatabasePropertiesRequest::builder()
    .database_name("my_database")
    .property("database.replica.number", "2")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database to update. Required.

- `properties: HashMap<String, String>`

    Mutable properties to set on the database. At least one property is required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = AlterDatabasePropertiesRequest::builder()
    .database_name("my_database")
    .property("database.replica.number", "2")
    .build()?;
client.alter_database_properties(request).await?;
```
