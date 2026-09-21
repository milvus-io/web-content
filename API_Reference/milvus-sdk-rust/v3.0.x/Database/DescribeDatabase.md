# DescribeDatabase()

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

**RETURNS:**

*Result\<DescribeDatabaseResponse\>*

`DescribeDatabaseResponse` exposes `database_name()`, `database_id()`, `created_timestamp()`, and `properties()` returning the database properties as a `HashMap<String, String>`. Returns an `Error` on failure.

## Example

```rust
let request = DescribeDatabaseRequest::builder()
    .database_name("my_database")
    .build()?;
let resp = client.describe_database(request).await?;
println!("properties: {:?}", resp.properties());
```
