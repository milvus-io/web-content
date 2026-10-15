# FlushAll()

This operation flushes insert buffers for all collections in a database. Use it before backup or verification workflows that require persisted writes.

```cpp
Status FlushAll(const FlushAllRequest& request, FlushAllResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::FlushAllRequest()
    .WithDatabaseName("default")
    .WithWaitFlushedMs(60000);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database whose collections should be flushed.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which collections are flushed.

- `WithWaitFlushedMs(int64_t wait_flushed_ms)`

    Sets how long to wait for all flush operations to finish. Zero means wait indefinitely.

- `SetWaitFlushedMs(int64_t ms)`

    Set milliseconds to wait the flush-all action done. Default value is 0, which means forever.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The flush-all timestamp is carried in the response object.

- **response** (*FlushAllResponse*) -

    - **FlushAllTs** (*uint64_t*) -

        Get flush-all timestamp.

**EXCEPTIONS:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::FlushAllRequest()
    .WithDatabaseName("default")
    .WithWaitFlushedMs(60000);
milvus::FlushAllResponse response;
status = client->FlushAll(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Management; action: CREATE; addedSince: v3.0.x -->
