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

**RETURNS:**

*Result\<DescribeAliasResponse\>*

`DescribeAliasResponse` exposes `database_name()`, `alias()`, and `collection_name()` describing the alias and the collection it points to. Returns `Error` on failure.

## Example

```rust
let request = DescribeAliasRequest::builder()
    .alias("featured")
    .build()?;
let resp = client.describe_alias(request).await?;
println!("alias {} -> {}", resp.alias(), resp.collection_name());
```
