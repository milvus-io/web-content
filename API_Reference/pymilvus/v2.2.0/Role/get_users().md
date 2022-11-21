# get_users()

This method lists all users associated with the current role.

## Invocation

```Python
get_users()
```

## Parameters

None

## Return

Returns a UserInfo object comprising a list of UserItem objects.

## Example

```Python
from pymilvus import connections
from pymilvus.orm.role import Role
connections.connect()
role = Role(name=role_name)
users = role.get_users()
print(f"users added to the role: {users}")
```