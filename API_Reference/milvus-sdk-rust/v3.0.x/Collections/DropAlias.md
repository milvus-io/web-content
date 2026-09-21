# DropAlias()

Drops an alias without dropping the underlying collection.

```rust
pub async fn drop_alias(&self, request: DropAliasRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropAliasRequest::builder()
    .alias("featured")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `alias: String`

    The alias to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = DropAliasRequest::builder()
    .alias("featured")
    .build()?;
client.drop_alias(request).await?;
```
