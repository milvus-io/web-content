# add_field()

This operation adds a field to the schema of a struct element in an array of structs field.

## Request Syntax

```python
add_field(
    field_name: str,
    datatype: DataType
)
```

**PARAMETERS:**

- **field_name** (*string*) - 

    **[REQUIRED]**

    The name of the field.

- **datatype** (*[DataType](../Collections/DataType.md)*) - 

    **[REQUIRED]**

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields. For details, refer to [Array of Structs](https://milvus.io/docs/array-of-structs.md).

- **max_length** (*int*) -

    The maximum byte length for strings allowed to be inserted. Note that multibyte characters (e.g., Unicode characters) may occupy more than one byte each, so ensure the byte length of inserted strings does not exceed the specified limit. Value range: [1, 65,535].

    This is mandatory for a **DataType.VARCHAR** field.

- **dim** (*int*) -

    The dimension of the vector embeddings. The value should be an integer greater than 1.

- **mmap_enabled** (*bool*) -

    Whether Milvus maps the field data into memory instead of fully loading it. For details settings, refer to MMap-enabled Data Storage.

**RETURN TYPE:**

*[StructFieldSchema](StructFieldSchema.md)*

**RETURNS:**

A **StructFieldSchema** object contains the fields that have been added to the schema.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import DataType, FieldSchema, StructFieldSchema

schema = StructFieldSchema(
    name="struct_schema",
    fields=[vector, varchar]
)

# Add the vector field
schema.add_field(
    field_name="vector_02",
    datatype=DataType.FLOAT_VECTOR,
    dim=768
)

# Add a scalar field to the schema
schema.add_field(
    field_name="scalar_01",
    datatype=DataType.INT32
)
```
