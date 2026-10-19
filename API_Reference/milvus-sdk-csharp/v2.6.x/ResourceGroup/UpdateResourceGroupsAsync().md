# UpdateResourceGroupsAsync()

Updates the configuration of multiple resource groups.

```csharp
public async Task UpdateResourceGroupsAsync(UpdateResourceGroupsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpdateResourceGroupsReq
{
    ResourceGroups = new Dictionary<string, ResourceGroupConfig>
    {
        ["rg1"] = new ResourceGroupConfig { RequestsNodeNum = 3, LimitsNodeNum = 6 },
        ["rg2"] = new ResourceGroupConfig { RequestsNodeNum = 1, LimitsNodeNum = 2 }
    }
};

await client.UpdateResourceGroupsAsync(request);
```

**REQUEST PARAMETERS:**

- `ResourceGroups` (*IReadOnlyDictionary\<string, ResourceGroupConfig\>*) -

    The resource group names and their updated configurations. See [ResourceGroupConfig](ResourceGroupConfig.md).

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

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
await client.ConnectAsync();

await client.UpdateResourceGroupsAsync(new UpdateResourceGroupsReq
{
    ResourceGroups = new Dictionary<string, ResourceGroupConfig>
    {
        ["rg1"] = new ResourceGroupConfig { RequestsNodeNum = 3, LimitsNodeNum = 6 }
    }
});
```
