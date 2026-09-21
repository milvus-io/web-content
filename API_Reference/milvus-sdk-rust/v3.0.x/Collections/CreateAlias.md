# CreateAlias()

Creates an alias that can be used in query and search requests in place of a collection name.

```rust
pub async fn create_alias(&self, request: CreateAliasRequest) -> Result<()>
```

## Request Syntax

```rust
let request = CreateAliasRequest::builder()
    .collection_name("books")
    .alias("featured")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alias. Required.

- `alias: String`

    The alias to create. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = CreateAliasRequest::builder()
    .collection_name("books")
    .alias("featured")
    .build()?;
client.create_alias(request).await?;
```
