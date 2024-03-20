# describe_resource_group()

This operation describes the details of a specific resource group.

## Request Syntax

```python
describe_resource_group(
    name: str,
    using: str,
    timeout: float | None
)
```

__PARAMETERS:__

- __name __(_str_) -

    __[REQUIRED]__

    The name of the resource group to describe.

    If the specified resource group does not exist, a __MilvusException__ will be raised.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_ResourceGroupInfo_

__RETURNS:__

A __ResourceGroupInfo__ object that contains the detailed description of a resource group.

```python
├── ResourceGroupInfo 
│       ├── name
│       ├── capacity
│       ├── num_available_node
│       ├── num_loaded_replica
│       ├── num_outgoing_node
│       └── num_incoming_node
```

A __ResourceGroupInfo__ object contains the following fields:

- __name__ (_str_)

    The name of the resource group.

- __capacity__ (_int_)

    The number of query nodes that are transferred to this resource group.

- __num_available_node__ (_int_)

    The number of available query nodes in this resource group.

- __num_loaded_replica__ (_google._upb._message.ScalarMapContainer_)

    The name of a collection and its corresponding number of loaded replicas in  this resource group.

- __num_outgoing_node__ (_google._upb._message.ScalarMapContainer_)

    The name of a collection and its number of query nodes for outgoing requests. 

- __num_incoming_node__ (_google._upb._message.ScalarMapContainer_)

    The name of a collection and its number of query nodes for incoming requests.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Create a new resource group
rgs = create_resource_group(
    name="rg_01",
    using="default"
)

# Describe the details of the created resource group
details = describe_resource_group(
    name="rg_01",
    using="default"
)
```

## Related operations

The following operations are related to `describe_resource_group()`:

- [create_resource_group()](./create_resource_group.md)

- [drop_resource_group()](./drop_resource_group.md)

- [list_resource_groups()](./list_resource_groups.md)

- [transfer_node()](./transfer_node.md)

- [transfer_replica()](./transfer_replica.md)

