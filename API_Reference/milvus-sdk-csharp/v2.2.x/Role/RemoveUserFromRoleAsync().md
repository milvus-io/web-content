# RemoveUserFromRoleAsync()

Removes a user from a role.

## Invocation

```c#
await milvusClient.RemoveUserFromRoleAsync(username, roleName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `username`          | The name of the user to be removed from the role.                                                             | `string`                        | True     |
| `roleName`          | The name of the role from which the user is to be removed.                                                    | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
