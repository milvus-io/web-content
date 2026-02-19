# revoke_privilege()

This operation revokes a privilege previously granted to a role on a specific object. Use this method to restrict a role's access to a particular resource.

<div class="admonition note">

<p><b>notes</b></p>

<p>This method replaces the previous <code>revoke_privileges()</code> (plural). The behavior is identical.</p>

</div>

## Request syntax

```python
client.revoke_privilege(
    role_name: str,
    object_type: str,
    privilege: str,
    object_name: str,
    db_name: str = "",
    timeout: float = None
)
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role from which to revoke the privilege.

- **object_type** (*str*) -

    **[REQUIRED]**

    The type of the object on which the privilege was granted. Valid values include `"Collection"`, `"Global"`, and `"User"`.

- **privilege** (*str*) -

    **[REQUIRED]**

    The name of the privilege to revoke. Refer to the Milvus documentation for a full list of supported privileges.

- **object_name** (*str*) -

    **[REQUIRED]**

    The name of the object on which the privilege was granted. Use `"*"` to denote all objects of the specified type.

- **db_name** (*str*) -

    The name of the database. Defaults to the current database if not specified.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when the role does not exist, the privilege is invalid, or the server encounters an error.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Revoke insert privilege on a collection from a role
client.revoke_privilege(
    role_name="readOnly",
    object_type="Collection",
    privilege="Insert",
    object_name="my_collection"
)
```

