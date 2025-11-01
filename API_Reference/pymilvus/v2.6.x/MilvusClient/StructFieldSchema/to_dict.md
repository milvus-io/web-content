# to_dict()

This operation converts a **StructFieldSchema** object to a dictionary representation.

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
from pymilvus import StructFieldSchema, FieldSchema, DataType  

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768,
)

varchar = FieldSchema(
    name="varchar",
    dtype=DataType.VARCHAR,
    max_length=512
)

# Create a StructFieldSchema with field schemas

schema = StructFieldSchema(
    name="struct_schema",
    fields = [vector, varchar]
)

# Call to_dict() to get a dictionary representation of the schema 

schema_dict = schema.to_dict()  
```
