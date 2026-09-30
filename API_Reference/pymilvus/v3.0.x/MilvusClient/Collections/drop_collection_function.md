# drop_collection_function()

<div class="alert warning">

**Deprecated in PyMilvus v3.0.2 or later.**

This method is deprecated because Milvus 3.0 and later do not support dropping a function separately. Use [`drop_function_field()`](drop_function_field.md) instead, which also removes the function's output field and its index.

</div>

This operation drops an existing function from the collection.

<div class="alert note">

This does not apply to external collections.

</div>

## Request syntax

```python
client.drop_collection_function(
    collection_name: str,
    function_name: str,
    timeout: float = None,
    **kwargs
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **function_name** (*str*) -

    **[REQUIRED]**

    The name of the function to drop.

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
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.drop_collection_function(
    collection_name="my_collection",
    function_name="bm25",
)
```
