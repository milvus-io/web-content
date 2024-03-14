
# describe_index()

This operation describes a specific index.

## Request syntax

```python
describe_index(
    collection_name: str,
    index_name: str,
    timeout: Optional[float] = None
) - Dict
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of an existing collection.

    Setting this to a non-existing collection results in __MilvusException__.

- __index_name__ (_str_) -

    __[REQUIRED]__

    The name of the index to describe.

    Setting this to a non-existing collection results in __MilvusException__.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE: __

_Dict_

__RETURNS:__

A dictionary that contains the details of the specified index.

```python
{
    'index_type': 'IVF_FLAT',
    'metric_type': 'IP',
    'field_name': 'my_vector',
    'index_name': 'my_vector'
}
```

__PARAMETERS:__

- __index_type__ (_str_) -

    The algorithm that is used to build the index. 

    For details, refer to [In-memory Index](https://milvus.io/docs/index.md), [On-disk Index](https://milvus.io/docs/disk_index.md) and [Scalar Index](https://milvus.io/docs/scalar_index.md).

- __metric_type__ (_str_) -

    The algorithm that is used to measure similarity between vectors. Possible values are __IP__, __L2__, and __COSINE__.

    This is available only when the specified field is a vector field. 

- __field_name__ (_str_) -

    The name of the field on which the index has been created.

- __index_name__ (_str_) -

    The name of the created index.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 1. Create schema
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

# 3. Create index parameters
index_params = client.prepare_index_params()

# 4. Add indexes
# - For a scalar field
index_params.add_index(
    field_name="my_id",
    index_type="STL_SORT"
)

# - For a vector field
index_params.add_index(
    field_name="my_vector", 
    index_type="IVF_FLAT",
    metric_type="L2",
    params={"nlist": 1024}
)

# 5. Create a collection
client.create_collection(
    collection_name="customized_setup",
    schema=schema
)

# 6. Create indexes
client.create_index(
    collection_name="customized_setup",
    index_params=index_params
)

# 6. List indexes
client.list_indexes(collection_name="customized_setup")

# ['my_id', 'my_vector']

# 7. Describe the indexes
client.describe_index(
    collection_name="customized_setup",
    index_name="my_vector"
)

# {
#     'nlist': '1024',
#     'index_type': 'IVF_FLAT',
#     'metric_type': 'L2',
#     'field_name': 'my_vector',
#     'index_name': 'my_vector'
# }

client.describe_index(
    collection_name="customized_setup",
    index_name="my_id"    
)

# {
#     'index_type': 'STL_SORT',
#     'field_name': 'my_id', 
#     'index_name': 'my_id'
# }
```

