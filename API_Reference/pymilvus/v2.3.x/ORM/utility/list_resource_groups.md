
# list_resource_groups()

This operation lists all resource groups in the currently connected Milvus instance.

## Request Syntax

```python
list_resource_groups(
    using: str,
    timeout: float | None,
)
```

__PARAMETERS:__

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_list_

__RETURNS:__
A list of all resource group names.

__EXAMPLE:__

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

