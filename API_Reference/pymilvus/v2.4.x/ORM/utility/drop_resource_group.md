# drop_resource_group()

This operation drops a resource group. 

## Request Syntax

```python
drop_resource_group(
    name: str,
    using: str,
    timeout: float | None
)
```

__PARAMETERS:__

- __name __(_str_) -

    __[REQUIRED]__

    The name of the resource group to drop.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Create a new resource group
utility.create_resource_group(
    name="rg_01",
    using="default"
)

# Drop the created resource group
utility.drop_resource_group(
    name="rg_01",
    using="default"
)
```

## Related operations

The following operations are related to `drop_resource_group()`:

- [create_resource_group()](./create_resource_group.md)

- [describe_resource_group()](./describe_resource_group.md)

- [list_resource_groups()](./list_resource_groups.md)

- [transfer_node()](./transfer_node.md)

- [transfer_replica()](./transfer_replica.md)

