# GetPartitionStatisticsAsync()

Retrieves statistics for a partition.

## Invocation

```c#
await collection.GetPartitionStatisticsAsync(partitionName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionName`     | The name of partition for which statistics are to be retrieved.                                               | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A dictionary containing statistics about the partition.
