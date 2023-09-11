# ReleasePartitionAsync()

Releases a loaded partition from memory.

## Invocation

```c#
await collection.ReleasePartitionAsync(partitionName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionName`     | The name of partition to be released.                                                                         | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
