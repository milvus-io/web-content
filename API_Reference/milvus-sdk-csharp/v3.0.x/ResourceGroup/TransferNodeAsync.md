# TransferNodeAsync()

Transfers a number of nodes from one resource group to another.

```csharp
public async Task TransferNodeAsync(TransferNodeReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new TransferNodeReq
{
    SourceResourceGroup = "rg1",
    TargetResourceGroup = "rg2",
    NumNode = 2
};

await client.TransferNodeAsync(request);
```

**REQUEST PARAMETERS:**

- `SourceResourceGroup` (*string*) -

    The name of the resource group to transfer nodes from.

- `TargetResourceGroup` (*string*) -

    The name of the resource group to transfer nodes to.

- `NumNode` (*int*) -

    The number of query nodes to transfer.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

await client.TransferNodeAsync(new TransferNodeReq
{
    SourceResourceGroup = "rg1",
    TargetResourceGroup = "rg2",
    NumNode = 2
});
```
