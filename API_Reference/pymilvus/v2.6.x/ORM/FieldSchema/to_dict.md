# to_dict()

This operation converts a FieldSchema object to a dictionary representation.

## Request Syntax

```python
to_dict()
```

**PARAMETERS:**

None

**RETURN TYPE:**

*dict*

**RETURNS:**

The dictionary representation of the field schema.

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
    dim=768
)

# Get dictionary representation
primary_key_dict = primary_key.to_dict()
vector_dict = vector.to_dict()

print(primary_key_dict)
print(vector_dict)

# Output
# {'name': 'id', 'description': '', 'type': <DataType.INT64: 5>, 'is_primary': True, 'auto_id': False}
# {'name': 'vector', 'description': '', 'type': <DataType.FLOAT_VECTOR: 101>, 'params': {'dim': 768}}
```

## Related operations

The following operations are related to `to_dict()`:

- [construct_from_dict()](construct_from_dict.md)

