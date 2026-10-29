# GetRLSPrincipalTagsAsync()

Gets the RLS principal tags for a principal on a collection.

```csharp
public async Task<GetRLSPrincipalTagsResp> GetRLSPrincipalTagsAsync(GetRLSPrincipalTagsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetRLSPrincipalTagsReq
{
    CollectionName = "my_collection",
    PrincipalName = "user1"
};

GetRLSPrincipalTagsResp result = await client.GetRLSPrincipalTagsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the principal tags belong to.

- `PrincipalName` (*string*) -

    The name of the principal whose tags are retrieved.

**RETURN TYPE:**

*Task\<GetRLSPrincipalTagsResp\>*

**RETURNS:**

A **GetRLSPrincipalTagsResp** object.

- `Tags` (*IReadOnlyDictionary\<string, object?\>*) -

    The principal's tag keys and values.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;
using Milvus.Client.V2.Responses.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetRLSPrincipalTagsResp result = await client.GetRLSPrincipalTagsAsync(new GetRLSPrincipalTagsReq
{
    CollectionName = "my_collection",
    PrincipalName = "user1"
});
```
