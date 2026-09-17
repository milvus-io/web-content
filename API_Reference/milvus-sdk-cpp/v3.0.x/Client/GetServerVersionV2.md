# GetServerVersionV2()

This operation returns the Milvus server version, optionally including detailed build information.

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

    Sets whether to return detailed build information of the Milvus server.

**RETURNS:**

*Status* with *GetServerVersionResponse*

Check `status.IsOk()` to confirm success.

**PARAMETERS:**

- **Version** (*std::string&*)

    The version of the Milvus server, accessible via `response.Version()`.

- **BuildTime** (*std::string&*)

    The build time of the server, accessible via `response.BuildTime()`. Populated when `WithDetail(true)` is set.

- **GitCommit** (*std::string&*)

    The git commit of the server build, accessible via `response.GitCommit()`. Populated when `WithDetail(true)` is set.

- **GoVersion** (*std::string&*)

    The Go version used to build the server, accessible via `response.GoVersion()`. Populated when `WithDetail(true)` is set.

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
status = client->GetServerVersionV2(milvus::GetServerVersionRequest(), response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "The milvus server version is: " << response.Version() << std::endl;
```
