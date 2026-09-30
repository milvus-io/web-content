# CheckHealth()

This operation checks the health of the connected Milvus server; the response reports whether the server is healthy and, if not, the reasons.

```cpp
Status CheckHealth(const CheckHealthRequest& request, CheckHealthResponse& response)
```

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded; the response carries the health flag and, if unhealthy, the reasons.

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

Call CheckHealth() on a connected MilvusClientV2 to check the server's health and report any failure reasons.

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
```
