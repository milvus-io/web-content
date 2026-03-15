# revoke()

This operation revokes a privilege granted to the current role.

<div class="alert note">

To complete this operation, you need to enable authentication on your Milvus instance. For details, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

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

    <div class="alert note">
    
    - To grant all privileges to a kind of object, like **Collection**, **Global**, **User**, use `*` for privilege name.
    
    - When `object` is set to `Global`, setting `privilege` to `\*` is not equivalent to setting it to `All`. The `All` privilege includes all permissions, including any collection and user object.
    
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

- [add_user()](https://zilliverse.feishu.cn/docx/W7GJdpYrYoYhSaxW6uzcVAZinYf)

- [create()](https://zilliverse.feishu.cn/docx/G3h4d3jx6oXFHBxFZlyc9jLKnTO)

- [drop()](https://zilliverse.feishu.cn/docx/KEzNdJPoDoHOjlx2FC8cNcHqngg)

- [get_users()](https://zilliverse.feishu.cn/docx/CCOhd671iog6rRxu8aOcaPncnLK)

- [grant()](https://zilliverse.feishu.cn/docx/BapSdVXjQoQXnbxnRYScCagAn1f)

- [is_exist()](https://zilliverse.feishu.cn/docx/F8WOdIoz4okn5OxMEymcXNuRnkb)

- [list_grant()](https://zilliverse.feishu.cn/docx/JXNXdQuwhoYmZQxSohNcdxtwnzh)

- [list_grants()](https://zilliverse.feishu.cn/docx/YRoGdgQmWoIEaJx84ICcHTILnMe)

- [remove_user()](https://zilliverse.feishu.cn/docx/SlmSdaD7rocMJsxThNHcOtEknVd)

