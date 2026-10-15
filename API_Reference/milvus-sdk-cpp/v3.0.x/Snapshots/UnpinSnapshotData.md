# UnpinSnapshotData()

This operation unpins snapshot data. Use it when pinned data is no longer needed before its TTL expires.

```cpp
Status UnpinSnapshotData(const UnpinSnapshotDataRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::UnpinSnapshotDataRequest()
    .WithPinID(pin_id);
```

**REQUEST METHODS:**

- `WithPinID(int64_t pin_id)`

    Sets the ID of the pin whose data should be unpinned.

- `SetPinID(int64_t pin_id)`

    Set the pin identifier.

**RETURNS:**

*Status*

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

auto request = milvus::UnpinSnapshotDataRequest()
    .WithPinID(pin_id);
status = client->UnpinSnapshotData(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
