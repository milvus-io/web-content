# create_struct_field_schema()

This operation creates a struct field schema.

## Request Syntax

```python
MilvusClient.create_struct_field_schema(**kwargs) -> StructFieldSchema
```

<div class="alert note">

This is a class method. You should call this method like this: `MilvusClient.create_struct_field_schema()`.

</div>

**PARAMETERS:**

- **nullable** (*bool*) -

    Whether null values are allowed for the struct field. The value defaults to **False**.

- **description** (*str*) -

    The description of the struct field. The value defaults to an empty string.

**RETURN TYPE:**

*[StructFieldSchema](StructFieldSchema/StructFieldSchema.md)*

**RETURNS:**

The created struct field schema.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

struct_schema = MilvusClient.create_struct_field_schema()
```
