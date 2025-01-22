# create_resource_group()

This operation creates a resource group. This operation always succeeds no matter whether the resource group exists.

<div class="admonition note">

<p><b>notes</b></p>

<p>A Milvus instance begins with a default resource group that includes all available query nodes. </p>
<p>To optimize resource utilization, you can create additional resource groups, reassign specific query nodes from the default group, and load collections into these newly configured groups. </p>
<p>This approach ensures that collections are allocated dedicated query nodes, enabling efficient and isolated search services.</p>
<p>For details about resource groups, refer to <a href="https://milvus.io/docs/resource_group.md#Manage-Resource-Groups">Manage Resource Group</a>.</p>

</div>

## Request Syntax

```python
create_resource_group(
    name: str,
    timeout: Optional[float] = None,
    **kwargs
) -> None
```

**PARAMETERS:**

- **name** (*str*) - 

    Name of the resource group to create.

- **configs** (*ResourceGroupConfig*) - 

    A **[ResourceGroupConfig](ResourceGroupConfig.md)** object.

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

client = MilvusClient(uri, token)

# Create a resource group
client.create_resource_group("rg1", config=ResourceGroupConfig(
    requests={"node_num": 1},
    limits={"node_num": 1},
    transfer_from=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
    transfer_to=[{"resource_group": DEFAULT_RESOURCE_GROUP}],
))
```

