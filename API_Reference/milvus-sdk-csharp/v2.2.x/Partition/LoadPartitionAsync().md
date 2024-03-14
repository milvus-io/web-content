# LoadPartitionAsync()

Loads a partition into memory so that it can be searched or queries.

## Invocation

```c#
await collection.LoadPartitionAsync(partitionName, replicaNumber = 1, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionName`     | The name of partition to be loaded.                                                                           | `string`                        | True     |
| `replicaNumber`     | An optional replica number to load.                                                                           | `int?`                          | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
