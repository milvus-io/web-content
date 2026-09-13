# CollectionSchema

A **CollectionSchema** instance represents the schema of a collection. A schema sketches the structure of a collection.

## Request Syntax

```python
CollectionSchema(
    fields: List[FieldSchema],
    description: str = "",
    struct_fields: Optional[List[StructFieldSchema]] = None,
    functions: Optional[List[Function]] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **fields** (*List[FieldSchema]*) -
**[REQUIRED]**
The field schemas in the collection.

- **description** (*str*) -
Default: `""`
The description of the collection.

- **struct_fields** (*Optional[List[StructFieldSchema]]*) -
Default: `None`
The optional struct-field schemas in the collection.

- **functions** (*Optional[List[Function]]*) -
Default: `None`
The optional function definitions attached to the collection schema.

- **kwargs** (*Any*) -
The additional collection options, including dynamic-field, namespace, key, auto-ID, and field-validation settings.

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

Collection schema instance containing the configured fields and collection-level properties.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates CollectionSchema usage.

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
