# ResourceGroupConfig

This class specifies the node allocation and transfer policy for a resource group. Pass a `ResourceGroupConfig` to `CreateResourceGroupRequest::WithConfig()` when creating or updating a resource group.

```cpp
ResourceGroupConfig config;
```

**METHODS:**

- `uint32_t Requests() const` / `void SetRequests(uint32_t num)`

    The minimum number of query nodes the resource group requests from the pool. The system attempts to keep at least this many nodes in the group.

- `uint32_t Limits() const` / `void SetLimits(uint32_t num)`

    The maximum number of query nodes the resource group may hold. Setting this caps growth even when spare nodes are available.

- `const std::set<std::string>& TransferFromGroups() const` / `void AddTransferFromGroup(const std::string& group_name)`

    Names of resource groups from which spare nodes may be transferred into this group.

- `const std::set<std::string>& TransferToGroups() const` / `void AddTransferToGroup(const std::string& group_name)`

    Names of resource groups to which surplus nodes from this group may be transferred.

- `const std::unordered_map<std::string, std::string>& NodeFilters() const` / `void AddNodeFilter(const std::string& key, const std::string& value)`

    Label-based node affinity filters. Only nodes whose labels match all specified key-value pairs are eligible to join this group. For example, `AddNodeFilter("GPU", "A100")`.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

ResourceGroupConfig config;
config.SetRequests(2);
config.SetLimits(4);
config.AddTransferFromGroup("__default_resource_group");
config.AddNodeFilter("GPU", "A100");

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

auto status = client->CreateResourceGroup(
    CreateResourceGroupRequest()
        .WithGroupName("gpu_group")
        .WithConfig(config));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
