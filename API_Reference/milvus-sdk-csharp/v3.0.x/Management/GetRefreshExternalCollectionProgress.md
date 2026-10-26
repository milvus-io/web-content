# GetRefreshExternalCollectionProgress

Gets the progress of an external-collection refresh job.

```csharp
public async Task<GetRefreshExternalCollectionProgressResp> GetRefreshExternalCollectionProgressAsync(GetRefreshExternalCollectionProgressReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetRefreshExternalCollectionProgressReq
{
    JobId = 0,
};

var resp = await client.GetRefreshExternalCollectionProgressAsync(new GetRefreshExternalCollectionProgressReq
{
    JobId = 0,
});
```

**REQUEST PARAMETERS:**

- `JobId` (*long*) -

    The job ID returned by <see cref="MilvusClientV2.RefreshExternalCollectionAsync" />.

**RETURN TYPE:**

*GetRefreshExternalCollectionProgressResp*

**RETURNS:**

A **GetRefreshExternalCollectionProgressResp** object.

- `JobInfo` (*RefreshExternalCollectionJobInfo*) -

    The refresh job's progress information. See [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.GetRefreshExternalCollectionProgressAsync(new GetRefreshExternalCollectionProgressReq
{
    JobId = 0,
});
```
