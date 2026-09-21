# AlterCollectionFunction()

Alters a function attached to a collection schema.

```rust
pub async fn alter_collection_function(&self, request: AlterCollectionFunctionRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterCollectionFunctionRequest::builder()
    .collection_name("books")
    .function(
        Function::new()
            .name("bm25_title")
            .function_type(FunctionType::Bm25)
            .add_output_field("title_vector"),
    )
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the function. Required.

- `function: Option<Function>`

    The updated function definition. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AlterCollectionFunctionRequest::builder()
    .collection_name("books")
    .function(
        Function::new()
            .name("bm25_title")
            .function_type(FunctionType::Bm25)
            .add_output_field("title_vector"),
    )
    .build()?;
client.alter_collection_function(request).await?;
```
