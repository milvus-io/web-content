# DropResourceGroupAsync()

Drops a resource group.

```csharp
public async Task DropResourceGroupAsync(DropResourceGroupReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropResourceGroupReq
{
    ResourceGroupName = "rg1"
};

await client.DropResourceGroupAsync(request);
```

**REQUEST PARAMETERS:**

- `ResourceGroupName` (*string*) -

    The name of the resource group to drop.

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

await client.DropResourceGroupAsync(new DropResourceGroupReq { ResourceGroupName = "rg1" });
```
