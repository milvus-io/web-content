# SelectUserAsync()

Gets information about a user, including optionally all its roles.

## Invocation

```c#
await milvusClient.SelectUserAsync(username, includeRoleInfo = true, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `username`          | The name of the user to be selected.                                                                          | `string`                        | True     |
| `includeRoleInfo`   | Whether to include role information in the results.                                                           | `bool`                          | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A `UserResult` instance containing information about the user, or `null` if the user does not exist.
