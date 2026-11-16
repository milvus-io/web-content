# Function

Definition of a collection function, such as a BM25 or text-embedding function that maps input fields to output fields.

```rust
pub struct Function
```

**PARAMETERS:**

- `id: i64`

    ID of the function, assigned by the server.

- `name: String`

    Name of the function.

- `description: String`

    Description of the function.

- `function_type: FunctionType`

    Type of the function. See [FunctionType](FunctionType.md).

- `input_fields: Vec<String>`

    Names of the input fields consumed by the function.

- `output_fields: Vec<String>`

    Names of the output fields produced by the function.

- `input_field_ids: Vec<i64>`

    IDs of the input fields, assigned by the server.

- `output_field_ids: Vec<i64>`

    IDs of the output fields, assigned by the server.

- `params: HashMap<String, String>`

    Function parameters, such as `enable_analyzer` for BM25.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` / `set_name(value)` / `get_name()` - Sets or returns the function name.
- `description(value)` / `set_description(value)` / `get_description()` - Sets or returns the description.
- `function_type(value)` / `set_function_type(value)` / `get_function_type()` - Sets or returns the function type.
- `input_fields(values)` / `set_input_fields(values)` / `get_input_fields()` - Sets or returns the input fields.
- `output_fields(values)` / `set_output_fields(values)` / `get_output_fields()` - Sets or returns the output fields.
- `get_id()` - Returns the function ID.
- `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the function parameters.
- `add_input_field(value)` - Adds one input field.
- `add_output_field(value)` - Adds one output field.
- `param(key, value)` - Sets one function parameter.

## Example

```rust
let function = Function::new()
    .name("bm25_title")
    .function_type(FunctionType::Bm25)
    .add_input_field("title")
    .add_output_field("title_vector")
    .param("enable_analyzer", "true");

let request = AddFunctionFieldRequest::builder()
    .collection_name("books")
    .field(
        FieldSchema::new()
            .name("title_vector")
            .data_type(DataType::SparseFloatVector),
    )
    .function(function)
    .build()?;
client.add_function_field(request).await?;
```
