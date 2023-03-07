# revoke()

This method revokes the privileges granted to the current role.

## Invocation

```Python
revoke(object, object_name, privilege)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `object`     | Type of the operational object to which the specified privilege belongs, such as Collection, Index, Partition, etc. This parameter is case-sensitive.            | String                          | True     |
| `object_name`| Name of the object to which the role is granted the specified prvilege.            | String                          | True     |
| `privilege`| Name of the privilege to be granted to the role. This parameter is case-sensitive.           | String                          | True     |

For details on applicable objects and privileges, refer to [Users and Roles](milvus.io/docs/v2.2.x/users_and_roles.md).

## Return

No return

## Example

```Python
from pymilvus import connections
from pymilvus.orm.role import Role
connections.connect()
role = Role(role_name)
role.revoke("Collection", collection_name, "Insert")
```