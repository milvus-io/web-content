
# transfer_node()

This operation moves a specific number of query nodes from the source resource group to the target resource group.

## Request Syntax

```python
transfer_node(
    source_group: str,
    target_group: str,
    num_nodes: int,
    using: str = "default",
    timeout: Optional[float] = None,
) -> None
```

__PARAMETERS:__

- __source_group__ (_str_) -

    __[REQUIRED]__

    The name of the source resource group from which the query nodes are moved.

    Setting this to a resource group that does not exist results in a __MilvusException__.

- __target_group__ (_str_) -

    __[REQUIRED]__

    The name of the source resource group to which the query nodes are moved.

    Setting this to a resource group that does not exist results in a __MilvusException__.

- __num_nodes__ (_int_) -

    __[REQUIRED]__

    The number of query nodes to move between the source and target resource groups.

    Setting this to an integer greater than the actual number of query nodes in the current Milvus instance results in a __MilvusException__.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

__EXAMPLE:__

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Get the number of query nodes in the source resource group
res = utility.describe_resource_group(name="__default_resource_group")
res.num_available_node # 1

# Create a new resource group
utility.create_resource_group(
    name="rg_01",
    using="default"
)

# Get the number of query nodes in the target resource group
res = utility.describe_resource_group(name="rg_01")
res.num_available_node # 0

# Move the node from the default resource group to the new one
utility.transfer_node(
    source_group="__default_resource_group",
    target_group="rg_01",
    num_nodes=1
)

# Get the number of query nodes in the source and target resource groups
res = utility.describe_resource_group(name="__default_resource_group")
res.num_available_node # 0

res = utility.describe_resource_group(name="rg_01")
res.num_available_node # 1
```

