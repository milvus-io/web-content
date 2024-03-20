# describe_collection()

This operation lists detailed information about a specific collection.

## Request Syntax

```python
describe_collection(
    collection_name: str, 
    **kwargs
) -> Name
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of an existing collection.

    Setting this to a non-existing collection results in __MilvusException__.

- __kwargs__ -

    - __timeout__ (_float _|_ None_)  

        The timeout duration for this operation. 

        Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_dict_

__RETURNS:__

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

__PARAMETERS:__

- __collection_name__ (_str_) -

    The name of the current collection.

- __auto_id__ (_bool_) -

    Whether Milvus automatically generates the primary key for the collection.

- __num_shards__ (_int_) -

    The number of shards the current collection has.

- __description__ (_str_)

    The description of the current collection.

- __fields__ (_list_)

    A list of fields in the current collection.

    - __field_id__ (_int_)

        The ID of the current field.

    - __name__ (_str_)

        The name of the current field.

    - __description__ (_str_)

        The description of the current field.

    - __type__ (_int_)

        The type of the current field. For details, refer to DataType.

    - __params__ (_dict_)

        Additional attributes of the current fields.

        - For __VARCHAR__ fields, __max_length__ (_int_) is a possible attribute, which determines the number of characters in the value of the current field.

        - For __FLOAT_VECTOR__ fields, __dim__ (_int_) is a possible attribute, which determines the number of vector embeddings in the value of the current field.

    - __element_type__ (_int_) 

        The data type of the elements in the field values. 

        This always equals __0__ if the current field is not an __ARRAY__ field.

    - __is_primary__ (_bool_)

        Whether the current field serves as the primary key of the collection.

- __aliases__ (_list_)      

    A list of collection aliases. You can use any alias in the list to use the current collection.  

- __collection_id__ (_int_)

    The ID of the current collection. Milvus allocates an ID for each collection while creating it.

- __consistency_level__ (_int_)

    The consistency level of the current collection. For details, refer to ConsistencyLevel.

- __properties__ (_dict_)

    Additional properties of the current collection. Possible keys in the dictionary include:

    - __collection.ttl.seconds__ (_int_)

        The time-to-live (TTL) of a collection in seconds.

- __num_partitions__ (_int_) 

    The number of partitions in the current collection. 

    - If the current collection has an enabled partition key, Milvus manages all created partitions for the collection. The number of partitions managed should match the number specified when the collection was created.

    - If the current collection does not enable the partition key, the number should match the number of partitions already created in this collection.

- __enable_dynamic_field__ (_bool_)

    Whether to use the reserved JSON field __$meta__ to save non-schema-defined fields and their values as key-value pairs.

__EXCEPTIONS:__

- __DescribeCollectionException__

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

- [create_collection()](./Collections/create_collection.md)

- [create_schema()](./Collections/create_schema.md)

- [drop_collection()](./Collections/drop_collection.md)

- [get_collection_stats()](./Collections/get_collection_stats.md)

- [has_collection()](./Collections/has_collection.md)

- [list_collections()](./Collections/list_collections.md)

- [rename_collection()](./Collections/rename_collection.md)

- [IndexType](./Collections/IndexType.md)

- [DataType](./Collections/DataType.md)

