# add_function()

This operation adds a function to convert raw data into vector representations.

## Request Syntax

```python
add_function(
   function: Function
)
```

**PARAMETERS:**

- `function` (*[Function](Function.md)*)

    **[REQUIRED]**

    An instance of the `Function` class that converts data into vector embeddings. This function will be added to the schema of a collection.

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

A `CollectionSchema` object

**EXCEPTIONS:**

- `FunctionIncorrectType`

    This exception will be raised when the `function` parameter is of the incorrect type.

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
```

