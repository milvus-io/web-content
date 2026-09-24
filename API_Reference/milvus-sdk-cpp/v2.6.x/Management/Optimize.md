# Optimize()

This operation triggers a server-side compaction on the collection's segments with a target segment size, then monitors it to completion: it waits for vector-field indexes to finish before and after compaction, polls the compaction state until it completes, and refreshes the load of a loaded collection so post-compaction segments become available. When the request's async option is false (the default) the whole workflow runs on the calling thread and the returned Status is the final result; when true it runs on a background thread owned by the returned OptimizeTask, which supports polling, waiting, cancellation, and progress reporting.

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

    Sets the name of the database in which the collection is created. Defaults to the client's current database when empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to be optimized; it must not be empty.

- `WithTargetSize(const std::string& target_size)`

    Sets the target segment size for compaction, such as "512MB" or "1GB"; accepted units are B, KB, MB, GB, TB, and PB, and the value must be at least 1MB.

- `WithAsync(bool async)`

    Sets whether to run the optimization asynchronously on a background task; defaults to false.

- `WithTimeoutMs(int64_t timeout_ms)`

    Sets the overall task timeout in milliseconds. Zero means no overall timeout.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded: in synchronous mode it carries the final optimization outcome, and in asynchronous mode it is OK once the task has started (task progress and the final result are obtained from the OptimizeTask output parameter).

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

- **std::exception**

    When the optimization fails, such as an empty collection name, an invalid target size, RPC transport errors, a failed compaction, an index failure, or the overall timeout being exceeded. Inspect the returned Status (or, for asynchronous runs, the task's TaskStatus and progress messages) for failure details.

## Example

Optimize a collection after connecting a MilvusClientV2; the call fills an OptimizeTask that reports progress and the final result.

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
    .WithTargetSize("512MB");
milvus::OptimizeTaskPtr task;
status = client->Optimize(request, task);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
