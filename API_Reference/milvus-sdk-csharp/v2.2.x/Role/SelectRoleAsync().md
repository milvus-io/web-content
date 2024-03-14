# SelectRoleAsync()

Gets information about a role, including optionally all its users.

## Invocation

```c#
await milvusClient.SelectRoleAsync(roleName, includeUserInfo = true, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `roleName`          | The name of the role to be selected.                                                                          | `string`                        | True     |
| `includeUserInfo`   | Whether to include user information in the results.                                                           | `bool`                          | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A `RoleResult` instance containing information about the role, or `null` if the role does not exist.
