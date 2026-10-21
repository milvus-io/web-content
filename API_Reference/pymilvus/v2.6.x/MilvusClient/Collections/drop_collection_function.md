# drop_collection_function()

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

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, Function, FunctionType, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a collection with a BM25 function
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=512, enable_analyzer=True, enable_match=True)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_function(Function(name="bm25", function_type=FunctionType.BM25, input_field_names=["text"], output_field_names=["sparse_vector"]))
client.create_collection(collection_name="my_collection", schema=schema)

client.drop_collection_function(
    collection_name="my_collection",
    function_name="bm25",
)
```
