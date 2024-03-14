# AlterAliasAsync()

Alters an alias to point to a new collection.

## Invocation

```c#
await milvusClient.AlterAliasAsync(collectionName, alias, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `collectionName`    | The name of the collection to which the alias should point.                                                   | `string`                        | True     |
| `alias`             | The alias to be altered.                                                                                      | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
