# Function

A `Function` instance for generating vector embeddings from user-provided raw data in Milvus.

```python
class pymilvus.Function
```

## Constructor

This constructor initializes a new `Function` instance designed to transform user's raw data into vector embeddings. This is achieved through an automated process that simplifies similarity search operations.

```python
Function(
    name: str,
    function_type: FunctionType,
    input_field_names: Union[str, List[str]],
    output_field_names: Union[str, List[str]],
    description: str = "",
)
```

**PARAMETERS:**

- `name` (*str*) -

    **[REQUIRED]**

    The name of the function. This identifier is used to reference the function within queries and collections.

- `function_type` (*FunctionType*) -

    **[REQUIRED]**

    The type of function for processing raw data. Possible values:

    - `FunctionType.BM25`: Uses the BM25 algorithm for generating sparse embeddings from a `VARCHAR` field.

- `input_field_names` (*Union[str, List[str]]*) -

    **[REQUIRED]**

    The name of the field containing the raw data that requires conversion to vector representation. For functions using `FunctionType.BM25`, this parameter accepts only one field name.

- `output_field_names` (*Union[str, List[str]]*) -

    **[REQUIRED]**

    The name of the field where the generated embeddings will be stored. This should correspond to a vector field defined in the collection schema. For functions using `FunctionType.BM25`, this parameter accepts only one field name.

- `description` (*str*) -

    **[OPTIONAL]**

    A brief description of the function's purpose. This can be useful for documentation or clarity in larger projects and defaults to an empty string.

**RETURN TYPE:**

Instance of `Function` that encapsulates the specific processing behavior for converting raw data to vector embeddings.

**RETURNS:**

A `Function` object that can be registered with a Milvus collection, facilitating automatic embedding generation during data insertion.

**EXCEPTIONS:**

- `UnknownFunctionType`

    This exception will be raised when an unsupported or unrecognized function type is specified.

- `FunctionIncorrectInputOutputType`

    This exception will be raised when one or more field names in `input_field_names` or `output_field_names` are not strings.

- `FunctionDuplicateInputs`

    This exception will be raised when there are duplicate field names in `input_field_names`.

- `FunctionDuplicateOutputs`

    This exception will be raised when there are duplicate field names in `output_field_names`.

- `FunctionCommonInputOutput`

    This exception will be raised when there is an overlap between `input_field_names` and `output_field_names`, meaning that the same field name is present in both.

## Examples

```python
from pymilvus import Function, FunctionType

bm25_function = Function(
    name="bm25_fn",
    input_field_names=["document_content"],
    output_field_names=["sparse_vector"],
    function_type=FunctionType.BM25,
)
```
