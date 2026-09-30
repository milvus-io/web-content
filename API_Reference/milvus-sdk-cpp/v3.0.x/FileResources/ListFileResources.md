# ListFileResources()

This operation lists registered file resources. Use it to discover resource names and paths available to server-side features.

```cpp
Status ListFileResources(const ListFileResourcesRequest& request, ListFileResourcesResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListFileResourcesRequest();
```

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

auto request = milvus::ListFileResourcesRequest();
milvus::ListFileResourcesResponse response;
status = client->ListFileResources(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
