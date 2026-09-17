# GetServerVersionV2()

This operation returns the Milvus server version. When the request's `Detail()` is `true`, the response also carries the build time, git commit, Go version, and deploy mode of the server.

```cpp
Status GetServerVersionV2(const GetServerVersionRequest& request, GetServerVersionResponse& response)
```

## Request Syntax

```cpp
auto request = GetServerVersionRequest()
    .WithDetail(detail);

milvus::GetServerVersionResponse response;
status = client->GetServerVersionV2(request, response);
```

**REQUEST METHODS:**

- `WithDetail(bool detail)`

    Sets whether to return detailed build information of the Milvus server. The default value is **False**.

**RETURNS:**

*Status* with *GetServerVersionResponse*

Check `status.IsOk()` to confirm success.

- `const std::string& Version() const`

    Returns the version of the Milvus server.

- `const std::string& BuildTime() const`

    Returns the build time of the Milvus server.

- `const std::string& GitCommit() const`

    Returns the git commit of the Milvus server build.

- `const std::string& GoVersion() const`

    Returns the Go version used to build the server.

- `const std::string& DeployMode() const`

    Returns the deploy mode of the server.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetServerVersionResponse response;
status = client->GetServerVersionV2(
    milvus::GetServerVersionRequest().WithDetail(true),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "The milvus server version is: " << response.Version() << std::endl;
```
