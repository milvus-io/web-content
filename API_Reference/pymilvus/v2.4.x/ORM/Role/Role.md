# Role

A **Role** instance represents a role with specific privileges to access your Milvus instanceZilliz Cloud clusters.

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

**PARAMETERS:**

- **name** (*string*) - 

    **[REQUIRED]**

    The name of the role to create.

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

**RETURN TYPE:**

*Role*

**RETURNS:**

A role object.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Create a role
role = Role(
    name="admin",
)
```

## Methods

The following are the methods of the `Role` class:

