# list_users()

This method lists the information of all users on the current Milvus instance.

## Invocation

```Python
list_users(include_role_info, using="default")
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `include_role_info` | Whether to list roles granted to the user                  | Boolean                         |
True    |
| `using`           | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

Returns a UserInfo object comprising a list of UserItem objects.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
users = utility.list_users(include_role_info)
print(f"users info: {users}")
```