# GetFlushAllState()

This operation checks whether a flush-all action has completed. Use it when you need to poll completion separately from the initial flush request.

```cpp
Status GetFlushAllState(const GetFlushAllStateRequest& request, GetFlushAllStateResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetFlushAllStateRequest()
    .WithDatabaseName("default")
    .WithFlushAllTs(flush_all_ts);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database used for the original flush-all operation.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which collections are flushed.

- `WithFlushAllTs(uint64_t flush_all_ts)`

    Sets the timestamp returned by `FlushAll()`.

- `SetFlushAllTs(uint64_t flush_all_ts)`

    Set flush-all timestamp returned by FlushAll().

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. Whether the flush-all action has finished is carried in the response object.

- **response** (*GetFlushAllStateResponse*) -

    - **Flushed** (*bool*) -

        Whether the flush-all action has finished.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::GetFlushAllStateRequest()
    .WithDatabaseName("default")
    .WithFlushAllTs(flush_all_ts);
milvus::GetFlushAllStateResponse response;
status = client->GetFlushAllState(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Management; action: CREATE; addedSince: v3.0.x -->
