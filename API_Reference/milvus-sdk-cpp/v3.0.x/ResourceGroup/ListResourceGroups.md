# ListResourceGroups()

This operation lists all the resource groups under the current database.

```cpp
Status ListResourceGroups(const ListResourceGroupsRequest& request, ListResourceGroupsResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The list of resource group names is carried in the response object.

- **response** (*ListResourceGroupsResponse*) -

    - **GroupNames** (*const std::vector<std::string>&*) -

        Get names of resource groups.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListResourceGroupsResponse response;
status = client->ListResourceGroups(
    milvus::ListResourceGroupsRequest(),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& name : response.GroupNames()) {
    std::cout << "Resource group: " << name << std::endl;
}
```
