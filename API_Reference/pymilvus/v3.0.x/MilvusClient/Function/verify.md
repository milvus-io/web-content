# verify()

This operation validates the input and output fields of a function defined in the CollectionSchema.

## Request Syntax

```python
verify(
    schema: CollectionSchema
)
```

**PARAMETERS:**

None

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

- `MilvusException`

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient, Function, FunctionType

schema = MilvusClient.create_schema()

bm25_function = Function(
    name="bm25_fn",
    input_field_names=["document_content"],
    output_field_names="sparse_vector",
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)

# Verify the function
bm25_function.verify(schema)
```
