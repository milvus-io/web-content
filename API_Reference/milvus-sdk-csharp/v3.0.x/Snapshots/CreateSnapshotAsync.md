# CreateSnapshotAsync()

Creates a snapshot of a collection. Flushing the collection before creating the snapshot is recommended so all data is captured in the snapshot's segment list.

```csharp
public async Task CreateSnapshotAsync(CreateSnapshotReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection",
    Description = "Snapshot before schema migration",
    CompactionProtectionSeconds = 3600
};

await client.CreateSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `SnapshotName` (*string*) -

    The name of the snapshot to create. Must be unique.

- `CollectionName` (*string*) -

    The name of the collection to snapshot.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `Description` (*string*) -

    An optional description for the snapshot.

- `CompactionProtectionSeconds` (*long*) -

    The duration in seconds during which the segments referenced by this snapshot are protected from compaction. 0 means no protection.

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

await client.CreateSnapshotAsync(new CreateSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection",
    Description = "Snapshot before schema migration",
    CompactionProtectionSeconds = 3600
});
```
