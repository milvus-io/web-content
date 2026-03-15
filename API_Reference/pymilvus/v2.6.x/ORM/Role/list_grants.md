# list_grants()

This operation lists all privileges granted to the current role.

## Request Syntax

```python
list_grants(
    db_name: str
)
```

**PARAMETERS:**

- **db_name** (*str*)

    The name of a database in which Milvus carries out this operation.

    If the specified database does not exist, an empty result returns.

**RETURN TYPE:**

*GrantInfo*

**RETURNS:**

A **GrantInfo** object that contains a list of **GrantItem** objects.

```python
├── GrantInfo
│   └── groups  
│       └── GrantItem
│           ├── object
│           ├── object_name
│           ├── role_name
│           ├── grantor_name
│           ├── privilege
│           └── db_name
```

The **GrantItem** objects contains the following fields:

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(name="root")

# List all privileges granted to the current role.
res = list_grants(
    db_name="test_db"
)
```

## Related operations

The following operations are related to `get_replicas()`:

- [add_user()](https://zilliverse.feishu.cn/docx/W7GJdpYrYoYhSaxW6uzcVAZinYf)

- [create()](https://zilliverse.feishu.cn/docx/G3h4d3jx6oXFHBxFZlyc9jLKnTO)

- [drop()](https://zilliverse.feishu.cn/docx/KEzNdJPoDoHOjlx2FC8cNcHqngg)

- [get_users()](https://zilliverse.feishu.cn/docx/CCOhd671iog6rRxu8aOcaPncnLK)

- [grant()](https://zilliverse.feishu.cn/docx/BapSdVXjQoQXnbxnRYScCagAn1f)

- [is_exist()](https://zilliverse.feishu.cn/docx/F8WOdIoz4okn5OxMEymcXNuRnkb)

- [list_grant()](https://zilliverse.feishu.cn/docx/JXNXdQuwhoYmZQxSohNcdxtwnzh)

- [remove_user()](https://zilliverse.feishu.cn/docx/SlmSdaD7rocMJsxThNHcOtEknVd)

- [revoke()](https://zilliverse.feishu.cn/docx/UUJWdoEnjoXx69xahsScdMVSnzf)

