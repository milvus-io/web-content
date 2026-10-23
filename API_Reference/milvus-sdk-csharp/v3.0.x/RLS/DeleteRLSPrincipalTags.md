# DeleteRLSPrincipalTags

Deletes the RLS principal tags of a principal on a collection.

```csharp
public async Task DeleteRLSPrincipalTagsAsync(DeleteRLSPrincipalTagsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DeleteRLSPrincipalTagsReq
{
    DatabaseName = null,
    CollectionName = "value",
    PrincipalName = "value",
    TagKeys = null,
};

await client.DeleteRLSPrincipalTagsAsync(new DeleteRLSPrincipalTagsReq
{
    DatabaseName = null,
    CollectionName = "value",
    PrincipalName = "value",
    TagKeys = null,
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the principal tags belong to.

- `PrincipalName` (*string*) -

    The name of the principal whose tags are deleted.

- `TagKeys` (*IReadOnlyList<string>?*) -

    The tag keys to delete. An empty or null list deletes all tags of the principal.
## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.DeleteRLSPrincipalTagsAsync(new DeleteRLSPrincipalTagsReq
{
    DatabaseName = null,
    CollectionName = "value",
    PrincipalName = "value",
    TagKeys = null,
});
```
