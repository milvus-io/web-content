# GetRefreshExternalCollectionProgressAsync()

Gets the progress of an external-collection refresh job.

```csharp
public async Task<GetRefreshExternalCollectionProgressResp> GetRefreshExternalCollectionProgressAsync(GetRefreshExternalCollectionProgressReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetRefreshExternalCollectionProgressReq
{
    JobId = 12345
};

GetRefreshExternalCollectionProgressResp result = await client.GetRefreshExternalCollectionProgressAsync(request);
```

**REQUEST PARAMETERS:**

- `JobId` (*long*) -

    The job ID returned by `RefreshExternalCollectionAsync()`.

**RETURN TYPE:**

*Task\<GetRefreshExternalCollectionProgressResp\>*

**RETURNS:**

A **GetRefreshExternalCollectionProgressResp** object.

- `JobInfo` (*RefreshExternalCollectionJobInfo*) -

    The refresh job's progress information. See [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetRefreshExternalCollectionProgressResp result = await client.GetRefreshExternalCollectionProgressAsync(new GetRefreshExternalCollectionProgressReq
{
    JobId = 12345
});
```
