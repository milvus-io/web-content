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

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the DescribeResourceGroupResponse carries the resource group description.

- **response** (*DescribeResourceGroupResponse*) -

    - **Desc** (*const ResourceGroupDesc&*) -

        Get resource group description. See the `### ResourceGroupDesc` section below.

### ResourceGroupDesc

This class represents the current state of a resource group, including its configuration, node counts, and the list of query nodes currently in the group. It is returned by calling `Desc()` on a `DescribeResourceGroupResponse`.

```cpp
const ResourceGroupDesc& desc = response.Desc();
```

**METHODS:**

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

    The current configuration of the resource group. See [ResourceGroupConfig](ResourceGroupConfig.md).

- `const std::vector<NodeInfo>& Nodes() const`

    List of query nodes currently assigned to this resource group. Each entry is a NodeInfo struct (see below).

### NodeInfo

`NodeInfo` is a plain struct that describes a single query node.

```cpp
struct NodeInfo {
    NodeInfo(int64_t id, const std::string& address, const std::string& hostname);

    int64_t     id_;        // Server-assigned node ID
    std::string address_;   // Network address (host:port)
    std::string hostname_;  // Hostname of the node
};
```

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
