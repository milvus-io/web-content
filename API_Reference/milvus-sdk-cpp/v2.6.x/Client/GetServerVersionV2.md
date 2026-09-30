# GetServerVersionV2()

This operation retrieves the version of the connected Milvus server. When the request detail option is enabled, the response also carries the server's build time, git commit, Go version, and deploy mode.

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

    Sets whether the response includes detailed build information of the Milvus server in addition to the version. Optional.

**RETURNS:**

*Status*

Returns a Status reporting whether the operation succeeded, and fills the response object with the Milvus server version, plus detailed build information when the detail option is enabled.

- **response** (*GetServerVersionResponse*) -

    - **Version** (*const std::string&*) -

        Version of the Milvus server.

    - **BuildTime** (*const std::string&*) -

        Build time of the Milvus server.

    - **GitCommit** (*const std::string&*) -

        Git commit of the Milvus server build.

    - **GoVersion** (*const std::string&*) -

        Go version used to build the Milvus server.

    - **DeployMode** (*const std::string&*) -

        Deploy mode of the Milvus server.

**ERROR HANDLING:**

- **std::exception**

    When the client is not connected, or the underlying RPC to the server fails or times out. the returned Status carries the error code and message; check it with IsOk() before reading the response.

## Example

Get the Milvus server version after connecting a MilvusClientV2, requesting detailed build information.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::GetServerVersionRequest().WithDetail(true);
milvus::GetServerVersionResponse response;
status = client->GetServerVersionV2(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Milvus server version: " << response.Version() << std::endl;
```
