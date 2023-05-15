# delete_credential()

This method deletes an authenticated user access.

## Invocation

```python
delete_credential(user, using='default')
```

## Parameters

| Parameter                    |  Description                                    |
| ---------------------------- | ----------------------------------------------- |
| <code>user</code>            | Username to delete.                             |
| <code>using</code>           | Alias of the Milvus server to delete the user.  |

## Return

No return.

## Raises



## Example

```python
from pymilvus import utility
users = utility.list_cred_users(using='default')
```