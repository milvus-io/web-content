# AlterIndexProperties()

Alters the properties of an existing index.

```rust
pub async fn alter_index_properties(&self, request: AlterIndexPropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterIndexPropertiesRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .properties(HashMap::from([("mmap.enabled".to_string(), "true".to_string())]))
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the index. Required.

- `index_name: String`

    Name of the index to alter. Required.

- `properties: HashMap<String, String>`

    Properties to set on the index, such as `mmap.enabled`.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or an `Error` on failure.

## Example

```rust
let request = AlterIndexPropertiesRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .properties(HashMap::from([("mmap.enabled".to_string(), "true".to_string())]))
    .build()?;
client.alter_index_properties(request).await?;
```
