# DropIndexProperties()

Drops properties from an existing index.

```rust
pub async fn drop_index_properties(&self, request: DropIndexPropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropIndexPropertiesRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .property_keys(HashSet::from(["mmap.enabled".to_string()]))
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the index. Required.

- `index_name: String`

    Name of the index whose properties to drop. Required.

- `property_keys: HashSet<String>`

    Keys of the properties to remove from the index.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or an `Error` on failure.

## Example

```rust
let request = DropIndexPropertiesRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .property_keys(HashSet::from(["mmap.enabled".to_string()]))
    .build()?;
client.drop_index_properties(request).await?;
```
