# AlterAlias()

Repoints an alias from its current collection to another collection.

```rust
pub async fn alter_alias(&self, request: AlterAliasRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterAliasRequest::builder()
    .collection_name("archive")
    .alias("featured")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection the alias should now point to. Required.

- `alias: String`

    The alias to repoint. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AlterAliasRequest::builder()
    .collection_name("archive")
    .alias("featured")
    .build()?;
client.alter_alias(request).await?;
```
