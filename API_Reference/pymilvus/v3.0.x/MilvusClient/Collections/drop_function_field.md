# drop_function_field()

This operation drops a function and its output field from a collection. The output field and its index are removed together with the function.

<div class="alert note">

This does not apply to external collections.

</div>

## Request syntax

```python
client.drop_function_field(
    collection_name: str,
    function_name: str,
    timeout: Optional[float] = None
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

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

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

client.drop_function_field(
    collection_name="my_collection",
    function_name="bm25",
)
```

## Related methods

- [add_function_field()](add_function_field.md)

- [alter_collection_function()](alter_collection_function.md)
