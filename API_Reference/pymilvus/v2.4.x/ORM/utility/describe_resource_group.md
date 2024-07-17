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
│   ├── name
│   ├── capacity
│   ├── num_available_node
│   ├── num_loaded_replica
│   ├── num_outgoing_node
│   ├── num_incoming_node
│   ├── config
│   │   ├── requests
│   │   │   └── node_num
│   │   └── limits
│   │       └── node_num
│   └── nodes
│       └── NodeInfo
│           ├── node_id
│           ├── address
│           └── hostname
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

- **config** (*ResourceGroupConfig*)

    A ResourceGroupConfig object that represents the configuration of the resource group.

    - **requests** (*dict*) -

        A dictionary specifying the number of query nodes that the resource group should hold. This key should include:

        - **node_num** (*int*) - The number of query nodes requested for the resource group.

    - **limits** (*dict*) -

        A dictionary specifying the maximum number of query nodes that the resource group can hold. This key should include:

        - **node_num** (*int*) - The maximum number of query nodes allowed for the resource group.

- **nodes** (*list*)

    A list of NodeInfo objects, each containing:

    - **node_id** (*int*) - The ID of the node.

    - **address** (*str*) - The address of the node.

    - **hostname** (*str*) - The hostname of the node.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Create a resource group

name = "rg" # A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).
node_num = 1 # Number of query nodes you expect the target resource group to hold.

config = utility.ResourceGroupConfig(
    requests={'node_num': node_num}, # The number of query nodes that the resource group should hold.
    limits={'node_num': node_num} # The maximum number of query nodes that the resource group can hold.
)

try:
    utility.create_resource_group(
        name=name, # The name of the resource group to be created.
        using='default', # The database to use.
        config=config, # The configuration of the resource group.
    )
    print(f'Succeeded in creating resource group {name}.')
except Exception:
    print(f'Failed to create resource group {name}.')
    
# Succeeded in creating resource group rg.

# Describe the details of the created resource group `rg`

info = utility.describe_resource_group(name='rg')

print(f"Resource group rg description: {info}")

# Output:
# Resource group rg description: ResourceGroupInfo:
# <name:rg>, # Name of the resource group
# <capacity:1>, # Number of query nodes in the resource group
# <num_available_node:1>, # Number of available query nodes in the resource group
# <num_loaded_replica:{}>, 
# <num_outgoing_node:{}>,
# <num_incoming_node:{}>,
# <config:requests {
#   node_num: 1 # Number of query nodes required in the resource group
# }
# limits {
#   node_num: 1 # Maximum number of query nodes allowed in the resource group
# }
# >,
# <nodes:[NodeInfo:
# <node_id:8>,
# <address:10.102.7.12:21123>,
# <hostname:doc-test1-axjfu-milvus-querynode-776bb5768-v2dqh>]>
```

## Related operations

The following operations are related to `describe_resource_group()`:

- [create_resource_group()](create_resource_group.md)

- [drop_resource_group()](drop_resource_group.md)

- [list_resource_groups()](list_resource_groups.md)

- [transfer_node()](transfer_node.md)

- [transfer_replica()](transfer_replica.md)

