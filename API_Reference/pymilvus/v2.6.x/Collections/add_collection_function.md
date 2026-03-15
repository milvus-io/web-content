# add_collection_function()

This operation adds a new function to the collection. Functions allow you to define custom processing logic such as BM25 scoring or embedding generation.

## Request syntax

```python
client.add_collection_function(
    collection_name: str,
    function: Function,
    timeout: float = None,
    **kwargs
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **function** (*Function*) -

    **[REQUIRED]**

    The function schema to add. This is a `Function` object that defines the function name, type, input fields, output fields, and parameters.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **kwargs** (*dict*) -

    Optional additional parameters.

**RETURN TYPE:**

*NoneType*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, Function, FunctionType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

bm25_function = Function(
    name="bm25",
    function_type=FunctionType.BM25,
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
)

client.add_collection_function(
    collection_name="my_collection",
    function=bm25_function,
)
```
