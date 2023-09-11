# FlushAsync()

Flushes collection data to disk, required only in order to get up-to-date statistics.
This method will be removed in a future version.

## Invocation

```c#
await collection.FlushAsync(cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

A `FlushResult` containing information about the flush operation.
