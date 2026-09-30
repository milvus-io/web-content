# AddFunctionField()

Adds a function together with its output field and bound index to an existing collection.

```rust
pub async fn add_function_field(&self, request: AddFunctionFieldRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AddFunctionFieldRequest::builder()
    .collection_name("books")
    .field(
        FieldSchema::new()
            .name("title_vector")
            .data_type(DataType::SparseFloatVector),
    )
    .function(
        Function::new()
            .name("bm25_title")
            .function_type(FunctionType::Bm25)
            .add_input_field("title")
            .add_output_field("title_vector"),
    )
    .index(
        IndexParam::new()
            .index_name("title_vector_idx")
            .index_type(IndexType::SparseInvertedIndex),
    )
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `field: Option<FieldSchema>`

    Schema of the function output field. Only `SparseFloatVector` (for BM25) and `BinaryVector` (for MinHash) output fields can be added to an existing collection. Required.

- `function: Option<Function>`

    The function definition, including its name and type. Required.

- `index: Option<IndexParam>`

    Index bound to the output field, with an explicit index type. The bound index must target the output field. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AddFunctionFieldRequest::builder()
    .collection_name("books")
    .field(
        FieldSchema::new()
            .name("title_vector")
            .data_type(DataType::SparseFloatVector),
    )
    .function(
        Function::new()
            .name("bm25_title")
            .function_type(FunctionType::Bm25)
            .add_input_field("title")
            .add_output_field("title_vector"),
    )
    .index(
        IndexParam::new()
            .index_name("title_vector_idx")
            .index_type(IndexType::SparseInvertedIndex),
    )
    .build()?;
client.add_function_field(request).await?;
```
