# ResourceGroupConfig

The configuration of a resource group.

```csharp
public sealed class ResourceGroupConfig
{
    public int? RequestsNodeNum { get; set; }
    public int? LimitsNodeNum { get; set; }
    public IList<string> TransferFrom { get; }
    public IList<string> TransferTo { get; }
    public IDictionary<string, string> NodeFilterLabels { get; }
}
```

**PARAMETERS:**

- `RequestsNodeNum` (*int?*) -

    The number of nodes requested for the resource group.

- `LimitsNodeNum` (*int?*) -

    The maximum number of nodes the resource group may use.

- `TransferFrom` (*IList\<string\>*) -

    The resource groups from which nodes are transferred into this resource group. Entries are added via the collection-initializer syntax `TransferFrom = { ... }`.

- `TransferTo` (*IList\<string\>*) -

    The resource groups to which nodes are transferred from this resource group. Entries are added via the collection-initializer syntax `TransferTo = { ... }`.

- `NodeFilterLabels` (*IDictionary\<string, string\>*) -

    The node labels used to filter nodes when assigning them to this resource group. Entries are added via the collection-initializer syntax `NodeFilterLabels = { ... }`.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.ResourceGroup;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

var config = new ResourceGroupConfig
{
    RequestsNodeNum = 1,
    LimitsNodeNum = 2,
    TransferFrom = { "rg_2" },
    NodeFilterLabels = { ["type"] = "gpu" }
};

await client.UpdateResourceGroupsAsync(new UpdateResourceGroupsReq
{
    ResourceGroups = new Dictionary<string, ResourceGroupConfig>
    {
        ["rg_1"] = config
    }
});
```
