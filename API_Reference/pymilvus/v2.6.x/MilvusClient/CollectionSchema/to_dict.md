# to_dict()

This operation converts a CollectionSchema object to a dictionary representation.

## Request Syntax

```python
to_dict()
```

**PARAMETERS:**

None

**RETURN TYPE:**

*dict*

**RETURNS:**

The dictionary representation of the collection schema.

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

# Call to_dict() to get a dictionary representation of the schema 

schema_dict = schema.to_dict()  
print(schema_dict)

# Output
# {'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': <DataType.INT64: 5>, 'is_primary': True, 'auto_id': False}, {'name': 'vector', 'description': '', 'type': <DataType.FLOAT_VECTOR: 101>, 'params': {'dim': 768}}]}
```

## Related operations

The following operations are related to `to_dict()`:

- [FieldSchema](../../ORM/FieldSchema/FieldSchema.md)

- [DataType](../Collections/DataType.md)

- [add_field()](add_field_1.md)

- [construct_from_dict()](construct_from_dict_1.md)

- [verify()](verify_1.md)

