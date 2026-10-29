# RefreshExternalCollectionAsync()

Refreshes an external collection from its external data source.

```csharp
public async Task<RefreshExternalCollectionResp> RefreshExternalCollectionAsync(RefreshExternalCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RefreshExternalCollectionReq
{
    CollectionName = "my_collection"
};

RefreshExternalCollectionResp result = await client.RefreshExternalCollectionAsync(request);
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

*Task\<RefreshExternalCollectionResp\>*

**RETURNS:**

A **RefreshExternalCollectionResp** object.

- `JobId` (*long*) -

    The refresh job ID, which can be passed to `GetRefreshExternalCollectionProgressAsync()` to poll progress.

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

RefreshExternalCollectionResp result = await client.RefreshExternalCollectionAsync(new RefreshExternalCollectionReq
{
    CollectionName = "my_collection"
});
```
