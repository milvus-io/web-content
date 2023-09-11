# AddUserToRoleAsync()

Adds a user to a role.

## Invocation

```c#
await milvusClient.AddUserToRoleAsync(username, roleName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `username`          | The name of the username to be added to the role.                                                             | `string`                        | True     |
| `roleName`          | The name of the role the user will be added to.                                                               | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
