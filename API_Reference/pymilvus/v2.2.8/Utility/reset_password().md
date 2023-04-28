# reset_password()

This method resets the password of the specified user. You have to specify the name, old password, and new password of the user. 

## Invocation

```python
reset_password(user, old_password, new_password)
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `user`            | Name of a user                                               | String                          | True     |
| `old_password`    | Original password of the user                                | String                          | True     |
| `new_password`    | New password of the user                                     | String                          | False    |

## Return

No return.

## Raises



## Example

```python
from pymilvus import connections, utility
connections.connect()
utility.reset_password(user, old_password, new_password)
users = utility.list_usernames()
print(f"users in Milvus: {users}")
```

## Limitation

Password must have at least 6 characters and must not exceed 256 characters in length.