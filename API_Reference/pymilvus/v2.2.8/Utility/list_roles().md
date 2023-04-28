# list_roles()

This method lists all roles on the current Milvus instance.

## Invocation

```Python
list_roles(using="default")
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `include_user_info` | Whether to list users associated with the listed roles     | Boolean                         |
True    |
| `using`           | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

Returns a RoleInfo object.

## Example

```Python
from pymilvus import connections, utility
connections.connect()
roles = utility.list_roles()
print(f"roles in Milvus: {roles}")
```