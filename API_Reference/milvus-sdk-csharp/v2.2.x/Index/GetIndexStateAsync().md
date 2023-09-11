# GetIndexStateAsync()

Gets the state of an index.

## Invocation

```c#
await collection.GetIndexStateAsync(fieldName, indexName = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `fieldName`         | The name of the field which has the index to get the state for.                                               | `string`                        | True     |
| `indexName`         | An optional name of the index to get the state for.                                                           | `string?`                       | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

The state of the index.
