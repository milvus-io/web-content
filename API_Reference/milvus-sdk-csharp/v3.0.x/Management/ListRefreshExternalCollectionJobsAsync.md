# ListRefreshExternalCollectionJobsAsync()

Lists the external-collection refresh jobs.

```csharp
public async Task<ListRefreshExternalCollectionJobsResp> ListRefreshExternalCollectionJobsAsync(ListRefreshExternalCollectionJobsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRefreshExternalCollectionJobsReq
{
    CollectionName = "my_collection"
};

ListRefreshExternalCollectionJobsResp result = await client.ListRefreshExternalCollectionJobsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string?*) -

    An optional collection name to filter the refresh jobs of. When empty, the refresh jobs of all collections are listed.

**RETURN TYPE:**

*Task\<ListRefreshExternalCollectionJobsResp\>*

**RETURNS:**

A **ListRefreshExternalCollectionJobsResp** object.

- `Jobs` (*IReadOnlyList\<RefreshExternalCollectionJobInfo\>*) -

    The list of external-collection refresh jobs. Each entry is a [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

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

ListRefreshExternalCollectionJobsResp result = await client.ListRefreshExternalCollectionJobsAsync(new ListRefreshExternalCollectionJobsReq
{
    CollectionName = "my_collection"
});
```
