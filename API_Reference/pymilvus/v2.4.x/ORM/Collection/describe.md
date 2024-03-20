# describe()

This operation describes the current collection.

## Request Syntax

```python
describe(timeout: float | None)
```

__PARAMETERS:__

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

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
     'num_partitions': 1
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

        - For VARCHAR fields, __max_length__ (_int_) is a possible attribute, which determines the number of characters in the value of the current field.

        - For FLOAT_VECTOR fields, __dim__ (_int_) is a possible attribute, which determines the number of vector embeddings in the value of the current field.

    - __element_type__ (_int_)

    - __is_primary__ (_bool_)

        Whether the current field serves as the primary key of the collection.

- __aliases__ (_list_)      

    A list of collection aliases. You can use any alias in the list to use the current collection.  

- __collection_id__ (_int_)

    The ID of the current collection. Milvus allocates an ID for each collection while creating it.

- __consistency_level__ (_int_)

    The consistency level of the current collection. For details, refer to ConsistencyLevel.

- __properties__ (_dict_)

- __num_partitions__ (_int_) 

    The number of partitions in the current collection.

__EXCEPTIONS:__

- __DescribeCollectionException__

    This arises when any error occurs during this operation.

## Example

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Get detailed information about the collection
collection.describe()

# Output
# {
#     'collection_name': 'test_01',
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
#                   'dim': 768
#               },
#               'element_type': 0
#           }
#      ],
#      'aliases': [],
#      'collection_id': 446738261026541332,
#      'consistency_level': 2,
#      'properties': {},
#      'num_partitions': 1
# }
```

## Related operations

- [drop()](./drop.md)

- [flush()](./flush.md)

- [get_replicas()](./get_replicas.md)

- [set_properties()](./set_properties.md)

