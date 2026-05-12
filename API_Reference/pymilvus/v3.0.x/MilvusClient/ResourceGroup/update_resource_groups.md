# update_resource_groups()

This operation updates the configurations of the specified resource group.

## Request Syntax

```python
update_resource_groups(
    configs: Dict[str, ResourceGroupConfig],
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **configs** (*Dict[str, ResourceGroupConfig]*) - 

    A dictionary containing the resource group name as the key and the configuration of the resource group after the update as the value. The value should be a **[ResourceGroupConfig](ResourceGroupConfig.md)** object.

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

milvus_client = MilvusClient("http://localhost:19530")

## create resource group
print("create resource group")
milvus_client.create_resource_group("rg1", config=ResourceGroupConfig(
                requests={"node_num": 1},
                limits={"node_num": 1},
                transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
                transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
            ))

## update resource group
configs = {
            "rg1": ResourceGroupConfig(
                requests={"node_num": 5},
                limits={"node_num": 5},
                transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
                transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
            ),
        }
milvus_client.update_resource_groups(configs)

## describe resource group
print("describe rg1")
result = milvus_client.describe_resource_group("rg1")
print(result)
```
