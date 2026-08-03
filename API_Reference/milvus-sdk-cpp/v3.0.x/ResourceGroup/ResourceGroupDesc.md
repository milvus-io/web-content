# ResourceGroupDesc

This page documents both `ResourceGroupDesc` and `NodeInfo`. `ResourceGroupDesc` represents the current state of a resource group and is returned by calling `Desc()` on a `DescribeResourceGroupResponse`. It includes configuration, node counts, and the list of query nodes currently in the group.

## ResourceGroupDesc

```cpp
const ResourceGroupDesc& desc = response.Desc();
```

**Methods:**

- `const std::string& Name() const`

    Name of the resource group.

- `uint32_t Capacity() const`

    Configured node capacity (the `Requests` value from `ResourceGroupConfig`).

- `uint32_t AvailableNodesNum() const`

    Number of query nodes currently available in the resource group.

- `const std::unordered_map<std::string, uint32_t>& LoadedReplicasNum() const`

    Map from collection name to the number of loaded replicas in this group.

- `const std::unordered_map<std::string, uint32_t>& OutgoingNodesNum() const`

    Map from collection name to the count of nodes this group is borrowing from other groups.

- `const std::unordered_map<std::string, uint32_t>& IncomingNodesNum() const`

    Map from collection name to the count of nodes other groups are borrowing from this group.

- `const ResourceGroupConfig& Config() const`

    The current configuration of the resource group. For ResourceGroupConfig details see ResourceGroupConfig.

- `const std::vector<NodeInfo>& Nodes() const`

    List of query nodes currently assigned to this resource group. Each entry is a NodeInfo struct (see below).

## NodeInfo

`NodeInfo` is a plain struct that describes a single query node.

```cpp
struct NodeInfo {
    NodeInfo(int64_t id, const std::string& address, const std::string& hostname);

    int64_t     id_;        // Server-assigned node ID
    std::string address_;   // Network address (host:port)
    std::string hostname_;  // Hostname of the node
};
```

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

DescribeResourceGroupResponse response;
auto status = client->DescribeResourceGroup(
    DescribeResourceGroupRequest().WithGroupName("gpu_group"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const ResourceGroupDesc& desc = response.Desc();
std::cout << "Name:      " << desc.Name() << "\n"
          << "Capacity:  " << desc.Capacity() << "\n"
          << "Available: " << desc.AvailableNodesNum() << "\n";

for (const auto& node : desc.Nodes()) {
    std::cout << "  Node id=" << node.id_
              << " addr=" << node.address_ << "\n";
}
```
