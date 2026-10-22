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

Returns a Status indicating whether the operation succeeded. The resource group description is carried in the response object.

- **response** (*DescribeResourceGroupResponse*) -

    - **Desc** (*const ResourceGroupDesc&*) -

        Get resource group description.

        - **AvailableNodesNum** (*uint32_t*) -

            Number of available nodes.

        - **Capacity** (*uint32_t*) -

            Capacity of requested nodes.

        - **Config** (*const ResourceGroupConfig&*) -

            Configurations of the resource group.

            - **Limits** (*uint32_t*) -

                Maximum number of nodes.

            - **NodeFilters** (*const std::unordered_map<std::string, std::string>&*) -

                Node filters that the resource group prefers.

            - **Requests** (*uint32_t*) -

                Number of requested nodes.

            - **TransferFromGroups** (*const std::set<std::string>&*) -

                Group names from which nodes can be transferred.

            - **TransferToGroups** (*const std::set<std::string>&*) -

                Group names to which nodes can be transferred.

        - **IncomingNodesNum** (*const std::unordered_map<std::string, uint32_t>&*) -

            Number of nodes accessed by other resource groups, per collection.

        - **LoadedReplicasNum** (*const std::unordered_map<std::string, uint32_t>&*) -

            Loaded replica number for each collection.

        - **Name** (*const std::string&*) -

            Name of the resource group.

        - **Nodes** (*const std::vector<NodeInfo>&*) -

            Basic information of all nodes in the resource group.

            - **id_** (*int64_t*) -

                ID of this node.

            - **address_** (*std::string*) -

                Address of this node.

            - **hostname_** (*std::string*) -

                Hostname of this node.

        - **OutgoingNodesNum** (*const std::unordered_map<std::string, uint32_t>&*) -

            Number of other resource group nodes accessed, per collection.

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
