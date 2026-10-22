# GetServerVersionV2()

This operation returns the Milvus server version. When the request's `WithDetail(true)` is set, the response also carries the build time, git commit, Go version, and deploy mode of the server.

```cpp
Status GetServerVersionV2(const GetServerVersionRequest& request, GetServerVersionResponse& response)
```

## Request Syntax

```cpp
auto request = GetServerVersionRequest()
    .WithDetail(detail);
```

**REQUEST METHODS:**

- `WithDetail(bool detail)`

    When `true`, the response also carries the server build time, git commit, Go version, and deploy mode.

**RETURNS:**

*Status* with *GetServerVersionResponse*

Check `status.IsOk()` to confirm success.

### GetServerVersionResponse

**METHODS:**

- `const std::string& Version() const`

    Returns the server version.

- `const std::string& BuildTime() const`

    Returns the server build time. Populated when the request sets `WithDetail(true)`.

- `const std::string& GitCommit() const`

    Returns the server git commit. Populated when the request sets `WithDetail(true)`.

- `const std::string& GoVersion() const`

    Returns the Go version used to build the server. Populated when the request sets `WithDetail(true)`.

- `const std::string& DeployMode() const`

    Returns the server deploy mode. Populated when the request sets `WithDetail(true)`.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetServerVersionRequest request;
request.WithDetail(true);
milvus::GetServerVersionResponse response;
status = client->GetServerVersionV2(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "The milvus server version is: " << response.Version() << std::endl;
```
