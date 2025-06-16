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

    **[REQUIRED]**

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
     'aliases': [],
     'collection_id': 446738261026541332,
     'consistency_level': 2,
     'properties': {},
     'num_partitions': 1，
     'enable_dynamic_field': True
}
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the current collection.

- **auto_id** (*bool*) -

    Whether Milvus automatically generates the primary key for the collection.

- **num_shards** (*int*) -

    The number of shards the current collection has.

- **description** (*str*)

    The description of the current collection.

- **fields** (*list*)

    A list of fields in the current collection.

    - **field_id** (*int*)

        The ID of the current field.

    - **name** (*str*)

        The name of the current field.

    - **description** (*str*)

        The description of the current field.

    - **type** (*int*)

        The type of the current field. For details, refer to DataType.

    - **params** (*dict*)

        Additional attributes of the current fields.

        - For **VARCHAR** fields, **max_length** (*int*) is a possible attribute, which determines the number of characters in the value of the current field.

        - For **FLOAT_VECTOR** fields, **dim** (*int*) is a possible attribute, which determines the number of vector embeddings in the value of the current field.

    - **element_type** (*int*) 

        The data type of the elements in the field values. 

        This always equals **0** if the current field is not an **ARRAY** field.

    - **is_primary** (*bool*)

        Whether the current field serves as the primary key of the collection.

- **aliases** (*list*)      

    A list of collection aliases. You can use any alias in the list to use the current collection.  

- **collection_id** (*int*)

    The ID of the current collection. Milvus allocates an ID for each collection while creating it.

- **consistency_level** (*int*)

    The consistency level of the current collection. For details, refer to ConsistencyLevel.

- **properties** (*dict*)

    Additional properties of the current collection. Possible keys in the dictionary include:

    - **collection.ttl.seconds** (*int*)

        The time-to-live (TTL) of a collection in seconds.

- **num_partitions** (*int*) 

    The number of partitions in the current collection. 

    - If the current collection has an enabled partition key, Milvus manages all created partitions for the collection. The number of partitions managed should match the number specified when the collection was created.

    - If the current collection does not enable the partition key, the number should match the number of partitions already created in this collection.

- **enable_dynamic_field** (*bool*)

    Whether to use the reserved JSON field **$meta** to save non-schema-defined fields and their values as key-value pairs.

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
#      'aliases': [],
#      'collection_id': 446738261026541332,
#      'consistency_level': 2,
#      'properties': {},
#      'num_partitions': 1,
#      'enable_dynamic_field': True
# }
```

## Related methods

- [create_collection()](create_collection.md)

- [create_schema()](create_schema.md)

- [drop_collection()](drop_collection.md)

- [get_collection_stats()](get_collection_stats.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

- [IndexType](IndexType.md)

- [DataType](DataType.md)

