# DropSnapshotAsync()

Drops a snapshot permanently.

```csharp
public async Task DropSnapshotAsync(DropSnapshotReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection"
};

await client.DropSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `SnapshotName` (*string*) -

    The name of the snapshot to drop.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

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
using Milvus.Client.V2.Requests.Snapshot;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropSnapshotAsync(new DropSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection"
});
```
