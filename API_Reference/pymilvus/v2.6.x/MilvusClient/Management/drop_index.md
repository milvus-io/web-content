# drop_index()

This operation drops an index from a specific collection.

## Request syntax

```python
drop_index(
    collection_name: str,
    index_name: str,
    timeout: Optional[float] = None,
    **kwargs,    
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **index_name** (str) -

    **[REQUIRED]**

    The name of the index to drop.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

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

# 7. Drop an index
client.drop_index(
    collection_name="customized_setup", 
    index_name="my_id"
)
```

## Related methods

- [add_index()](https://zilliverse.feishu.cn/docx/ZplAdphtooqHJkxo8GCcOFecngd)

- [create_index()](https://zilliverse.feishu.cn/docx/B3n3db0idoia02xXxJfcONK8nRh)

- [describe_index()](https://zilliverse.feishu.cn/docx/WhsHdyIgyoFlsQxNJt9cFCTxnDe)

- [list_indexes()](https://zilliverse.feishu.cn/docx/ZqmudJWyFonUKGxAxXncYrLZn2e)

- [prepare_index_params()](https://zilliverse.feishu.cn/docx/CAzpdAw3wo4ZqrxhjTLcEGBBn1S)

