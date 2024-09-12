# add_field()

This operation adds a field to the schema of a collection.

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

- **datatype** (*[DataType](../../MilvusClient/Collections/DataType.md)*) - 

    **[REQUIRED]**

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.INT64** or **DataType.VARCHAR**.

    - Scalar fields: Choose from a variety of options, including 

        - **DataType.BOOL**,

        - **DataType.INT8**,

        - **DataType.INT16**,

        - **DataType.INT32**,

        - **DataType.INT64**,

        - **DataType.FLOAT**,

        - **DataType.DOUBLE**,

        - **DataType.BINARY_VECTOR**,

        - **DataType.FLOAT_VECTOR**,

        - **DataType.FLOAT16_VECTOR**,

        - **DataType.BFLOAT16_VECTOR**,

        - **DataType.VARCHAR**,

        - **DataType.JSON**, and

        - **DataType.ARRAY**

    - Vector fields: Select **DataType.BINARY_VECTOR**, **DataType.FLOAT_VECTOR**, **DataType.FLOAT16_VECTOR**, **DataType.BFLOAT16_VECTOR**, or **DataType.SPARSE_FLOAT_VECTOR**.

- **is_primary** (*bool*) -

    Whether the current field is the primary field in a collection.

    <div class="admonition note">

    <p><b>notes</b></p>

    <ul>
    <li><p>Each collection has only one primary field.</p></li>
    <li><p>A primary field should be of either the <strong>DataType.INT64</strong> type or the <strong>DataType.VARCHAR</strong> type.</p></li>
    </ul>

    </div>

- **max_length** (*int*) -

    The maximum length of the field value.

    This is mandatory for a **DataType.VARCHAR** field.

- **element_type** (*str*) -

    The data type of the elements in the field value.

    This is mandatory for a **DataType.ARRAY** field.

- **max_capacity** (*int*) -

    The number of elements in an Array field value.

    This is mandatory for a **DataType.ARRAY** field.

- **dim** (*int*) -

    The dimension of the vector embeddings. The value should be an integer greater than 1.

    This is mandatory for a field of the **DataType.FLOAT_VECTOR**, **DataType.BINARY_VECTOR**, **DataType.FLOAT16_VECTOR**, or **DataType.BFLOAT16_VECTOR** type. If you use **DataType.SPARSE_FLOAT_VECTOR**, omit this parameter.

- **is_partition_key** (*bool*) -

    Whether the current field serves as the partition key. Each collection can have one partition key.

    This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

    <div class="admonition note">

    <p><b>what is the partition key?</b></p>

    <p>To facilitate partition-oriented multi-tenancy, you can set a field as the partition key field so that Milvus hashes the field values and distributes entities among the specified number of partitions accordingly.</p>
    <p>When retrieving entities, ensure that the partition key field is used in the boolean expression to filter out entities of a specific field value.</p>
    <p>For details, refer to <a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">Use Partition Key</a> and <a href="https://milvus.io/docs/multi_tenancy.md">Multi-tenancy</a>.</p>

    </div>

- **is_clustering_key** (*bool*) -

    Whether the current field serves as the clustering key. Each collection can have one partition key. You can also use the partition key as the clustering key. For details, refer to Clustering Compaction.

- **mmap_enabled** (*bool*) -

    Whether Milvus maps the field data into memory instead of fully loading it. For details settings, refer to MMap-enabled Data Storage.

**RETURN TYPE:**

*[CollectionSchema](CollectionSchema.md)*

**RETURNS:**

A **CollectionSchema** object contains the fields that have been added to the schema.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import DataType, FieldSchema, CollectionSchema

schema = CollectionSchema(
    fields = [primary_key, vector]
)

# Add the primary key field
schema.add_field(
    field_name="id",
    datatype=DataType.INT64,
    is_primary=True
)

# Add the vector field
schema.add_field(
    field_name="vector",
    datatype=FLOAT_VECTOR,
    dim=768
)

# Add a scalar field to the schema
schema.add_field(
    field_name="scalar_01",
    datatype=DataType.INT32
)

# {
#     'auto_id': False, 
#     'description': '', 
#     'fields': [
#         {
#             'name': 'id', 
#             'description': '', 
#             'type': <DataType.INT64: 5>, 
#             'is_primary': True, 
#             'auto_id': False
#         }, 
#         {
#             'name': 'vector', 
#             'description': '', 
#             'type': <DataType.FLOAT_VECTOR: 101>, 
#             'params': {'dim': 768}
#        }, 
#        {
#             'name': 'scalar_01', 
#             'description': '', 
#             'type': <DataType.INT32: 4>
#        }
#     ]
# }
```

## Related operations

The following operations are related to `add_field()`:

- [FieldSchema](../FieldSchema/FieldSchema.md)

- [DataType](../../MilvusClient/Collections/DataType.md)

- [construct_from_dict()](construct_from_dict.md)

- [to_dict()](to_dict.md)

- [verify()](verify.md)

