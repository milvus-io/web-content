# DropDatabaseAsync()

Drops a database.

## Invocation

```c#
await milvusClient.DropDatabaseAsync(databaseName, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `databaseName`      | The name of the database to be dropped.                                                                       | `string`                        | True     |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
