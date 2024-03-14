# CreateDatabaseAsync()

Creates a new database.

## Invocation

```c#
await milvusClient.CreateDatabaseAsync(databaseName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `databaseName`      | The name of the new database to be created.                                                                   | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
