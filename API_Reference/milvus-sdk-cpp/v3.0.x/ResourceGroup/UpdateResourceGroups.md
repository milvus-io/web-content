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

- `AddGroup(const std::string& name, ResourceGroupConfig&& config)`

    Adds a resource group to be updated.

**RETURNS:**

*Status*

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

std::unordered_map<std::string, milvus::ResourceGroupConfig> groups;
groups["my_resource_group"] = milvus::ResourceGroupConfig();

status = client->UpdateResourceGroups(
    milvus::UpdateResourceGroupsRequest()
        .WithGroups(std::move(groups)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
