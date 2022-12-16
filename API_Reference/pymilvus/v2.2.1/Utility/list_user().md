# list_user()

This method lists the information of a specified user.

## Invocation

```Python
list_user(username, include_role_info, using="default")
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `username`        | Name of the user whose information is to be listed           | String                          | True     |
| `include_role_info` | Whether to list roles granted to the user                  | Boolean                         |
True    |
| `using`           | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

Returns a UserInfo object.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
user = utility.list_user(username, include_role_info)
print(f"user info: {user}")
```