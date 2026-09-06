# StructFieldSchema

A **StructFieldSchema** instance describes a struct-typed field that contains one or more child fields.

## Request Syntax

```python
StructFieldSchema(
    nullable: bool = False,
    description: str = "",
)
```

**PARAMETERS:**

- **nullable** (*bool*) -
Default: `False`
The flag that allows the struct field to contain null values.

- **description** (*str*) -
Default: `""`
The description of the struct field.

**RETURN TYPE:**

*StructFieldSchema*

**RETURNS:**

Struct field schema instance containing nested fields and nullable/default metadata.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates StructFieldSchema usage.

```python
from pymilvus import CollectionSchema, DataType, FieldSchema, StructFieldSchema

chunk = StructFieldSchema(nullable=True, description="Optional chunk metadata")
chunk.add_field("source", DataType.VARCHAR, max_length=128)

schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=3),
])
print(schema)
```
