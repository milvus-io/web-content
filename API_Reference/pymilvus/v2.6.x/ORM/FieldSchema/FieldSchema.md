# FieldSchema

A **FieldSchema** instance defines the data type and related attributes of a specific field in a collection.

```python
class pymilvus.FieldSchema
```

## Constructor

Constructs the schema of a field by defining the field name, data type, and other parameters.

```python
FieldSchema(
    name: str,
    dtype: DataType,
    **kwargs,
)
```

**PARAMETERS:**

- **name** (*string*) -

    **[REQUIRED]**

    Name of the field.

- **dtype** (*[DataType](../../MilvusClient/Collections/DataType.md)*) -

    **[REQUIRED]**

    Data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.INT64** or **DataType.VARCHAR**.

    - Scalar fields: Choose from a variety of options, including **DataType.BOOL**, **DataType.INT8**, **DataType.INT16**, **DataType.INT32**, **DataType.INT64**, **DataType.FLOAT**, **DataType.DOUBLE**, **DataType.VARCHAR**, **DataType.JSON**, and **DataType.ARRAY**.

    - Vector fields: Select **DataType.BINARY_VECTOR** or **DataType.FLOAT_VECTOR**.

- **description** (*string*) -

    Description of the field.

- **kwargs** -

    - **is_primary** (*bool*)

        Whether the current field is the primary field.

        Setting this to **True** makes the current field the primary field.

        As an alternative, you can set **primary_field** when creating a **CollectionSchema** object.

    - **auto_id** (*bool*)

        Whether allows the primary field to automatically increment.

        Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

        Set this parameter in the field with `is_primary` set to `True`.

    - **is_partition_key** (*bool*) 

        Whether the current field serves as the partition key.

        Setting this to **True** makes the current field serve as the partition key. In this case, Milvus manages all partitions in the current collection.

        <div class="admonition note">

        <p><b>what is a partition key?</b></p>

        <p>Once a field is designated as the partition key, Milvus automatically creates a partition for each unique value in this field and saves entities in these partitions accordingly.</p>
        <p>This is particularly useful when implementing data separation based on a specific key, such as partition-oriented multi-tenancy.</p>
        <p>As an alternative, you can set <strong>partition<em>key</em>field</strong> when creating a <strong>CollectionSchema</strong> object.</p>

        </div>

    - **max_length** (*int*)

        The maximum number of characters a value should contain.

        This is required if **dtype** of this field is to **DataType.VARCHAR**.

    - **dim** (*int*)

        The number of dimensions a value should have.

        This is required if **dtype** of this field is set to **DataType.FLOAT_VECTOR**.

**RETURN TYPE:**

*FieldSchema*

**RETURNS:**

A **FieldSchema** object.

**Exceptions:**

- **AutoIDException**

    This exception will be raised if the value of the **auto_id** parameter is not a boolean.

- **DataTypeNotSupportException**

    This exception will be raised if the value of the **dtype** parameter is not supported.

- **PrimaryKeyException**

    This exception will be raised if 

    - The value of the **is_primary** parameter is not a boolean, or

    - The **is_primary** parameter is not set while the **auto_id** parameter is set.

- **PartitionKeyException**

    This exception will be raised if the **is_partition_key** parameter is set to a non-boolean value.

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Methods

The following are the methods of the `FieldSchema` class: