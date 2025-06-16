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

**PARAMETERS:**

- **name** (*str*) -

    **[REQUIRED]**

    The name of the resource group to drop.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

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

- [create_resource_group()](create_resource_group.md)

- [describe_resource_group()](describe_resource_group.md)

- [list_resource_groups()](list_resource_groups.md)

- [transfer_node()](transfer_node.md)

- [transfer_replica()](transfer_replica.md)

