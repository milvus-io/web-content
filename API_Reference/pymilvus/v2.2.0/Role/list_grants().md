# list_grants()

This method lists all privileges granted to the current role.

## Invocation

```Python
list_grants()
```

## Parameters

None

## Return

Returns a GrantInfo object comprising a list of GrantItem objects.

## Example

```Python
from pymilvus import connections
from pymilvus.orm.role import Role
connections.connect()
role = Role(role_name)
role.list_grants()
```