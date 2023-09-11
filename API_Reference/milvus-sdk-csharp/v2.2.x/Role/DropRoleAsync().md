# DropRoleAsync()

Drops a role.

## Invocation

```c#
await milvusClient.DropRoleAsync(roleName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `roleName`          | The name of the role to be dropped.                                                                           | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
