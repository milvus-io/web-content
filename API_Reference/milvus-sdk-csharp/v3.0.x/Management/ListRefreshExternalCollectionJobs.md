# ListRefreshExternalCollectionJobs

Lists the external-collection refresh jobs.

```csharp
public async Task<ListRefreshExternalCollectionJobsResp> ListRefreshExternalCollectionJobsAsync(ListRefreshExternalCollectionJobsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRefreshExternalCollectionJobsReq
{
    DatabaseName = null,
    CollectionName = null,
};

var resp = await client.ListRefreshExternalCollectionJobsAsync(new ListRefreshExternalCollectionJobsReq
{
    DatabaseName = null,
    CollectionName = null,
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string?*) -

    An optional collection name to filter by. When empty, jobs for all collections in the database are listed.

**RETURN TYPE:**

*ListRefreshExternalCollectionJobsResp*

**RETURNS:**

A **ListRefreshExternalCollectionJobsResp** object.

- `Jobs` (*IReadOnlyList\<RefreshExternalCollectionJobInfo\>*) -

    The list of external-collection refresh jobs. Each entry is a [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.ListRefreshExternalCollectionJobsAsync(new ListRefreshExternalCollectionJobsReq
{
    DatabaseName = null,
    CollectionName = null,
});
```
