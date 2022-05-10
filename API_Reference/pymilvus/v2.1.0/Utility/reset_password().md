# reset_password()

This method resets the password of the authenticated user access.

## Invocation

```python
reset_password(user, password, using='default')
```

## Parameters

| Parameter                    |  Description                                    |
| ---------------------------- | ----------------------------------------------- |
| <code>user</code>            | Username to reset password.                     |
| <code>password</code>        | New password for the username to create.        |
| <code>using</code>           | Alias of the Milvus server to reset password in.|

## Return

No return.

## Raises



## Example

```python
from pymilvus import utility
utility.reset_password('user', 'new_password', using='default')
```

## Limitation

Password must have at least 6 characters and must not exceed 256 characters in length.