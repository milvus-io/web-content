# GetRestoreSnapshotStateAsync()

Gets the state of a snapshot restore job.

```csharp
public async Task<GetRestoreSnapshotStateResp> GetRestoreSnapshotStateAsync(GetRestoreSnapshotStateReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetRestoreSnapshotStateReq
{
    JobId = 12345
};

GetRestoreSnapshotStateResp result = await client.GetRestoreSnapshotStateAsync(request);
```

**REQUEST PARAMETERS:**

- `JobId` (*long*) -

    The ID of the restore job to query, as returned by `RestoreSnapshotAsync()`.

**RETURN TYPE:**

*Task\<GetRestoreSnapshotStateResp\>*

**RETURNS:**

A **GetRestoreSnapshotStateResp** object.

- `JobInfo` (*RestoreSnapshotJobInfo*) -

    The restore job information, including state, progress, and failure reason. See [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

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

GetRestoreSnapshotStateResp result = await client.GetRestoreSnapshotStateAsync(new GetRestoreSnapshotStateReq
{
    JobId = 12345
});
```
