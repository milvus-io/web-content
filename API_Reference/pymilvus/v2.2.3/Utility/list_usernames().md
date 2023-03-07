# list_usernames()

This method lists all usernames on the current Milvus instance.

## Invocation

```Python
list_usernames(using="default")
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `using`           | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

Returns a list of user names.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
users = utility.list_usernames()
print(f"users in Milvus: {users}")
```