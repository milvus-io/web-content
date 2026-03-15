# construct_from_dict()

This operation constructs a **StructFieldSchema** object from a dictionary representation.

## Request Syntax

```python
construct_from_dict(
    raw: dict
)
```

**PARAMETERS:**

- **raw** (*dict*)

    A dictionary containing the raw data to construct the schema of a struct element in an array of structs field

**RETURN TYPE:**

*StructFieldSchema*

**RETURNS:**

A **StructFieldSchema** object.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import DataType, FieldSchema, StructFieldSchema

vector = FieldSchema(
    name="vector_02",
    dtype=DataType.FLOAT_VECTOR,
    dim=768,
)

varchar = FieldSchema(
    name="varchar_02",
    dtype=DataType.VARCHAR,
    max_length=512
)

# Create dictionary representation 
schema_dict = {
    "fields": [     
        vector.to_dict(),
        varchar.to_dict()                
    ]
}  

# Reconstruct schema from dictionary 
schema = StructFieldSchema(name="struct_schema", fields=[vector]).construct_from_dict(schema_dict)  

print(schema)

# Output
# {'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': <DataType.INT64: 5>, 'is_primary': True, 'auto_id': False}, {'name': 'vector', 'description': '', 'type': <DataType.FLOAT_VECTOR: 101>, 'params': {'dim': 768}}]}
```
