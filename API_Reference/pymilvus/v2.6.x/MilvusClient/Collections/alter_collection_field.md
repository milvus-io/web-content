# alter_collection_field()

This operation changes the specified collection field parameters.

<div class="alert note">

This does not apply to external collections.

</div>

## Request Syntax

```python
alter_collection_field(
    collection_name: str, 
    field_name: str, 
    field_params: Dict,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **field_name** (*str*) -

    The name of the target field.

- **field_params** (*dict*) -

    The field parameters to change. The properties not mentioned remain unchanged. Possible parameters vary with the field type. 

    - **mmap_enabled** (*bool*) -

        Whether Milvus maps the field data into memory instead of fully loading it. For details, refer to MMap-enabled Data Storage.

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient, DataType

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection with a VARCHAR field
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_varchar", datatype=DataType.VARCHAR, max_length=1000)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
client.create_collection(collection_name="my_collection", schema=schema)

# 3. Alter the field parameters
field_params = {"max_length": 1500}

client.alter_collection_field(
    collection_name="my_collection", 
    field_name="my_varchar",
    field_params=field_params
)
```

