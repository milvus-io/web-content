# StructFieldSchema

A StructFieldSchema instance represents the schema of a struct element in an array of structs field. A schema sketches the structure of a struct element.

```python
class pymilvus.StructFieldSchema
```

## Constructor

Constructs the schema of a struct element in an array of structs field by defining fields, data types, and other parameters.

```python
CollectionSchema(
    fields: list,
    description: str
)
```

**PARAMETERS:**

- **name** (*str*) -

    **[REQUIRED]**

    The name of the schema. 

- **fields** (*list*) -

    **[REQUIRED]**

    A list of **FieldSchema** objects that define the fields in the schema of a struct in an array of structs field.

    <div class="admonition note">

    <p><b>what is a field schema?</b></p>

    <p>A field schema represents and contains metadata for a single field, while <strong>StructFieldSchema</strong> ties together a list of <strong>FieldSchema</strong> objects to define the schema of a struct in an array of structs field.</p>

    </div>

- **description** (*string*) -

    The description of the schema.

    If a description is not provided, it will be set to an empty string.

**RETURN TYPE:**

*StructFieldSchema*

**RETURNS:**

A **StructFieldSchema** object.

**EXCEPTIONS:**

- **FieldsTypeException**: 

    This exception will be raised when the **fields** parameter is not a list.

- **FieldTypeException**: 

    This exception will be raised when a field in the **fields** list is not a **FieldSchema** object.

```python
from pymilvus import StructFieldSchema, FieldSchema, DataType

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768
)

varchar = FieldSchema(
    name="varchar",
    dtype=DataType.VARCHAR,
    max_length=512
)

# Construct a schema with the predefined fields
schema = StructFieldSchema(
    name="struct_schema",
    fields=[vector, varchar],
    description="example_schema"
)
```

## Properties

- **fields** (*list*) -

    A list of **FieldSchema** objects that define the fields in the schema of a struct in an array of structs field.

- **description** (*string*) -

    The description of the schema.

    If a description is not provided, it will be an empty string.

## Methods

The following are the methods of the `StructFieldSchema` class:

