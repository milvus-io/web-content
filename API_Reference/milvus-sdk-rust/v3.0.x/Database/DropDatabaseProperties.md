# DropDatabaseProperties()

Removes the requested mutable database properties.

```rust
pub async fn drop_database_properties(&self, request: DropDatabasePropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropDatabasePropertiesRequest::builder()
    .database_name("my_database")
    .property_keys(["test.one", "test.two"])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database to update. Required.

- `property_keys: HashSet<String>`

    Keys of the properties to remove. At least one property key is required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropDatabasePropertiesRequest::builder()
    .database_name("my_database")
    .property_key("database.replica.number")
    .build()?;
client.drop_database_properties(request).await?;
```
