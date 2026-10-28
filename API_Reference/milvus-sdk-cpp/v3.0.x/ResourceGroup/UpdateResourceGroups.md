# UpdateResourceGroups()

This operation updates resource groups.

```cpp
Status UpdateResourceGroups(const UpdateResourceGroupsRequest& request)
```

## Request Syntax

```cpp
auto request = UpdateResourceGroupsRequest()
    .WithGroups(value);
```

**REQUEST METHODS:**

- `WithGroups(std::unordered_map<std::string, ResourceGroupConfig>&& groups)`

    Sets the resource groups to be updated.

- `SetGroups(std::unordered_map<std::string, ResourceGroupConfig>&& groups)`

    Set the resource groups to be updated.

- `AddGroup(const std::string& name, ResourceGroupConfig&& config)`

    Adds a resource group to be updated.

**RETURNS:**

*[Status](../Client/Status.md)*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::unordered_map<std::string, milvus::ResourceGroupConfig> groups;
groups["my_resource_group"] = milvus::ResourceGroupConfig();

status = client->UpdateResourceGroups(
    milvus::UpdateResourceGroupsRequest()
        .WithGroups(std::move(groups)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
