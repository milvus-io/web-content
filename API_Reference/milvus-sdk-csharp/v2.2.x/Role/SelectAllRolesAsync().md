# SelectAllRolesAsync()

Gets information about all roles defined in Milvus, including optionally all their users.

## Invocation

```c#
await milvusClient.SelectAllRolesAsync(includeUserInfo = true, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `includeUserInfo`   | Whether to include user information in the results.                                                           | `bool`                          | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A list of `RoleResult` instances containing information about all the roles.
