# Optimize()

This operation optimizes a collection's segments by waiting for pending index builds, compacting toward the requested target segment size, and refreshing the load state if the collection is loaded. With the async option the work runs in a background task exposed through the OptimizeTask handle, which yields the final result.

```cpp
Status Optimize(const OptimizeRequest& request, OptimizeTaskPtr& task)
```

## Request Syntax

```cpp
auto request = OptimizeRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithTargetSize(target_size)
    .WithAsync(async)
    .WithTimeoutMs(timeout_ms);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database; the default database is used if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to be optimized. This value cannot be empty.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection to be optimized.

- `WithTargetSize(const std::string& target_size)`

    Sets the target segment size for optimization, such as "512MB" or "1GB".

- `SetTargetSize(const std::string& target_size)`

    Set target segment size.

- `WithAsync(bool async)`

    Sets whether the optimization runs asynchronously. When true, Optimize() returns as soon as the background task starts; when false, the call blocks until the optimization completes.

- `SetAsync(bool async)`

    Set async option.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the overall task timeout in milliseconds. Zero means no overall timeout.

- `SetTimeoutMs(int64_t timeout_ms)`

    Set overall task timeout in milliseconds. Zero means no overall timeout.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. In synchronous mode it reflects the outcome of the whole optimization run; in asynchronous mode it indicates whether the background task was started, whose final status is available through the OptimizeTask handle.

- **response** (*OptimizeTaskPtr*) -

    - **GetResult** (*Status*) -

        Wait for task result. Timeout zero means wait forever.

        - **StatusText** (*const std::string&*) -

            Get status text.

        - **CollectionName** (*const std::string&*) -

            Get collection name.

        - **CompactionID** (*int64_t*) -

            Get compaction ID.

        - **TargetSize** (*const std::string&*) -

            Get normalized target size.

        - **ProgressHistory** (*const std::vector<std::string>&*) -

            Get progress history.

    - **Cancel** (*bool*) -

        Cancel the task cooperatively.

    - **IsDone** (*bool*) -

        Whether the task is done.

    - **IsCancelled** (*bool*) -

        Whether the task is cancelled.

    - **CurrentProgress** (*std::string*) -

        Current progress message.

    - **ProgressHistory** (*std::vector<std::string>*) -

        Progress message history.

    - **TaskStatus** (*Status*) -

        Final task status if done, otherwise OK.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call Optimize() on a connected MilvusClientV2 to compact a collection's segments toward the target size, using the OptimizeTask handle for the final result.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::OptimizeRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithTargetSize(target_size);
milvus::OptimizeTaskPtr task;
status = client->Optimize(request, task);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
