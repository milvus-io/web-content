# update_password()

This method updates the password of a specified user. You have to specify the name, old password, and new password of the user. 

<div class="alert note">

This operation does not change the header of the currently running Milvus connection and may results in connection errors. Therefore, close all Milvus connections established by a user before updating the user's password.

</div>

## Invocation

```Python
update_password(user, old_password, new_password)
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `user`            | Name of a user                                               | String                          | True     |
| `old_password`    | Original password of the user                                | String                          | True     |
| `new_password`    | New password of the user                                     | String                          | False    |

## Returns

No return.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
utility.update_password(user, old_password, new_password)
connections.connect(user=user, password=new_password)
users = utility.list_usernames()
print(f"users in Milvus: {users}")
```