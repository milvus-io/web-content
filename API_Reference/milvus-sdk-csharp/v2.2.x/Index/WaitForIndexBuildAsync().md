# WaitForIndexBuildAsync()

Polls Milvus for building progress of an index until it is fully built.
To perform a single progress check, use `GetIndexBuildProgressAsync`.

## Invocation

```c#
await collection.WaitForIndexBuildAsync(fieldName, indexName = null, waitingInterval = null, timeout = null, progress = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `fieldName`         | The name of the field which has the index.                                                                    | `string`                        | True     |
| `indexName`         | An optional name of the index.                                                                                | `string?`                       | False    |
| `waitingInterval`   | Waiting interval. Defaults to 500 milliseconds.                                                               | `TimeSpan?`                     | False    |
| `timeout`           | How long to poll for before throwing a `TimeoutException`.                                                    | `TimeSpan?`                     | False    |
| `progress`          | Provides information about the progress of the loading operation.                                             | `IProgress<long>?`              | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
