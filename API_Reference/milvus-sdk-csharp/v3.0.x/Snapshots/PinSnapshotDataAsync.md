# PinSnapshotDataAsync()

Pins the data referenced by a snapshot so it is not compacted away, with a time-to-live.

```csharp
public async Task<PinSnapshotDataResp> PinSnapshotDataAsync(PinSnapshotDataReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new PinSnapshotDataReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection",
    TtlSeconds = 86400
};

PinSnapshotDataResp result = await client.PinSnapshotDataAsync(request);
```

**REQUEST PARAMETERS:**

- `SnapshotName` (*string*) -

    The name of the snapshot to pin.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `TtlSeconds` (*long*) -

    The time-to-live of the pin in seconds. 0 means no expiry (uses the server default).

**RETURN TYPE:**

*Task\<PinSnapshotDataResp\>*

**RETURNS:**

A **PinSnapshotDataResp** object.

- `PinId` (*long*) -

    The pin ID, which can be passed to `UnpinSnapshotDataAsync()` to release the pin.

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

PinSnapshotDataResp result = await client.PinSnapshotDataAsync(new PinSnapshotDataReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection",
    TtlSeconds = 86400
});
```
