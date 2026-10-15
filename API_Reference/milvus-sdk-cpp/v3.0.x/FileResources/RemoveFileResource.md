# RemoveFileResource()

This operation removes a registered file resource. Use it to clean up resources that are no longer referenced.

```cpp
Status RemoveFileResource(const RemoveFileResourceRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::RemoveFileResourceRequest()
    .WithName("embedding_model");
```

**REQUEST METHODS:**

- `WithName(const std::string& name)`

    Sets the resource name to remove.

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

auto request = milvus::RemoveFileResourceRequest()
    .WithName("embedding_model");
status = client->RemoveFileResource(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
