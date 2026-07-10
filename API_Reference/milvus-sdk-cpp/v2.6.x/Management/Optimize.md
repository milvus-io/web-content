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

*Status* with *[OptimizeTaskPtr](OptimizeTask.md)*

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
