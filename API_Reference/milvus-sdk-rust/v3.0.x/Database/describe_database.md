# describe_database()

Retrieves a database's metadata and properties.

```rust
pub async fn describe_database(&self, request: DescribeDatabaseRequest) -> Result<DescribeDatabaseResponse>
```

## Request Syntax

```rust
let request = DescribeDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database to describe. Required.

**RETURN TYPE:**

*Result\<DescribeDatabaseResponse\>*

**RETURNS:**

A **DescribeDatabaseResponse** containing the database details. Returns an `Error` if the operation fails.

```rust
DescribeDatabaseResponse
    database_name() // -> &str
    database_id() // -> i64
    created_timestamp() // -> u64
    properties() // -> &HashMap<String, String>
```

**METHODS:**

- `database_name()` (*&str*) -

    The name of the database.

- `database_id()` (*i64*) -

    The ID of the database.

- `created_timestamp()` (*u64*) -

    The timestamp when the database was created.

- `properties()` (*&HashMap<String, String>*) -

    The properties of the database.

## Example

```rust
let request = DescribeDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
let resp = client.describe_database(request).await?;
println!("properties: {:?}", resp.properties());
```
