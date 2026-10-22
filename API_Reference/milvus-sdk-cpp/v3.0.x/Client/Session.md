# Session()

Create a cluster-scoped session exposing DQL interfaces only.

```cpp
Status Session(const std::string& cluster_id, MilvusClientV2SessionPtr& session)
```

**PARAMETERS:**

- **cluster_id** (*const std::string&*)

    Target cluster identifier.

- **session** (*MilvusClientV2SessionPtr&*)

    Output parameter that receives the cluster-scoped client view.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

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

milvus::MilvusClientV2SessionPtr session;
status = client->Session(cluster_id, session);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
