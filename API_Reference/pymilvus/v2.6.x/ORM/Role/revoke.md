# revoke()

This operation revokes a privilege granted to the current role.

<div class="admonition note">

<p><b>notes</b></p>

<p>To complete this operation, you need to enable authentication on your Milvus instance. For details, refer to <a href="https://milvus.io/docs/authenticate.md">Authenticate User Access</a>.</p>

</div>

## Request Syntax

```python
revoke(
    object: str,
    object_name: str,
    privilege: str,
    db_name: str
) 
```

**PARAMETERS:**

- **object** (*string*)

    **[REQUIRED]**

    The type of the object to grant the privilege.

    The value is case-sensitive, and possible options are **Collection**, **Global**, and **User**. For details, refer to [Users & Roles](https://milvus.io/docs/users_and_roles.md).

- **object_name** (*string*)

    **[REQUIRED]**

    The name of a target object of the type specified in **object**.

    It can be a collection name, a user name, or a wild card (*).

- **privilege** (*string*)

    **[REQUIRED]**

    The name of the privilege to grant.

    Applicable privileges vary with the specified **object**. For details, refer to refer to [Users & Roles](https://milvus.io/docs/users_and_roles.md).

    <div class="admonition note">

    <p><b>notes</b></p>

    <ul>
    <li><p>To grant all privileges to a kind of object, like <strong>Collection</strong>, <strong>Global</strong>, <strong>User</strong>, use <code>*</code> for privilege name.</p></li>
    <li><p>When <code>object</code> is set to <code>Global</code>, setting <code>privilege</code> to <code>\*</code> is not equivalent to setting it to <code>All</code>. The <code>All</code> privilege includes all permissions, including any collection and user object.</p></li>
    </ul>

    </div>

- **db_name** (*string*)

    The name of a database the object belongs to. If left unspecified, the default database applies.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(role_name)

# Grant a privilege to the current role 
role.revoke("Collection", collection_name, "Insert")
```

## Related operations

The following operations are related to `revoke()`:

- [add_user()](add_user.md)

- [create()](create.md)

- [drop()](drop.md)

- [get_users()](get_users.md)

- [grant()](grant.md)

- [is_exist()](is_exist.md)

- [list_grant()](list_grant.md)

- [list_grants()](list_grants.md)

- [remove_user()](remove_user.md)

