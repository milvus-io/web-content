# Function

Server-side function attached to a collection schema, used for BM25, text-embedding, or reranking operations. The function-based rerankers used by search and hybrid-search reranking deref to `Function` (see [Related types](#related-types)).

```rust
pub struct Function
```

**PARAMETERS:**

- `id: i64`

    Server-assigned function ID. Populated when decoding a `describe_collection` response; cannot be set when building a create-collection request.

- `name: String`

    Name of the function.

- `description: String`

    Description of the function.

- `function_type: FunctionType`

    Type of the function. See [FunctionType](../FunctionType.md).

- `input_fields: Vec<String>`

    Names of the input fields.

- `output_fields: Vec<String>`

    Names of the output fields.

- `input_field_ids: Vec<i64>`

    Server-assigned input field IDs. Populated when decoding a `describe_collection` response; cannot be set when building a create-collection request.

- `output_field_ids: Vec<i64>`

    Server-assigned output field IDs. Populated when decoding a `describe_collection` response; cannot be set when building a create-collection request.

- `params: HashMap<String, String>`

    Function-specific parameters, such as the embedding model for a text-embedding function.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` / `set_name(value)` / `get_name()` - Sets or returns the name.
- `description(value)` / `set_description(value)` / `get_description()` - Sets or returns the description.
- `function_type(value)` / `set_function_type(value)` / `get_function_type()` - Sets or returns the function type.
- `input_fields(value)` / `set_input_fields(value)` / `get_input_fields()` - Sets or returns the input field names.
- `add_input_field(value)` - Appends an input field name.
- `output_fields(value)` / `set_output_fields(value)` / `get_output_fields()` - Sets or returns the output field names.
- `add_output_field(value)` - Appends an output field name.
- `get_input_field_ids()` - Returns the server-assigned input field IDs.
- `get_output_field_ids()` - Returns the server-assigned output field IDs.
- `get_id()` - Returns the server-assigned function ID.
- `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the params.
- `param(key, value)` - Sets one param.

## Related types

- [RRFRerank](RRFRerank.md)

- [WeightedRerank](WeightedRerank.md)

- [BoostRerank](BoostRerank.md)

- [DecayRerank](DecayRerank.md)

- [ModelRerank](ModelRerank.md)

## Example

```rust
let function = Function::new()
    .name("bm25_title")
    .function_type(FunctionType::Bm25)
    .input_fields(["title"])
    .output_fields(["title_vector"]);
```
