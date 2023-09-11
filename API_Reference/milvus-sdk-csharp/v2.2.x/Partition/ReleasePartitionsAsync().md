# ReleasePartitionAsync()

Releases loaded partitions from memory.

## Invocation

```c#
await collection.ReleasePartitionsAsync(partitionNames, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionNames`    | The names of the partitions to be released.                                                                   | `IReadOnlyList<string>`         | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
