# create_struct_field_schema()

This operation creates a struct field schema.

## Request syntax

```python
MilvusClient.create_struct_field_schema() -> StructFieldSchema
```

<div class="alert note">

This is a class method. You should call this method like this: `MilvusClient.create_struct_field_schema()`.

</div>

**PARAMETERS:**

This operation has no parameters.

**RETURN TYPE:**

*[StructFieldSchema](../StructFieldSchema/StructFieldSchema.md)*

**RETURNS:**

The created struct field schema.

## Example

```python
from pymilvus import MilvusClient

struct_schema = MilvusClient.create_struct_field_schema()
```

## Related methods

- [create_schema()](create_schema.md)

- [create_field_schema()](create_field_schema.md)
