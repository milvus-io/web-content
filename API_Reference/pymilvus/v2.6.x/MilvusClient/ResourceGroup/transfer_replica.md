# transfer_replica()

This operation reassigns the specified number of replicas from the source resource group to the target resource group.

## Request Syntax

```python
transfer_replica(
    source_group: str,
    target_group: str,
    collection_name: str,
    num_replicas: int,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **source_name** (*str*) - 

    Name of the source resource group of this operation.

- **target_name** (*str*) - 

    Name of the target resource group of this operation.

- **collection_name** (*str*) -

    Name of the collection whose replicas will be transferred.

- **num_replicas** (*int*) -

    Number of replicas to transfer.

- **timeout** (*float* | *None*) - 

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives or an error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```python
from pymilvus import (
    MilvusClient,
    DataType,
)
from pymilvus.client.constants import DEFAULT_RESOURCE_GROUP

from pymilvus.client.types import (
    ResourceGroupConfig,
)

fmt = "\n=== {:30} ===\n"
dim = 8
collection_name = "hello_milvus"
client = MilvusClient("http://localhost:19530")

## create collection and load collection
print("create collection and load collection")
collection_name = "hello_milvus"
has_collection = client.has_collection(collection_name, timeout=5)
if has_collection:
    client.drop_collection(collection_name)

schema = client.create_schema(enable_dynamic_field=True)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("embeddings", DataType.FLOAT_VECTOR, dim=dim)
schema.add_field("title", DataType.VARCHAR, max_length=64)
client.create_collection(collection_name, schema=schema, consistency_level="Strong")
index_params = client.prepare_index_params()
index_params.add_index(field_name = "embeddings", metric_type="L2")
index_params.add_index(field_name = "title", index_type = "Trie", index_name="my_trie")
client.create_index(collection_name, index_params)
client.load_collection(collection_name)

## create resource group
print("create resource group")
client.create_resource_group("rg1", config=ResourceGroupConfig(
                requests={"node_num": 1},
                limits={"node_num": 1},
                transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
                transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
            ))

## transfer replica
print("transfer replica to rg1")
client.transfer_replica(DEFAULT_RESOURCE_GROUP, "rg1", collection_name, 1)
```
