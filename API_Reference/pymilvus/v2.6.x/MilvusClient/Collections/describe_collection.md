# describe_collection()

This operation lists detailed information about a specific collection.

## Request Syntax

```python
describe_collection(
    collection_name: str, 
    **kwargs
) -> Name
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

    Setting this to a non-existing collection results in **MilvusException**.

- **kwargs** -

    - **timeout** (*float* | *None*)  

        The timeout duration for this operation. 

        Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary that contains detailed information about the specified collection.

```python
{
    'collection_name': 'test_01',
    'auto_id': False,
    'num_shards': 1,
    'description': '',
    'fields': [
          {
              'field_id': 100,
              'name': 'id',
              'description': '',
              'type': 5,
              'params': {},
              'element_type': 0,
              'is_primary': True
          },
          {
              'field_id': 101,
              'name': 'vector',
              'description': '',
              'type': 101,
              'params': {
                  'dim': 768
              },
              'element_type': 0
          }
     ],
     'functions': [],
     'aliases': [],
     'collection_id': 446738261026541332,
     'consistency_level': 2,
     'properties': {},
     'num_partitions': 1，
     'enable_dynamic_field': True,
     'created_timestamp': 461643298319106049,
     'update_timestamp': 461643298319106049
}
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the current collection.

- **auto_id** (*bool*) -

    Whether Milvus automatically generates the primary key for the collection.

- **num_shards** (*int*) -

    The number of shards the current collection has.

- **description** (*str*) -

    The description of the current collection.

- **fields** (*list*) -

    A list of fields in the current collection.

    - **field_id** (*int*) -

        The ID of the current field.

    - **name** (*str*) -

        The name of the current field.

    - **description** (*str*) -

        The description of the current field.

    - **type** (*int*) -

        The type of the current field. For details, refer to [DataType](DataType.md).

    - **params** (*dict*) -

        Additional attributes of the current fields.

        - For **VARCHAR** fields, **max_length** (*int*) is a possible attribute, which determines the number of characters in the value of the current field.

        - For vector fields, **dim** (*int*) is a possible attribute, which determines the number of vector embeddings in the value of the current field.

        - For **ARRAY** fields, **max_capacity** (*int*) is a possible attribute, which determines the maximum number of elements in the field of an entity.

        - For the fields that has mmap configured, **mmap_enabled** (*bool*) is a possible attribute, which specifies whether mmap is enabled or disabled for the current field.

    - **element_type** (*int*) -

        The data type of the elements in the field values. This is displayed if the current field is an ARRAY field.

    - **struct_fields** (*List&#91;Field&#93;*) -

        A list of fields added to the struct element in an array of structs field. For details on the possible field types, refer to [Array of Structs](https://milvus.io/docs/array-of-structs.md).

    - **is_primary** (*bool*) -

        Whether the current field serves as the primary key of the collection.

- **functions** (*list[[Function](../Function/Function.md)&#93;*) -

    The functions that have been defined in the schema.

- **aliases** (*list&#91;str&#93;*) -      

    A list of collection aliases. You can use any alias in the list to use the current collection.  

- **collection_id** (*int*) -

    The ID of the current collection. Milvus allocates an ID for each collection while creating it.

- **consistency_level** (*int*) -

    The consistency level of the current collection. For details, refer to ConsistencyLevel.

- **properties** (*dict*) -

    Additional properties of the current collection. Possible keys in the dictionary include:

    - **collection.ttl.seconds** (*int*) -

        The time-to-live (TTL) of a collection in seconds.

    - **collection.timezone** (*str*) -

        The timezone configured for the collection. The default value is UTC.

- **num_partitions** (*int*) -

    The number of partitions in the current collection. 

    - If the current collection has an enabled partition key, Milvus manages all created partitions for the collection. The number of partitions managed should match the number specified when the collection was created.

    - If the current collection does not enable the partition key, the number should match the number of partitions already created in this collection.

- **enable_dynamic_field** (*bool*) -

    Whether to use the reserved JSON field **&#36;meta** to save non-schema-defined fields and their values as key-value pairs.

- **created_timestamp** (*int*) -

    The timestamp at which the collection is created. The timestamp is generated by the timestamp oracle service (TSO) of Milvus.

- **updated_timestamp** (*int*) -

    The timestamp at which the collection has been updated. The timestamp is generated by the timestamp oracle service (TSO) of Milvus.

**EXCEPTIONS:**

- **DescribeCollectionException**

    This arises when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Describe the collection
client.describe_collection(collection_name="test_collection")

# Output
# {
#     'collection_name': 'test_collection',
#     'auto_id': False,
#     'num_shards': 1,
#     'description': '',
#     'fields': [
#           {
#               'field_id': 100,
#               'name': 'id',
#               'description': '',
#               'type': 5,
#               'params': {},
#               'element_type': 0,
#               'is_primary': True
#           },
#           {
#               'field_id': 101,
#               'name': 'vector',
#               'description': '',
#               'type': 101,
#               'params': {
#                   'dim': 5
#               },
#               'element_type': 0
#           }
#      ],
#      'functions': [],
#      'aliases': [],
#      'collection_id': 461639391399348915,
#      'consistency_level': 2,
#      'properties': {},
#      'num_partitions': 1,
#      'enable_dynamic_field': True,
#      'created_timestamp': 461643298319106049,
#      'updated_timestamp': 461643298319106049
# }
```

## Related methods

- create_collection()

- [create_schema()](create_schema.md)

- [drop_collection()](drop_collection.md)

- [get_collection_stats()](get_collection_stats.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

- IndexType

- DataType

