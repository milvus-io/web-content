# add_collection_struct_field()

This operation adds a new nullable struct field to an existing collection.

<div class="alert note">

Adding a struct field to an existing collection requires **nullable** to be set to **True**, because existing entities do not have values for the new field.

</div>

## Request syntax

```python
client.add_collection_struct_field(
    collection_name: str,
    field_name: str,
    struct_schema: StructFieldSchema,
    max_capacity: int,
    desc: Optional[str] = None,
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **field_name** (*str*) -

    **[REQUIRED]**

    The name of the new struct field.

- **struct_schema** (*[StructFieldSchema](StructFieldSchema/StructFieldSchema.md)*) -

    **[REQUIRED]**

    The schema of the struct field to add. Its **name** is overridden by **field_name**.

- **max_capacity** (*int*) -

    **[REQUIRED]**

    The maximum number of elements that the struct field can hold.

- **desc** (*Optional[str]*) -

    A brief description of the field.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **ParamError**

    Raised when **struct_schema** is not a `StructFieldSchema` instance or when **nullable** is not set to **True**.

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, DataType, StructFieldSchema

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# The target collection must exist first
client.create_collection(
    collection_name="my_collection",
    dimension=5,
)

# Build the struct field schema
struct_schema = StructFieldSchema(nullable=True)
struct_schema.add_field("name", DataType.VARCHAR, max_length=64)
struct_schema.add_field("age", DataType.INT32)

client.add_collection_struct_field(
    collection_name="my_collection",
    field_name="profile",
    struct_schema=struct_schema,
    max_capacity=10,
)
```

## Related methods

- [add_collection_field()](add_collection_field.md)

- [drop_collection_field()](drop_collection_field.md)

- [create_schema()](create_schema.md)
