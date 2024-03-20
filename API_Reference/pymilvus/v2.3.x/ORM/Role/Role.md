
# Role

A __Role__ instance represents a role with specific privileges to access your Milvus instanceZilliz Cloud clusters.

```python
class pymilvus.Role
```

## Constructor

Constructs a role by name and other parameters.

```python
Role(
    name: str,
    using: str
)
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Calling the constructor alone does not create the role. You have to explicitly call the <code>create()</code> method of the role object to create the role.</p>

</div>

__PARAMETERS:__

- __name__ (_string_) - 

    __[REQUIRED]__

    The name of the role to create.

- __using__ (_string_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

__RETURN TYPE:__

_Role_

__RETURNS:__

A role object.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Create a role
role = Role(
    name="admin",
)
```
