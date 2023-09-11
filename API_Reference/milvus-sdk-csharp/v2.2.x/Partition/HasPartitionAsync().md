# HasPartitionAsync()

Checks whether a partition exists.

## Invocation

```c#
await collection.HasPartitionAsync(partitionName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionName`     | The name of partition to be checked.                                                                          | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

Whether the partition exists or not.
