# load_collection()

This operation loads the data of a specific collection into memory.

## Request syntax

```python
load_collection(
    collection_name: str, 
    replica_number: int
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **replica_number** (*int*) -

    The number of replicas to create on query nodes upon collection loading.

    - For a Milvus Standalone deployment, the maximum value should be 1.

    - For a Milvus Cluster deployment, the maximum value should be no greater than the `queryNode.replicas` in your Milvus configurations. For details on how to change Milvus configurations, refer to our configuration guides.

    <div class="admonition note">

    <p><b>what is a replica?</b></p>

    <p>In-memory replicas are replications of the same segment on multiple query nodes. If one query node has failed or is busy with a current search request when another arrives, the system can send new requests to an idle query node that has a replication of the same segment.</p>
    <p>For details, refer to <a href="https://milvus.io/docs/replica.md#In-Memory-Replica">In-Memory Replica</a>.</p>

    </div>

- **resource_groups** (*str[]*) -

    The target resource groups of this operation.

- **load_fields** (*str[]*) -

    The names of the fields to load. 

    If this parameter is left unspecified, Milvus loads all vector field indexes plus all scalar field data into memory. Setting this parameter makes Milvus load the data of the specified fields into memory, reducing memory usage and improving search performance.

- **skip_load_dynamic_field** (*bool*) - 

    Setting this to true makes Milvus skip loading the dynamic field, making it unavailable for filtering conditions and output fields for searches and queries.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

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

# 3. Create a collection
client.create_collection(
    collection_name="customized_setup",
    schema=schema
)

# 4. Prepare index parameters
index_params = client.prepare_index_params()

# 5. Add indexes
index_params.add_index(
    field_name="my_id",
    index_type="STL_SORT"
)

index_params.add_index(
    field_name="my_vector", 
    index_type="IVF_FLAT",
    metric_type="L2",
    params: {nlist: 1024}
)

# 6. Create indexes
client.create_index(
    collection_name="customized_setup",
    index_params=index_params
)

# 7. Load indexes
client.load_collection(
    collection_name="customized_setup",
    replica_number=2
)
```

## Related methods

- [get_load_state()](get_load_state.md)

- [refresh_load()](refresh_load.md)

- [release_collection()](release_collection.md)

