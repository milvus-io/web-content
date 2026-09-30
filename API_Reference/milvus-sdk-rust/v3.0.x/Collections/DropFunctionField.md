# DropFunctionField()

Drops a function and its output fields from a collection.

```rust
pub async fn drop_function_field(&self, request: DropFunctionFieldRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropFunctionFieldRequest::builder()
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

    Name of the function to drop. Its output fields are dropped together with it. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = DropFunctionFieldRequest::builder()
    .collection_name("books")
    .function_name("bm25_title")
    .build()?;
client.drop_function_field(request).await?;
```
