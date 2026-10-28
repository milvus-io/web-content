# CreateResourceGroup()

This operation creates a resource group. 

```cpp
Status CreateResourceGroup(const CreateResourceGroupRequest& request)
```

<div class="alert note">

A resource group physically isolates certain query nodes from others. For details, refer to [this page](https://milvus.io/docs/resource_group.md#Manage-Resource-Groups).

</div>

## Request Syntax

```cpp
auto request = CreateResourceGroupRequest()
    .WithName(name)
    .WithConfig(config);
```

**REQUEST METHODS:**

- `WithName(const std::string& name)`

    Sets the name of the resource group.

- `SetName(const std::string& name)`

    Set name of the resource group.

- `WithConfig(ResourceGroupConfig&& config)`

    Sets resource group configuration.

- `SetConfig(ResourceGroupConfig&& config)`

    Set resource group config.

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

milvus::ResourceGroupConfig rg_config;

status = client->CreateResourceGroup(
    milvus::CreateResourceGroupRequest()
        .WithName("my_resource_group")
        .WithConfig(std::move(rg_config)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
