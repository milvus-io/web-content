# GetRLSPrincipalTags

Gets the RLS principal tags for a principal on a collection.

```csharp
public async Task<GetRLSPrincipalTagsResp> GetRLSPrincipalTagsAsync(GetRLSPrincipalTagsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetRLSPrincipalTagsReq
{
    DatabaseName = null,
    CollectionName = "value",
    PrincipalName = "value",
};

var resp = await client.GetRLSPrincipalTagsAsync(new GetRLSPrincipalTagsReq
{
    DatabaseName = null,
    CollectionName = "value",
    PrincipalName = "value",
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the principal tags belong to.

- `PrincipalName` (*string*) -

    The name of the principal whose tags are retrieved.

**RETURN TYPE:**

*GetRLSPrincipalTagsResp*

**RETURNS:**

A **GetRLSPrincipalTagsResp** object.

- `Tags` (*IReadOnlyDictionary\<string, object?\>*) -

    The principal's tag keys and values.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.GetRLSPrincipalTagsAsync(new GetRLSPrincipalTagsReq
{
    DatabaseName = null,
    CollectionName = "value",
    PrincipalName = "value",
});
```
