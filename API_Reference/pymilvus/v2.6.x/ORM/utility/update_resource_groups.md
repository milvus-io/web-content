# update_resource_groups()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation updates the configurations of resource groups.

## Request Syntax

```python
update_resource_groups(
    configs: Mapping[str, ResourceGroupConfig],
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **configs** (*Mapping[str, ResourceGroupConfig]*) -

    **[REQUIRED]**

    A mapping of resource group names to their [ResourceGroupConfig](../../MilvusClient/ResourceGroup/ResourceGroupConfig.md) configurations.

- **using** (*str*) -

    Alias of the connection. Defaults to **default**.

- **timeout** (*float* | *None*)

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility, ResourceGroupConfig

conn = connections.connect(
    host="127.0.0.1", 
    port=19530
)

configs = {
    "resource_group_1": ResourceGroupConfig(
        requests={"node_num": 1},
        limits={"node_num": 5},
        transfer_from=[{"resource_group": "resource_group_2"}],
        transfer_to=[{"resource_group": "resource_group_2"}],
    ),
    "resource_group_2": ResourceGroupConfig(
        requests={"node_num": 4},
        limits={"node_num": 4},
        transfer_from=[{"resource_group": "__default_resource_group"}],
        transfer_to=[{"resource_group": "resource_group_1"}],
    ),
}

utility.update_resource_groups(configs)
```
