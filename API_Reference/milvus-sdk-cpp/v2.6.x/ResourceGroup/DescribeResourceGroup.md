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

*Status*

Returns a Status indicating whether the operation succeeded. On success, the DescribeResourceGroupResponse carries the resource group description.

- **response** (*DescribeResourceGroupResponse*) -

    - **Desc** (*const ResourceGroupDesc&*) -

        Get resource group description.

        - **Name** (*const std::string&*) -

            Name of the resource group.

        - **Capacity** (*uint32_t*) -

            Capacity of requested nodes.

        - **AvailableNodesNum** (*uint32_t*) -

            Number of available nodes.

        - **LoadedReplicasNum** (*const std::unordered_map<std::string, uint32_t>&*) -

            Loaded replica number for each collection.

        - **OutgoingNodesNum** (*const std::unordered_map<std::string, uint32_t>&*) -

            Accessed other resource group's nodes number for each collection.

        - **IncomingNodesNum** (*const std::unordered_map<std::string, uint32_t>&*) -

            The number of nodes accessed by other resource groups for each collection.

        - **Config** (*const ResourceGroupConfig&*) -

            Configurations of the resource group.

            - **Requests** (*uint32_t*) -

                Number of requested nodes.

            - **Limits** (*uint32_t*) -

                Maximum number of nodes.

            - **TransferFromGroups** (*const std::set<std::string>&*) -

                Group names from which the nodes can be transferred.

            - **TransferToGroups** (*const std::set<std::string>&*) -

                Group names to which the nodes can be transferred.

            - **NodeFilters** (*const std::unordered_map<std::string, std::string>&*) -

                Node filters; the resource group will prefer to accept nodes matching the filter.

        - **Nodes** (*const std::vector<NodeInfo>&*) -

            Basic informations of all nodes in the resource group.

            - **id_** (*int64_t*) -

                id of this node.

            - **address_** (*std::string*) -

                address of this node.

            - **hostname_** (*std::string*) -

                hostname of this node.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
