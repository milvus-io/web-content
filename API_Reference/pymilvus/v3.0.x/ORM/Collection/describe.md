# describe()

This operation describes the current collection.

## Request Syntax

```python
describe(timeout: float | None)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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
     'num_partitions': 1
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

        - For VARCHAR fields, **max_length** (*int*) is a possible attribute, which determines the number of characters in the value of the current field.

        - For FLOAT_VECTOR fields, **dim** (*int*) is a possible attribute, which determines the number of vector embeddings in the value of the current field.

    - **element_type** (*int*)

    - **is_primary** (*bool*)

        Whether the current field serves as the primary key of the collection.

- **aliases** (*list*)      

    A list of collection aliases. You can use any alias in the list to use the current collection.  

- **collection_id** (*int*)

    The ID of the current collection. Milvus allocates an ID for each collection while creating it.

- **consistency_level** (*int*)

    The consistency level of the current collection. For details, refer to ConsistencyLevel.

- **properties** (*dict*)

- **num_partitions** (*int*) 

    The number of partitions in the current collection.

**EXCEPTIONS:**

- **DescribeCollectionException**

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

- [drop()](drop.md)

- [flush()](flush.md)

- [get_replicas()](get_replicas.md)

- [set_properties()](set_properties.md)

