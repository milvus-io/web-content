# CheckHealth()

This operation checks the health of the connected Milvus server. If the server is unhealthy, the response carries the reasons and any quota states that prevent it from providing service.

```cpp
Status CheckHealth(const CheckHealthRequest& request, CheckHealthResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the health-check call succeeded, and fills the response with whether the server is healthy and, if it is not, the reasons and quota states reported by the server.

- **response** (*CheckHealthResponse*) -

    - **IsHealthy** (*bool*) -

        Get whether the Milvus server is healthy.

    - **Reasons** (*const std::vector<std::string>&*) -

        Get the reasons why the Milvus server is unhealthy.

    - **QuotaStates** (*const std::vector<std::string>&*) -

        Get the quota states that prevent the Milvus server from providing service.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Check server health after connecting a MilvusClientV2 and inspect the reported state.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CheckHealthRequest request;
milvus::CheckHealthResponse response;
status = client->CheckHealth(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
if (response.IsHealthy()) {
    std::cout << "Milvus server is healthy" << std::endl;
} else {
    for (const auto& reason : response.Reasons()) {
        std::cout << reason << std::endl;
    }
}
```
