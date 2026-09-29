# AddCollectionFunction()

Adds a function to an existing collection.

```rust
pub async fn add_collection_function(&self, request: AddCollectionFunctionRequest) -> Result<()>
```

This request type is **deprecated**: Milvus 3.0 and later do not support adding a function separately. Use `AddFunctionFieldRequest` instead.

## Request Syntax

```rust
let request = AddCollectionFunctionRequest::builder()
    .collection_name("books")
    .function(
        Function::new()
            .name("bm25_title")
            .function_type(FunctionType::Bm25),
    )
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `function: Option<Function>`

    The function to add, including its name and type. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AddCollectionFunctionRequest::builder()
    .collection_name("books")
    .function(
        Function::new()
            .name("bm25_title")
            .function_type(FunctionType::Bm25),
    )
    .build()?;
client.add_collection_function(request).await?;
```
