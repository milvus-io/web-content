# CollectionSchema

A **CollectionSchema** instance represents the schema of a collection. A schema sketches the structure of a collection.

```python
class pymilvus.CollectionSchema
```

## Constructor

Constructs the schema of a collection by defining fields, data types, and other parameters.

```python
CollectionSchema(
    fields: list,
    description: str
)
```

**PARAMETERS:**

- **fields** (*list*) -

    **[REQUIRED]**

    A list of **FieldSchema** objects that define the fields in the collection schema.

    <div class="admonition note">

    <p><b>what is a field schema?</b></p>

    <p>A field schema represents and contains metadata for a single field, while <strong>CollectionSchema</strong> ties together a list of FieldSchema objects to define the full schema.</p>

    </div>

- **description** (*string*) -

    The description of the schema.

    If a description is not provided, it will be set to an empty string.

- **kwargs** -

    - **auto_id** (*bool*)

        Whether allows the primary field to automatically increment.

        Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    - **enable_dynamic_field** (*bool*)

        Whether allows Milvus saves the values of undefined fields in a dynamic field if the data being inserted into the target collection includes fields that are not defined in the collection's schema.

        When you set this to **True**, Milvus and  will create a field called **$meta** to store any undefined fields and their values from the data that is inserted.

        <div class="admonition note">

        <p><b>what is a dynamic field?</b></p>

        <p>If the data being inserted into the target collection includes fields that are not defined in the collection's schema, those fields will be saved in a dynamic field as key-value pairs.</p>

        </div>

    - **primary_field** (*str*)

        The name of the primary field.

        The value should be the name of a field listed in **fields**.

        As an alternative, you can set **is_primary** when creating a **FieldSchema** object.

    - **partition_key_field** (*str*)

        The name of the field that serves as the partition key.

        The value should be the name of a field listed in **fields**.

        Setting this makes Milvus manage all partitions in the current collection.

        As an alternative, you can set **is_partition_key** when creating a **FieldSchema** object.

        <div class="admonition note">

        <p><b>what is a partition key?</b></p>

        <p>Once a field is designated as the partition key, Milvus automatically creates a partition for each unique value in this field and saves entities in these partitions accordingly.</p>
        <p>This is particularly useful when implementing data separation based on a specific key, such as partition-oriented multi-tenancy.</p>
        <p>As an alternative, you can set <strong>partition<em>key</em>field</strong> when creating a <strong>CollectionSchema</strong> object.</p>

        </div>

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

A **CollectionSchema** object.

**EXCEPTIONS:**

- **FieldsTypeException**: 

    This exception will be raised when the **fields** parameter is not a list.

- **FieldTypeException**: 

    This exception will be raised when a field in the **fields** list is not a **FieldSchema** object.

- **PrimaryKeyException:**

    This exception will be raised if

    - The **primary_field** parameter has been set but the value is not a string.

    - The **primary_field** parameter has been set but the value is not the name of any listed fields.

- **PartitionKeyException:**

    This exception will be raised if 

    - The **partition_key_field** parameter has been set but the value is not a string.

    - The **partition_key_field** parameter has been set but the value is not the name of any listed fields.

- **AutoIDException:**

    - This exception will be raised if the **auto_id** parameter has been set but the value is not a boolean.

## Examples

```python
from pymilvus import CollectionSchema, FieldSchema, DataType

# Define fields in a schema
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

# Construct a schema with the predefined fields
schema = CollectionSchema(
    fields=[primary_key, vector],
    description="example_schema"
)
```

## Methods

The following are the methods of the `CollectionSchema` class:

