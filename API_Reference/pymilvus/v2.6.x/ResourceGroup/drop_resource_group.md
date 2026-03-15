# drop_resource_group()

This operation drops the specified resource group.

## Request Syntax

```python
drop_resource_group(
    name: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **name** (*str*) - 

    Name of the resource group to drop.

- **timeout** (*float* | *None*) - 

    The timeout duration for this operation. Setting this to *None* indicates that it timeouts when a response arrives or an error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

<div class="alert note">

Before dropping a resource group, ensure that the number of required nodes and the maximum number of required nodes in its configuration are zeros.

You can use [update_resource_groups()](https://zilliverse.feishu.cn/docx/TJmCdUvGRoOLFAx55qVcqbWGnRs) to make the change.

</div>

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

## drop resource group
print("drop resource group")
# create resource group
configs = {
            "rg1": ResourceGroupConfig(
                requests={"node_num": 0},
                limits={"node_num": 0},
                transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
                transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
            ),
        }
client.update_resource_groups(configs)
client.drop_resource_group("rg1")
```
