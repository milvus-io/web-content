# ShowPartitionsAsync()

Lists all partitions defined for a collection.

## Invocation

```c#
await collection.ShowPartitionsAsync(cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A list of `MilvusPartition` instances providing information about all partitions in the collection.
