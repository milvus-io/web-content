# transfer_replica()

This operation reassigns the specified number of replicas from the source resource group to the target resource group.

## Request Syntax

```python
transfer_replica(
    source_group: str,
    target_group: str,
    collection_name: str,
    num_replicas: int,
    timeout: Optional[float] = None,
) -> None
```

**PARAMETERS:**

- **source_group** (*str*) -

    **[REQUIRED]**

    Name of the source resource group of this operation.

- **target_group** (*str*) -

    **[REQUIRED]**

    Name of the target resource group of this operation.

- **collection_name** (*str*) -

    **[REQUIRED]**

    Name of the collection whose replicas will be transferred.

- **num_replicas** (*int*) -

    **[REQUIRED]**

    Number of replicas to transfer.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives or an error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient
from pymilvus.client.constants import DEFAULT_RESOURCE_GROUP
from pymilvus.client.types import ResourceGroupConfig

client = MilvusClient("http://localhost:19530")

# Create a resource group
client.create_resource_group("rg1", config=ResourceGroupConfig(
    requests={"node_num": 1},
    limits={"node_num": 1},
    transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
    transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
))

# Transfer replica to the new resource group
client.transfer_replica(
    source_group=DEFAULT_RESOURCE_GROUP,
    target_group="rg1",
    collection_name="my_collection",
    num_replicas=1,
)
```
