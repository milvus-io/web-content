# CollectionSchema

Updates schema constructor and metadata behavior. Class property behavior changed. Class property behavior changed. Class property behavior changed.

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

- **fields** (*List[[FieldSchema](../FieldSchema/FieldSchema.md)]*) -
**[REQUIRED]**
The field schemas in the collection.

- **description** (*str*) -
Default: `""`
The description of the collection.

- **struct_fields** (*Optional[List[[StructFieldSchema](../StructFieldSchema/StructFieldSchema.md)]]*) -
Default: `None`
The optional struct-field schemas in the collection.

- **functions** (*Optional[List[[Function](../Function/Function.md)]]*) -
Default: `None`
The optional function definitions attached to the collection schema.

- **kwargs** (*Any*) -
The additional collection options, including dynamic-field, namespace, key, auto-ID, and field-validation settings.

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

[Collection](../../../ORM/Collection/Collection.md) schema instance containing the configured fields and collection-level properties.

**EXCEPTIONS:**

- **[MilvusException](../../../Exceptions/MilvusException.md)**
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
