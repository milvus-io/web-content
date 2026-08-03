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

- `WithFlushAllTs(uint64_t flush_all_ts)`

    Sets the timestamp returned by `FlushAll()`.

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
