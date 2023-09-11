# LoadAsync()

Loads a collection into memory so that it can be searched or queried.

## Invocation

```c#
await collection.LoadAsync(replicaNumber = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `replicaNumber`     | An optional replica number to load.                                                                         | `int?`                          | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

This method does not return any value.
