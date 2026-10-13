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

Returns a Status indicating whether the operation succeeded. The list of registered file resources is carried in the response object.

- **response** (*ListFileResourcesResponse*) -

    - **Resources** (*const std::vector<FileResourceInfo>&*) -

        Get the file resources.

        - **Name** (*const std::string&*) -

            Name of the resource.

        - **Path** (*const std::string&*) -

            File path of the resource.

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
