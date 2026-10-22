# DropResourceGroup()

This operation drops a resource group.

```cpp
Status DropResourceGroup(const DropResourceGroupRequest& request)
```

## Request Syntax

```cpp
auto request = DropResourceGroupRequest()
    .WithGroupName(name);
```

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Sets the name of the resource group.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

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

status = client->DropResourceGroup(
    milvus::DropResourceGroupRequest()
        .WithGroupName("my_resource_group"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
