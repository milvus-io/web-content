# create()

This method creates a role. It succeeds if the role name does not exist, or fails if the role name is already in use.

## Invocation

```Python
create()
```

## Parameters

None

## Return

No return

## Example

```Python
from pymilvus import connections, utility
from pymilvus.orm.role import Role
connections.connect()
role = Role(name=role_name)
role.create()
roles = utility.list_roles()
print(f"roles in Milvus: {roles}")
```