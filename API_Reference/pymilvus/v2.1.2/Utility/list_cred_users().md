# list_cred_users()

This method lists all authenticated user access.

## Invocation

```python
list_cred_users(using='default')
```

## Parameters

| Parameter                    |  Description                                    |
| ---------------------------- | ----------------------------------------------- |
| <code>using</code>           | Alias of the Milvus server to list users in.    |

## Return

Lists of all authenticated user access.

## Raises



## Example

```python
from pymilvus import utility
users = utility.list_cred_users(using='default')
```

## Limitation

Password must have at least 6 characters and must not exceed 256 characters in length.
