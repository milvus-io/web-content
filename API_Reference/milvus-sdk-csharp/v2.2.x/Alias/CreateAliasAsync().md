# CreateAliasAsync()

Creates an alias for a collection.

## Invocation

```c#
await milvusClient.CreateAliasAsync(collectionName, alias, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `collectionName`    | The name of the collection for which to create the alias.                                                     | `string`                        | True     |
| `alias`             | The alias to be created.                                                                                      | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
