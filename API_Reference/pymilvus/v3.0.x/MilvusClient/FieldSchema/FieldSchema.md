# FieldSchema

Defines a field's name, data type, description, and additional schema options.

## Request Syntax

```python
FieldSchema(
    name: str,
    dtype: DataType,
    description: str = "",
    **kwargs
)
```

**PARAMETERS:**

- **name** (*str*) -
**[REQUIRED]**
Name of the field.

- **dtype** ([DataType](../Collections/DataType.md)) -
**[REQUIRED]**
Data type of the field.

- **description** (*str*) -
Default: `""`
Description of the field.

- **kwargs** (*Any*) -
Additional field options.

**RETURN TYPE:**

*FieldSchema*

**RETURNS:**

Field schema instance containing the configured data type, constraints, default, and nullable metadata.

**EXCEPTIONS:**

- **MilvusException**
Raised when supplied field options are invalid. Inspect the exception message for the invalid data type or field constraint.

## Examples

Creates field definitions for a collection schema.

```python
from pymilvus import CollectionSchema, DataType, FieldSchema

schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=3),
])
print(schema)
```
