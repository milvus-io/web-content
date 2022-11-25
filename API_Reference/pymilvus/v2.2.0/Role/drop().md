# drop()

This method deletes a role. It succeeds if the role name exists, or fails if the role name does not exist.

## Invocation

```Python
drop()
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
role.drop()
roles = utility.list_roles()
print(f"roles in Milvus: {roles}")
```