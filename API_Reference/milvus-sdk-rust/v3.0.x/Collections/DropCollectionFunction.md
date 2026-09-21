# DropCollectionFunction()

Drops a function from a collection schema.

```rust
pub async fn drop_collection_function(&self, request: DropCollectionFunctionRequest) -> Result<()>
```

This request type is **deprecated**: Milvus 3.0 and later do not support dropping a function separately. Use `DropFunctionFieldRequest` instead.

## Request Syntax

```rust
let request = DropCollectionFunctionRequest::builder()
    .collection_name("books")
    .function_name("bm25_title")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the function. Required.

- `function_name: String`

    Name of the function to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = DropCollectionFunctionRequest::builder()
    .collection_name("books")
    .function_name("bm25_title")
    .build()?;
client.drop_collection_function(request).await?;
```
