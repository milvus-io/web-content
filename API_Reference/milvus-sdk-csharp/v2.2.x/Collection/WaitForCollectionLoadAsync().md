# WaitForCollectionLoadAsync()

Polls Milvus for loading progress of a collection until it is fully loaded.
To perform a single progress check, use `GetLoadingProgressAsync`.

## Invocation

```c#
await collection.WaitForCollectionLoadAsync(partitionNames = null, waitingInterval = null, timeout = null, progress = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `partitionNames`    | An optional list of partition names for which to check the loading progress.                                | `IReadOnlyList<string>?`        | False    |
| `waitingInterval`   | Waiting interval. Defaults to 500 milliseconds.                                                             | `TimeSpan?`                     | False    |
| `timeout`           | How long to poll for before throwing a `TimeoutException`.                                                  | `TimeSpan?`                     | False    |
| `progress`          | Provides information about the progress of the loading operation.                                           | `IProgress<long>?`              | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

This method does not return any value.
