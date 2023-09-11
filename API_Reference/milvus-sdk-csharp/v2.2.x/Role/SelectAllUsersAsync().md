# SelectAllUsersAsync()

Gets information about all users defined in Milvus, including optionally all their users.

## Invocation

```c#
await milvusClient.SelectAllUsersAsync(includeRoleInfo = true, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `includeRoleInfo`   | Whether to include role information in the results.                                                           | `bool`                          | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A list of `UserResult` instances containing information about all the users.
