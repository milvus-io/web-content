# create_credential()

This method creates an authenticated user access.

## Invocation

```python
create_credential(user, password, using='default') 
```

## Parameters

| Parameter                    |  Description                                    |
| ---------------------------- | ----------------------------------------------- |
| <code>user</code>            | Username to create.                             |
| <code>password</code>        | Password for the user to create.                |
| <code>using</code>           | Alias of the Milvus server to create the user.  |

## Return

No return.

## Raises



## Example

```python
from pymilvus import utility
utility.create_credential('user', 'password', using='default') 
```

## Note

To stop using the authenticated access, or to log in to another authenticated user, you need to disconnect from the Milvus instance and re-connect to it.

## Limitation

1. Username must not be empty, and must not exceed 32 characters in length. It must start with a letter, and only contains underscores, letters, or numbers.
2. Password must have at least 6 characters and must not exceed 256 characters in length.