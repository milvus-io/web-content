# CreateResourceGroupAsync()

Creates a resource group.

```csharp
public async Task CreateResourceGroupAsync(CreateResourceGroupReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateResourceGroupReq
{
    ResourceGroupName = "rg1",
    Config = new ResourceGroupConfig
    {
        RequestsNodeNum = 3,
        LimitsNodeNum = 6,
        TransferFrom = { "rg2" }
    }
};

await client.CreateResourceGroupAsync(request);
```

**REQUEST PARAMETERS:**

- `ResourceGroupName` (*string*) -

    The name of the resource group to create.

- `Config` (*ResourceGroupConfig?*) -

    The optional resource group configuration applied at creation time. See [ResourceGroupConfig](ResourceGroupConfig.md).

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

await client.CreateResourceGroupAsync(new CreateResourceGroupReq
{
    ResourceGroupName = "rg1",
    Config = new ResourceGroupConfig
    {
        RequestsNodeNum = 3,
        LimitsNodeNum = 6
    }
});
```
