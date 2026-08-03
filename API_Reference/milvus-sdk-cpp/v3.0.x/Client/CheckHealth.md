# CheckHealth()

This operation checks the server's health status.

```cpp
Status CheckHealth(const CheckHealthRequest& request, CheckHealthResponse& response)
```

**RETURNS:**

*Status* with *CheckHealthResponse*

Check `status.IsOk()` to confirm success.

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

milvus::CheckHealthResponse resp_health;
status = client->CheckHealth(milvus::CheckHealthRequest(), resp_health);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
if (resp_health.IsHealthy()) {
    std::cout << "The milvus server is healthy" << std::endl;
}
```
