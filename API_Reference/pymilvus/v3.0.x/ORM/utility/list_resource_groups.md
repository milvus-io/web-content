# list_resource_groups()

This operation lists all resource groups in the currently connected Milvus instance.

## Request Syntax

```python
list_resource_groups(
    using: str,
    timeout: float | None,
)
```

**PARAMETERS:**

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**
A list of all resource group names.

**EXAMPLE:**

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Create a new resource group
utility.create_resource_group(
    name="rg_01",
    using="default"
)

# Create another resource group
utility.create_resource_group(
    name="rg_02",
    using="default"
)

# List all resource groups
utility.list_resource_groups(
    using="default"
) # ["__default_resource_group", "rg_01", "rg_02"]
```

## Related operations

The following operations are related to `list_resource_groups()`:

- [create_resource_group()](create_resource_group.md)

- [describe_resource_group()](describe_resource_group.md)

- [drop_resource_group()](drop_resource_group.md)

- [transfer_node()](transfer_node.md)

- [transfer_replica()](transfer_replica.md)

