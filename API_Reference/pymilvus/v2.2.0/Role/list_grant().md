# list_grant()

This method lists the relationship between the current role and the specified operation object.

## Invocation

```Python
list_grant(object, object_name)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `object`     | Type of the object to which the privilege belongs, such as Collection, Index, Partition, etc. This parameter is case-sensitive.            | String                          | True     |
| `object_name`| Name of the object to which the role is granted the specified prvilege.            | String                          | True     |

For details on applicable objects and privileges, refer to [Users and Roles](milvus.io/docs/v2.2.x/users_and_roles.md).

## Return

Returns a GrantInfo object comprising a list of GrantItem objects.

## Example

```Python
from pymilvus import connections
from pymilvus.orm.role import Role
connections.connect()
role = Role(role_name)
role.list_grant("Collection", collection_name)
```