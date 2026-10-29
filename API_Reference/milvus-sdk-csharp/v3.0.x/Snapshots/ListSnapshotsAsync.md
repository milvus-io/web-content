# ListSnapshotsAsync()

Lists the snapshots of a collection, or all snapshots when no collection is given.

```csharp
public async Task<ListSnapshotsResp> ListSnapshotsAsync(ListSnapshotsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListSnapshotsReq
{
    CollectionName = "my_collection"
};

ListSnapshotsResp result = await client.ListSnapshotsAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to list snapshots for. When empty, all snapshots are listed.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

**RETURN TYPE:**

*Task\<ListSnapshotsResp\>*

**RETURNS:**

A **ListSnapshotsResp** object.

- `Snapshots` (*IReadOnlyList\<string\>*) -

    The names of the snapshots of the collection (or all snapshots when no collection filter is given).

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

ListSnapshotsResp result = await client.ListSnapshotsAsync(new ListSnapshotsReq
{
    CollectionName = "my_collection"
});
```
