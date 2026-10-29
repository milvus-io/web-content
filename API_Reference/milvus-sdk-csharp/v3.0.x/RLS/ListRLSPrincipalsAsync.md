# ListRLSPrincipalsAsync()

Lists the RLS principals of a collection.

```csharp
public async Task<ListRLSPrincipalsResp> ListRLSPrincipalsAsync(ListRLSPrincipalsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRLSPrincipalsReq
{
    CollectionName = "my_collection"
};

ListRLSPrincipalsResp result = await client.ListRLSPrincipalsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to list the RLS principals of.

**RETURN TYPE:**

*Task\<ListRLSPrincipalsResp\>*

**RETURNS:**

A **ListRLSPrincipalsResp** object.

- `PrincipalNames` (*IReadOnlyList\<string\>*) -

    The names of the RLS principals configured on the collection.

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

ListRLSPrincipalsResp result = await client.ListRLSPrincipalsAsync(new ListRLSPrincipalsReq
{
    CollectionName = "my_collection"
});
```
