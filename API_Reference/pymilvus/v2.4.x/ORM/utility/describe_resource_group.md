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

**PARAMETERS:**

- **name** (*str*) -

    **[REQUIRED]**

    The name of the resource group to describe.

    If the specified resource group does not exist, a **MilvusException** will be raised.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*ResourceGroupInfo*

**RETURNS:**

A **ResourceGroupInfo** object that contains the detailed description of a resource group.

```python
├── ResourceGroupInfo 
│       ├── name
│       ├── capacity
│       ├── num_available_node
│       ├── num_loaded_replica
│       ├── num_outgoing_node
│       └── num_incoming_node
```

A **ResourceGroupInfo** object contains the following fields:

- **name** (*str*)

    The name of the resource group.

- **capacity** (*int*)

    The number of query nodes that are transferred to this resource group.

- **num_available_node** (*int*)

    The number of available query nodes in this resource group.

- **num_loaded_replica** (*google._upb._message.ScalarMapContainer*)

    The name of a collection and its corresponding number of loaded replicas in  this resource group.

- **num_outgoing_node** (*google._upb._message.ScalarMapContainer*)

    The name of a collection and its number of query nodes for outgoing requests. 

- **num_incoming_node** (*google._upb._message.ScalarMapContainer*)

    The name of a collection and its number of query nodes for incoming requests.

**EXCEPTIONS:**

- **MilvusException**

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

- [create_resource_group()](create_resource_group.md)

- [drop_resource_group()](drop_resource_group.md)

- [list_resource_groups()](list_resource_groups.md)

- [transfer_node()](transfer_node.md)

- [transfer_replica()](transfer_replica.md)

