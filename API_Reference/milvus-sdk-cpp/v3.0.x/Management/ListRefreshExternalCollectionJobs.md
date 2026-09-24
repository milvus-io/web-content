# ListRefreshExternalCollectionJobs()

This operation lists refresh jobs for external collections. Use it to inspect historical or in-flight external collection refresh activity.

```cpp
Status ListRefreshExternalCollectionJobs(const ListRefreshExternalCollectionJobsRequest& request, ListRefreshExternalCollectionJobsResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListRefreshExternalCollectionJobsRequest();
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

auto request = milvus::ListRefreshExternalCollectionJobsRequest();
milvus::ListRefreshExternalCollectionJobsResponse response;
status = client->ListRefreshExternalCollectionJobs(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
