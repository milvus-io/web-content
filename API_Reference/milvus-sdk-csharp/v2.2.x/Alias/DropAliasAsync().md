# DropAliasAsync()

Drops an alias.

## Invocation

```c#
await milvusClient.DropAliasAsync(alias, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `alias`             | The alias to be dropped.                                                                                      | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
