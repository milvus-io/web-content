# RefreshExternalCollection()

This operation starts a refresh job for an external collection. Use it after external data changes and the collection metadata needs to be refreshed.

```cpp
Status RefreshExternalCollection(const RefreshExternalCollectionRequest& request, RefreshExternalCollectionResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::RefreshExternalCollectionRequest()
    .WithExternalSource("s3")
    .WithExternalSpec({{"bucket", "milvus-data"}, {"path", "collections/book"}});
```

**REQUEST METHODS:**

- `WithExternalSource(const std::string& external_source)`

    Sets the external source type.

- `WithExternalSpec(const nlohmann::json& external_spec)`

    Sets provider-specific refresh configuration as JSON.

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

auto request = milvus::RefreshExternalCollectionRequest()
    .WithExternalSource("s3")
    .WithExternalSpec({{"bucket", "milvus-data"}, {"path", "collections/book"}});
milvus::RefreshExternalCollectionResponse response;
status = client->RefreshExternalCollection(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
