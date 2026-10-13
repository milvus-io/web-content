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

milvus::ListResourceGroupsResponse response;
status = client->ListResourceGroups(
    milvus::ListResourceGroupsRequest(),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& name : response.ResourceGroups()) {
    std::cout << "Resource group: " << name << std::endl;
}
```
