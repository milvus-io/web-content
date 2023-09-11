# GetEntityCountAsync()

Retrieves the current number of entities in the collection. Call `FlushAsync` before invoking this method to ensure up-to-date results.

## Invocation

```c#
await collection.GetEntityCountAsync(cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

The number of entities currently in the collection.
