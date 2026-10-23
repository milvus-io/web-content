# TransferReplicaAsync()

Transfers replicas from one resource group to another.

```csharp
public async Task TransferReplicaAsync(TransferReplicaReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new TransferReplicaReq
{
    DatabaseName = "default",
    SourceResourceGroup = "rg1",
    TargetResourceGroup = "rg2",
    CollectionName = "my_collection",
    NumReplica = 1
};

await client.TransferReplicaAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `SourceResourceGroup` (*string*) -

    The name of the resource group to transfer replicas from.

- `TargetResourceGroup` (*string*) -

    The name of the resource group to transfer replicas to.

- `CollectionName` (*string*) -

    The name of the collection whose replicas are to be transferred.

- `NumReplica` (*long*) -

    The number of replicas to transfer.

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

await client.TransferReplicaAsync(new TransferReplicaReq
{
    SourceResourceGroup = "rg1",
    TargetResourceGroup = "rg2",
    CollectionName = "my_collection",
    NumReplica = 1
});
```
