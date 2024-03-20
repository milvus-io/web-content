# FieldSchema

A __FieldSchema__ instance defines the data type and related attributes of a specific field in a collection.

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

__PARAMETERS:__

- __name__ (_string_) -

    __[REQUIRED]__

    Name of the field.

- __dtype__ (_[DataType](../../MilvusClient/Collections/DataType.md)_) -

    __[REQUIRED]__

    Data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use __DataType.INT64__ or __DataType.VARCHAR__.

    - Scalar fields: Choose from a variety of options, including __DataType.BOOL__, __DataType.INT8__, __DataType.INT16__, __DataType.INT32__, __DataType.INT64__, __DataType.FLOAT__, __DataType.DOUBLE__, __DataType.VARCHAR__, __DataType.JSON__, and __DataType.ARRAY__.

    - Vector fields: Select __DataType.BINARY_VECTOR__ or __DataType.FLOAT_VECTOR__.

- __description__ (_string_) -

    Description of the field.

- __kwargs__ -

    - __is_primary__ (_bool_)

        Whether the current field is the primary field.

        Setting this to __True__ makes the current field the primary field.

        As an alternative, you can set __primary_field__ when creating a __CollectionSchema__ object.

    - __auto_id__ (_bool_)

        Whether allows the primary field to automatically increment.

        Setting this to __True__ makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

        Set this parameter in the field with `is_primary` set to `True`.

    - __is_partition_key__ (_bool_) 

        Whether the current field serves as the partition key.

        Setting this to __True__ makes the current field serve as the partition key. In this case, Milvus manages all partitions in the current collection.

        <div class="admonition note">

        <p><b>what is a partition key?</b></p>

        <p>Once a field is designated as the partition key, Milvus automatically creates a partition for each unique value in this field and saves entities in these partitions accordingly.</p>
        <p>This is particularly useful when implementing data separation based on a specific key, such as partition-oriented multi-tenancy.</p>
        <p>As an alternative, you can set <strong>partition<em>key</em>field</strong> when creating a <strong>CollectionSchema</strong> object.</p>

        </div>

    - __max_length__ (_int_)

        The maximum number of characters a value should contain.

        This is required if __dtype__ of this field is to __DataType.VARCHAR__.

    - __dim__ (_int_)

        The number of dimensions a value should have.

        This is required if __dtype__ of this field is set to __DataType.FLOAT_VECTOR__.

__RETURN TYPE:__

_FieldSchema_

__RETURNS:__

A __FieldSchema__ object.

__Exceptions:__

- __AutoIDException__

    This exception will be raised if the value of the __auto_id__ parameter is not a boolean.

- __DataTypeNotSupportException__

    This exception will be raised if the value of the __dtype__ parameter is not supported.

- __PrimaryKeyException__

    This exception will be raised if 

    - The value of the __is_primary__ parameter is not a boolean, or

    - The __is_primary__ parameter is not set while the __auto_id__ parameter is set.

- __PartitionKeyException__

    This exception will be raised if the __is_partition_key__ parameter is set to a non-boolean value.

- __MilvusException__

    This exception will be raised when any error occurs during this operation.
