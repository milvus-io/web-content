# optimize()

This operation optimizes the physical layout of a collection's data, for example by compacting segments to a target size or rebuilding indexes.

```java
public OptimizeTask optimize(OptimizeReq request)
```

## Request Syntax

```java
optimize(OptimizeReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .targetSize(String targetSize)
    .async(boolean async)
    .timeout(Long timeout)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)`

    The name of the target collection.

- `targetSize(String targetSize)`

    The target segment size, e.g. `"512MB"` or `"1GB"`. A `null` value uses the server default.

- `async(boolean async)`

    Whether to run the optimization in the background. When `false` (default), the operation blocks until the optimization finishes. When `true`, it returns an `OptimizeTask` immediately.

- `timeout(Long timeout)`

    The timeout in milliseconds. A `null` value means no timeout.

**RETURNS:**

*OptimizeTask*

An **OptimizeTask** that tracks progress and provides the optimization result.

### OptimizeTask

**METHODS:**

- `void start()` — Starts the optimization task.

- `boolean isDone()` — Returns whether the optimization has completed.

- `boolean isCancelled()` — Returns whether the optimization was cancelled.

- `ProgressStage getProgress()` — Returns the current progress stage.

- `List<String> getProgressHistoryAsStrings()` — Returns the progress history as strings.

- `boolean cancel()` — Attempts to cancel the optimization.

- `OptimizeResp getResult(Long timeoutMs)` — Blocks until the result is available or the timeout elapses, then returns the `OptimizeResp`.

**ProgressStage** values: `INITIALIZING`, `WAITING_FOR_INDEXES`, `COMPACTING`, `WAITING_FOR_COMPACTION`, `WAITING_FOR_INDEX_REBUILD`, `REFRESHING_LOAD`, `CANCELLED`.

### OptimizeResp

**METHODS:**

- `String getStatus()` — Returns the operation status.

- `String getCollectionName()` — Returns the name of the optimized collection.

- `Long getCompactionId()` — Returns the compaction ID.

- `String getTargetSize()` — Returns the target segment size.

- `List<String> getProgress()` — Returns the progress messages.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.OptimizeReq;
import io.milvus.v2.service.utility.OptimizeTask;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

OptimizeTask task = client.optimize(OptimizeReq.builder()
        .collectionName("my_collection")
        .targetSize("512MB")
        .build());
```

<!-- category: Management; action: CREATE; addedSince: v3.0.x -->
