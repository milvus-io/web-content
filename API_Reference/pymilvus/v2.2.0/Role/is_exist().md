# is_exist()

This method checks whether the current role exists.

## Invocation

```Python
is_exist()
```

## Parameters

None

## Return

Returns a boolean value indicating whether the current role exists.

## Example

```Python
from pymilvus import connections
from pymilvus.orm.role import Role
connections.connect()
role = Role(name=role_name)
is_exist = role.is_exist()
print(f"the role: {is_exist}")
```