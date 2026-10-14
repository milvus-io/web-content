# DescribeAlias()

Resolves an alias to its database and canonical collection name.

```rust
pub async fn describe_alias(&self, request: DescribeAliasRequest) -> Result<DescribeAliasResponse>
```

## Request Syntax

```rust
let request = DescribeAliasRequest::builder()
    .alias("featured")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `alias: String`

    The alias to resolve. Required.

**RETURN TYPE:**

*Result\<DescribeAliasResponse\>*

**RETURNS:**

A **DescribeAliasResponse** containing the collection the alias points to. Returns an `Error` if the operation fails.

```rust
DescribeAliasResponse
    database_name() // -> &str
    alias() // -> &str
    collection_name() // -> &str
```

**METHODS:**

- `database_name()` (*&str*) -

    The database that holds the alias.

- `alias()` (*&str*) -

    The alias name.

- `collection_name()` (*&str*) -

    The collection the alias points to.

## Example

```rust
let request = DescribeAliasRequest::builder()
    .alias("featured")
    .build()?;
let resp = client.describe_alias(request).await?;
println!("alias {} -> {}", resp.alias(), resp.collection_name());
```
