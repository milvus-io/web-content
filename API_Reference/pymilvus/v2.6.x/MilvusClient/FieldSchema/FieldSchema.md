# FieldSchema

Defines the name, data type, and field-specific options used in a collection schema.

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

- **dtype** (*[DataType](../Collections/DataType.md)*) -
**[REQUIRED]**
Data type of the field.

- **description** (*str*) -
Default: `""`
Description of the field.

- **kwargs** (*Any*) -
Additional field options.

    - **is_primary** (*bool*) -
Whether the field is the collection primary key.

    - **auto_id** (*bool*) -
Whether Milvus automatically generates primary-key values.

    - **nullable** (*bool*) -
Whether the field can contain null values.

    - **default_value** (*Any*) -
Default value used when the field value is omitted.

    - **dim** (*int*) -
Dimension of a dense vector field.

    - **max_length** (*int*) -
Maximum length of a VARCHAR field.

    - **element_type** (*[DataType](../Collections/DataType.md)*) -
Data type of elements in an ARRAY field.

    - **is_partition_key** (*bool*) -
Whether the field is the partition key.

    - **is_clustering_key** (*bool*) -
Whether the field is the clustering key.

**RETURN TYPE:**

*FieldSchema*

**RETURNS:**

Field schema instance containing the configured data type, constraints, default, and nullable metadata.

**EXCEPTIONS:**

- **DataTypeNotSupportException**
Raised when `dtype` is not a supported `DataType` value. Use a supported PyMilvus data type.

- **PrimaryKeyException**
Raised when primary-key or auto-ID options are invalid. Check the `is_primary` and `auto_id` option types and combinations.

- **PartitionKeyException**
Raised when `is_partition_key` is not a Boolean value. Pass `True` or `False` for the partition-key option.

- **ClusteringKeyException**
Raised when `is_clustering_key` is not a Boolean value. Pass `True` or `False` for the clustering-key option.

- **ParamError**
Raised when a field option or default value is invalid. Check the options required by the selected data type.

## Examples

```python
from pymilvus import CollectionSchema, DataType, FieldSchema

schema = CollectionSchema(
    fields=[
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
        FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=3),
    ]
)
print(schema)
```
