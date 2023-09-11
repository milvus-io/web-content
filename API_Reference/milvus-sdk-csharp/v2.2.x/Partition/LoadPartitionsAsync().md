# LoadPartitionsAsync()

Loads partitions into memory so that they can be searched or queries.

## Invocation

```c#
await collection.CreatePartitionsAsync(partitionNames, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionNames`    | The names of the partitions to be loaded.                                                                     | `IReadOnlyList<string>`         | True     |
| `replicaNumber`     | An optional replica number to load.                                                                           | `int?`                          | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
