# RestoreSnapshotAsync()

Restores a snapshot to a target collection.

```csharp
public async Task<RestoreSnapshotResp> RestoreSnapshotAsync(RestoreSnapshotReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RestoreSnapshotReq
{
    SnapshotName = "snapshot_1",
    SourceCollectionName = "my_collection",
    TargetCollectionName = "my_collection_copy"
};

RestoreSnapshotResp result = await client.RestoreSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `SnapshotName` (*string*) -

    The name of the snapshot to restore.

- `SourceCollectionName` (*string*) -

    The name of the source collection the snapshot belongs to.

- `TargetCollectionName` (*string*) -

    The name of the target collection to restore into.

- `SourceDbName` (*string?*) -

    An optional database name of the source collection. When empty, the client's currently selected database is used.

- `TargetDbName` (*string?*) -

    An optional database name of the target collection. When empty, the client's currently selected database is used.

**RETURN TYPE:**

*Task\<RestoreSnapshotResp\>*

**RETURNS:**

A **RestoreSnapshotResp** object.

- `JobId` (*long*) -

    The restore job ID, which can be passed to `GetRestoreSnapshotStateAsync()` to poll progress.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Snapshot;
using Milvus.Client.V2.Responses.Snapshot;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

RestoreSnapshotResp result = await client.RestoreSnapshotAsync(new RestoreSnapshotReq
{
    SnapshotName = "snapshot_1",
    SourceCollectionName = "my_collection",
    TargetCollectionName = "my_collection_copy"
});
```
