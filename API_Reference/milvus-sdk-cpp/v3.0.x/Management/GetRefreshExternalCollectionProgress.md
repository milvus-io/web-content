# GetRefreshExternalCollectionProgress()

This operation gets progress for a refresh-external-collection job. Use it to poll job completion and inspect failure reasons.

```cpp
Status GetRefreshExternalCollectionProgress(const GetRefreshExternalCollectionProgressRequest& request, GetRefreshExternalCollectionProgressResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetRefreshExternalCollectionProgressRequest()
    .WithJobID(job_id);
```

**REQUEST METHODS:**

- `WithJobID(int64_t job_id)`

    Sets the refresh job ID returned by `RefreshExternalCollection()`.

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

auto request = milvus::GetRefreshExternalCollectionProgressRequest()
    .WithJobID(job_id);
milvus::GetRefreshExternalCollectionProgressResponse response;
status = client->GetRefreshExternalCollectionProgress(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
