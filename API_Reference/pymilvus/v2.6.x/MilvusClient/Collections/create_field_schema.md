# create_field_schema()

This operation creates a field schema. It wraps [FieldSchema](../FieldSchema/FieldSchema.md).

## Request syntax

```python
MilvusClient.create_field_schema(
    name: str,
    data_type: DataType,
    desc: str = "",
    **kwargs
) -> FieldSchema
```

<div class="alert note">

This is a class method. You should call this method like this: `MilvusClient.create_field_schema()`.

</div>

**PARAMETERS:**

- **name** (*str*) -

    **[REQUIRED]**

    The name of the field.

- **data_type** (*[DataType](DataType.md)*) -

    **[REQUIRED]**

    The data type of the field.

- **desc** (*str*) -

    The description of the field.

- **kwargs** (*dict*) -

    Additional keyword arguments forwarded to the underlying `FieldSchema`, such as **is_primary** for the primary key, **auto_id** for automatic ID generation, **dim** for vector fields, and **max_length** for VARCHAR fields.

**RETURN TYPE:**

*[FieldSchema](../FieldSchema/FieldSchema.md)*

**RETURNS:**

The created field schema.

## Example

```python
from pymilvus import MilvusClient, DataType

field = MilvusClient.create_field_schema(
    name="id",
    data_type=DataType.INT64,
    is_primary=True,
)
```

## Related methods

- [create_schema()](create_schema.md)

- [create_struct_field_schema()](create_struct_field_schema.md)
