# GetLoadingProgressAsync()

Returns the loading progress for a collection, and optionally one or more of its partitions.

## Invocation

```c#
await collection.GetLoadingProgressAsync(partitionNames = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionNames`    | An optional list of partition names for which to check the loading progress.                                | `IReadOnlyList<string>?`        | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is <see cref="CancellationToken.None" />. | `CancellationToken`             | False    |

## Return

The loading progress of the collection.
