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
    timeout: float | None
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
```

## Related operations

The following operations are related to `create_resource_group()`:

- [describe_resource_group()](describe_resource_group.md)

- [drop_resource_group()](drop_resource_group.md)

- [list_resource_groups()](list_resource_groups.md)

- [transfer_node()](transfer_node.md)

- [transfer_replica()](transfer_replica.md)

