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

- `WithWaitFlushedMs(int64_t wait_flushed_ms)`

    Sets how long to wait for all flush operations to finish. Zero means wait indefinitely.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **std::exception**

    This exception can be raised if the request cannot be sent or the response cannot be parsed.

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
