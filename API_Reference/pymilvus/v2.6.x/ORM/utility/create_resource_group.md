# create_resource_group()

This operation creates a new resource group. 

<div class="admonition note">

<p><b>what is a resource group?</b></p>

<p>A resource group can hold several or all of the query nodes in a Milvus instance. When you load a collection by calling load(), Milvus loads the data of the collection into certain query nodes.</p>
<p>There is a default resource group named <strong>_<em>default</em>resource_group</strong> available in every Milvus instance that holds all its query nodes. </p>
<p>Use <strong>describe<em>resource</em>group()</strong> to check the actual number. If there are multiple query nodes available, consider creating resource groups and distributing the query nodes among them.</p>

</div>

## Request Syntax

```python
create_resource_group(
    name: str,
    using: str,
    timeout: float | None,
    **kwargs
)
```

**PARAMETERS:**

- **name** (*str*) -

    **[REQUIRED]**

    The name of the resource group to create.

    Setting this to the name of an existing resource group results in a **MilvusException**.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **kwargs**

    Optional parameters. Currently, you can set **config** to specify the configuration of the resource group.

    - **config** (*ResourceGroupConfig*) -

        A ResourceGroupConfig object that represents the configuration of the resource group.

        ```python
        ├── ResourceGroupConfig
        │   ├── requests
        │   │   └── node_num
        │   └── limits
        │       └── node_num
        ```

        - **requests** (*dict*) -

            A dictionary specifying the number of query nodes that the resource group should hold. This key should include:

            - **node_num** (*int*) - The number of query nodes requested for the resource group.

        - **limits** (*dict*) -

            A dictionary specifying the maximum number of query nodes that the resource group can hold. This key should include:

            - **node_num** (*int*) - The maximum number of query nodes allowed for the resource group.

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

# Create a resource group

name = "rg" # A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).
node_num = 1

config = utility.ResourceGroupConfig(
    requests={'node_num': node_num}, # The number of query nodes that the resource group should hold.
    limits={'node_num': node_num} # The maximum number of query nodes that the resource group can hold.
)

try:
    utility.create_resource_group(
        name, # The name of the resource group to be created.
        using='default', # The database to use.
        config=config, # The configuration of the resource group.
    )
    print(f'Succeeded in creating resource group {name}.')
except Exception:
    print(f'Failed to create resource group {name}.')

```

## Related operations

The following operations are related to `create_resource_group()`:

- [describe_resource_group()](describe_resource_group.md)

- [drop_resource_group()](drop_resource_group.md)

- [list_resource_groups()](list_resource_groups.md)

- [transfer_node()](transfer_node.md)

- [transfer_replica()](transfer_replica.md)

