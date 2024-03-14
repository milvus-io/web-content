
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

__PARAMETERS:__

- __name__ (_str_) -

    __[REQUIRED]__

    The name of the resource group to create.

    Setting this to the name of an existing resource group results in a __MilvusException__.

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
```

