# DescribeResourceGroup()

This operation describes a resource group.

```cpp
Status DescribeResourceGroup(const DescribeResourceGroupRequest& request, DescribeResourceGroupResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeResourceGroupRequest()
    .WithGroupName(name);
```

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Sets the name of the resource group.

**RETURNS:**

*Status* with *DescribeResourceGroupResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

DescribeResourceGroupResponse response;
auto status = client->DescribeResourceGroup(
    DescribeResourceGroupRequest().WithGroupName("my_rg"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const ResourceGroupDesc& desc = response.Desc();
std::cout << "Name:      " << desc.Name() << "\n"
          << "Capacity:  " << desc.Capacity() << "\n"
          << "Available: " << desc.AvailableNodesNum() << "\n";

for (const auto& node : desc.Nodes()) {
    std::cout << "  node id=" << node.id_
              << " addr=" << node.address_ << "\n";
}
```
