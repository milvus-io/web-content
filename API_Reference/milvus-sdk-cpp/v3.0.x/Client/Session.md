# Session()

This operation creates a cluster-scoped session exposing DQL interfaces only, bound to a specific on-demand cluster.

<div class="alert note">

This operation applies to Zilliz Cloud only.

</div>

```cpp
Status Session(const std::string& cluster_id, MilvusClientV2SessionPtr& session)
```

**PARAMETERS:**

- **cluster_id** (*const std::string&*)

    **[REQUIRED]**

    The identifier of the target cluster.

- **session** (*MilvusClientV2SessionPtr&*)

    Sets a variable that holds the returned cluster-scoped client view.

## Request Syntax

```cpp
milvus::MilvusClientV2SessionPtr session;
auto status = client->Session("cluster-a", session);
```

**RETURNS:**

*[Status](Status.md)*

Check `status.IsOk()` to confirm success. On success, the `session` out-parameter holds a cluster-scoped view of the client exposing only DQL interfaces, and all operations performed through it are automatically routed to the target cluster.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md). The SDK converts internal exceptions into a non-OK [Status](Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    return;
}

milvus::MilvusClientV2SessionPtr session;
status = client->Session("cluster-a", session);
if (!status.IsOk()) {
    return;
}

milvus::SearchRequest request;
request.WithCollectionName("demo").WithLimit(3);
request.AddFloatVector(std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f});
milvus::SearchResponse response;
session->Search(request, response);
```
