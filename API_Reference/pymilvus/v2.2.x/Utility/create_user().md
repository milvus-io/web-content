# create_user()

This method creates a user. You have to specify a user name and a password. The user name must be unique globally.

## Invocation

```Python
create_user(user, password, using="default")
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `user`            | Name of the user to be created                               | String                          | True     |
| `password`        | Password of the user to be created                           | String                          | True     |
| `using`           | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

No return.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
utility.create_user(user, password)
connections.connect(user=user, password=password)
users = utility.list_usernames()
print(f"users in Milvus: {users}")
```

