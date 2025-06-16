# verify()

This operation performs final validation checks on the CollectionSchema to detect any obvious problems.

## Request Syntax

```python
verify()
```

**PARAMETERS:**

None

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import CollectionSchema, FieldSchema, DataType  

# Create field schemas
primary_key = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
)

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768,
)

# Create a CollectionSchema with field schemas

schema = CollectionSchema(
    fields = [primary_key, vector]
)

# Call verify() to validate the schema 
schema.verify()
```

## Related operations

The following operations are related to `verify()`:

- [FieldSchema](../../ORM/FieldSchema/FieldSchema.md)

- [DataType](../Collections/DataType.md)

- [add_field()](add_field_1.md)

- [construct_from_dict()](construct_from_dict_1.md)

- [to_dict()](to_dict_1.md)

