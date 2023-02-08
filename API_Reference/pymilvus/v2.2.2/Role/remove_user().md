# remove_user()

This method dissociates a user from the current role. After this operation, the user losses access to the privileges that bind to the role.

## Invocation

```Python
remove_user(username)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `username`   | Name of the user to be associated with the role              | String                          | True     |

## Return

No return

## Example

```Python
from pymilvus import connections
from pymilvus.orm.role import Role
connections.connect()
role = Role(name=role_name)
role.remove_user(username)
users = role.get_users()
print(f"users added to the role: {users}")
```