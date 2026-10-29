# ListRestoreSnapshotJobsAsync()

Lists the snapshot restore jobs for a collection, or all restore jobs when no collection is given.

```csharp
public async Task<ListRestoreSnapshotJobsResp> ListRestoreSnapshotJobsAsync(ListRestoreSnapshotJobsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRestoreSnapshotJobsReq
{
    CollectionName = "my_collection"
};

ListRestoreSnapshotJobsResp result = await client.ListRestoreSnapshotJobsAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the target collection to filter jobs for. When empty, all restore jobs are listed.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

**RETURN TYPE:**

*Task\<ListRestoreSnapshotJobsResp\>*

**RETURNS:**

A **ListRestoreSnapshotJobsResp** object.

- `Jobs` (*IReadOnlyList\<RestoreSnapshotJobInfo\>*) -

    The list of restore jobs matching the collection filter. Each entry is a [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

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

ListRestoreSnapshotJobsResp result = await client.ListRestoreSnapshotJobsAsync(new ListRestoreSnapshotJobsReq
{
    CollectionName = "my_collection"
});
```
