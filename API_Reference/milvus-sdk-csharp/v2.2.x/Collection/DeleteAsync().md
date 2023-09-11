# DeleteAsync()()

Deletes rows from a collection by given expression.

## Invocation

```c#
await collection.DeleteAsync(expression, partitionName = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `expression`        | A boolean expression determining which rows are to be deleted.                                              | `string`                        | True     |
| `partitionName`     | An optional name of a partition from which rows are to be deleted.                                          | `string?`                       | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

A `MutationResult` containing information about the drop operation.
