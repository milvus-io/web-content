# create_schema()

This operation creates a collection schema.

## Request syntax

```python
MilvusClient.create_schema(**kwargs) -> CollectionSchema
```

<div class="admonition note">

<p><b>notes</b></p>

<p>This is a class method. You should call this method like this: <code>MilvusClient.create_schema()</code>.</p>

</div>

**PARAMETERS:**

- **kwargs** -

    - **auto_id** (*bool*)

        Whether allows the primary field to automatically increment.

        Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    - **enable_dynamic_field** (*bool*)

        Whether allows Milvus saves the values of undefined fields in a dynamic field if the data being inserted into the target collection includes fields that are not defined in the collection's schema.

        When you set this to **True**, Milvus  will create a field called **$meta** to store any undefined fields and their values from the data that is inserted.

        <div class="admonition note">

        <p><b>what is a dynamic field?</b></p>

        <p>If the data being inserted into the target collection includes fields that are not defined in the collection's schema, those fields will be saved in a reserved dynamic field named <strong>$meta</strong> as key-value pairs.</p>

        </div>

    - **primary_field** (*str*)

        The name of the primary field.

    - **partition_key_field** (*str*)

        The name of the field that serves as the partition key.

        Setting this makes Milvus manage all partitions in the current collection.

        This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

        <div class="admonition note">

        <p><b>what is a partition key?</b></p>

        <p>Once a field is designated as the partition key, Milvus calculates a hash based on the partition key value of each inserted entity and saves entities in the partitions of the target collection accordingly.</p>
        <p>This is particularly useful when implementing data separation based on a specific key, such as partition-oriented multi-tenancy.</p>

        </div>

**RETURN TYPE:**

*[CollectionSchema](../../ORM/CollectionSchema/CollectionSchema.md)*

**RETURNS:**

A **[CollectionSchema](../../ORM/CollectionSchema/CollectionSchema.md)** object.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient, DataType

# 1. Create a schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=False,
)

# 2. Add fields to schema
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)

# {
#     'auto_id': False, 
#     'description': '', 
#     'fields': [
#         {
#             'name': 'my_id', 
#             'description': '', 
#             'type': <DataType.INT64: 5>, 
#             'is_primary': True, 
#             'auto_id': False
#         }
#     ]
# }

schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# {
#     'auto_id': False, 
#     'description': '', 
#     'fields': [
#         {
#             'name': 'my_id', 
#             'description': '', 
#             'type': <DataType.INT64: 5>, 
#             'is_primary': True, 
#             'auto_id': False
#         }, 
#         {
#             'name': 'my_vector', 
#             'description': '', 
#             'type': <DataType.FLOAT_VECTOR: 101>, 
#             'params': {
#                 'dim': 5
#             }
#         }        
#     ]
# }
```

## Related methods

- [create_collection()](create_collection.md)

- [describe_collection()](describe_collection.md)

- [drop_collection()](drop_collection.md)

- [get_collection_stats()](get_collection_stats.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

- [IndexType](IndexType.md)

- [DataType](DataType.md)

