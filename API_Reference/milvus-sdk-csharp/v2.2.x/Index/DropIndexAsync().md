# DropIndexAsync()

Drops an index.

## Invocation

```c#
await collection.DropIndexAsync(fieldName, indexName = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `fieldName`         | The name of the field which has the index to be dropped.                                                      | `string`                        | True     |
| `indexName`         | An optional name for the index to be dropped.                                                                 | `string?`                       | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
