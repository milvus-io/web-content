# delete_user()

This method deletes a specified user. This operation is irriversable. Therefore, exercise caution when performing this operation.

## Invocation

```Python
delete_user(user, using="default")
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `user`            | Name of the user to be deleted                               | String                          | True     |
| `using`           | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

No return.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
utility.delete_user(user)
users = utility.list_usernames()
print(f"users in Milvus: {users}")
```