# list_resource_groups()

This operation lists all available resource groups.

## Request Syntax

```python
list_resource_groups(
    timeout: Optional[float] = None
) -> List[str]
```

**PARAMETERS:**

- **timeout** (*float* | *None*) - 

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives or an error occurs.

**RETURN TYPE:**

*List*

**RETURNS:**

A list of resource group names.

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

client = MilvusClient("http://localhost:19530")

## create resource group
print("create resource group")
client.create_resource_group("rg1", config=ResourceGroupConfig(
                requests={"node_num": 1},
                limits={"node_num": 1},
                transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
                transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
            ))

## list resource group
print("list resource group")
result = client.list_resource_groups()
print(result)
```
