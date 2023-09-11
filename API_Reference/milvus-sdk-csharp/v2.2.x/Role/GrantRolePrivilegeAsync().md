# GrantRolePrivilegeAsync()

Revokes a privilege from a role.

## Invocation

```c#
await milvusClient.GrantRolePrivilegeAsync(roleName, object, objectName, privilege, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `roleName`          | The name of the role to be granted a privilege.                                                               | `string`                        | True     |
| `object`            | A string describing the object type on which the privilege is to be granted, e.g. `"Collection"`.             | `string`                        | True     |
| `objectName`        | A string describing the specific object on which the privilege will be granted. Can be `"*"`.                 | `string`                        | True     |
| `privilege`         | A string describing the privilege to be granted, e.g. `"Search"`.                                             | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
