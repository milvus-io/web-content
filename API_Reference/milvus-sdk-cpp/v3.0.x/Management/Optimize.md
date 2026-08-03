# Optimize()

This operation triggers optimize compaction for a collection and returns an asynchronous task handle that can be polled, cancelled, or awaited.

```cpp
Status Optimize(const OptimizeRequest& request, OptimizeTaskPtr& task)
```

## Request Syntax

```cpp
auto request = OptimizeRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithTargetSize("512MB")
    .WithAsync(true)
    .WithTimeoutMs(0);
```

### OptimizeRequest

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection to optimize.

- `WithTargetSize(const std::string& target_size)`

    Sets desired compacted segment size such as `"512MB"` or `"1GB"`.

- `WithAsync(bool async)`

    When `true`, optimization is scheduled asynchronously.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the overall task timeout in milliseconds. `0` means no overall timeout.

**RETURNS:**

*Status* with *OptimizeTaskPtr*

### OptimizeResponse

This class represents optimize task output including normalized target size, compaction ID, and progress history.

```cpp
const OptimizeResponse& response = resp;
```

**METHODS:**

- `const std::string& StatusText() const`

    Returns the current status text reported by optimize execution.

- `const std::string& CollectionName() const`

    Returns the collection being optimized.

- `int64_t CompactionID() const`

    Returns the compaction task ID.

- `const std::string& TargetSize() const`

    Returns the normalized target size used by the optimizer.

- `const std::vector<std::string>& ProgressHistory() const`

    Returns progress messages collected during task execution.

### OptimizeTask

This class represents an asynchronous optimize task that can be cancelled, awaited, and queried for progress.

```cpp
const OptimizeTaskPtr& task = optimize_task;
```

**METHODS:**

- `Status GetResult(OptimizeResponse& response, int64_t timeout_ms = 0)`

    Waits for completion and fills `response`. `timeout_ms = 0` waits indefinitely.

- `bool Cancel()`

    Requests cooperative cancellation of the task.

- `bool IsDone() const`

    Returns whether task execution has finished.

- `bool IsCancelled() const`

    Returns whether cancellation was requested and accepted.

- `std::string CurrentProgress() const`

    Returns the latest progress message.

- `std::vector<std::string> ProgressHistory() const`

    Returns all recorded progress messages.

- `Status TaskStatus() const`

    Returns the final task status when done, otherwise an OK status.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for invalid request parameters, optimize scheduling failures, or timeout errors.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::OptimizeTaskPtr task;
status = client->Optimize(
    milvus::OptimizeRequest()
        .WithCollectionName("my_collection")
        .WithTargetSize("512MB")
        .WithAsync(true),
    task);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::OptimizeResponse response;
status = task->GetResult(response, 60000);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
