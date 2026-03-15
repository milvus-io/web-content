# grant_privilege_v2()

This operation grants the specified privilege or privilege group to the specified role.

## Request Syntax

```python
grant_privilege_v2(
    self,
    role_name: str,
    privilege: str,
    collection_name: str,
    db_name: Optional[str] = None,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to assign privileges to.

- **privilege** (*str*) -

    **[REQUIRED]**

    The name of the privilege to assign. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **collection_name** (*str*) - 

    **[REQUIRED]**

    The name of a collection. To grant privileges regarding all collections in the current database, set this parameter to `*`. 

- **db_name** (*str*) -

    The name of a database. 

    This parameter is optional. Setting this parameter restricts the privilege assignment within the specified database.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **BaseException**

    This exception will be raised when this operation fails.

## Example

