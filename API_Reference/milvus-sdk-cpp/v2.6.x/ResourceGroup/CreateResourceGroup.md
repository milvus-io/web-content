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

- `WithConfig(ResourceGroupConfig&& config)`

    Sets resource group configuration.

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

milvus::ResourceGroupConfig rg_config;

status = client->CreateResourceGroup(
    milvus::CreateResourceGroupRequest()
        .WithName("my_resource_group")
        .WithConfig(std::move(rg_config)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
