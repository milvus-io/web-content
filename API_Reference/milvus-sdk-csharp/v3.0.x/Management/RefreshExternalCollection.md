# RefreshExternalCollection

Refreshes an external collection from its external data source.

```csharp
public async Task<RefreshExternalCollectionResp> RefreshExternalCollectionAsync(RefreshExternalCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RefreshExternalCollectionReq
{
    DatabaseName = null,
    CollectionName = "value",
    ExternalSource = null,
    ExternalSpec = null,
};

var resp = await client.RefreshExternalCollectionAsync(new RefreshExternalCollectionReq
{
    DatabaseName = null,
    CollectionName = "value",
    ExternalSource = null,
    ExternalSpec = null,
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the external collection to refresh.

- `ExternalSource` (*string?*) -

    An optional new external data source path (e.g. an S3 path). When empty, the collection's existing external source is kept.

- `ExternalSpec` (*string?*) -

    An optional new external spec configuration (as a JSON string). When empty, the collection's existing external spec is kept.

**RETURN TYPE:**

*RefreshExternalCollectionResp*

**RETURNS:**

A **RefreshExternalCollectionResp** object.

- `JobId` (*long*) -

    The refresh job ID, which can be passed to `GetRefreshExternalCollectionProgressAsync()` to poll progress.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.RefreshExternalCollectionAsync(new RefreshExternalCollectionReq
{
    DatabaseName = null,
    CollectionName = "value",
    ExternalSource = null,
    ExternalSpec = null,
});
```
