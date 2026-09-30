# AddFileResource()

This operation registers a file resource with Milvus. Use it when server-side features need a named file resource.

```cpp
Status AddFileResource(const AddFileResourceRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::AddFileResourceRequest()
    .WithName("embedding_model")
    .WithPath("/models/embedding.bin");
```

**REQUEST METHODS:**

- `WithName(const std::string& name)`

    Sets the resource name.

- `WithPath(const std::string& path)`

    Sets the file path for the resource.

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

auto request = milvus::AddFileResourceRequest()
    .WithName("embedding_model")
    .WithPath("/models/embedding.bin");
status = client->AddFileResource(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
