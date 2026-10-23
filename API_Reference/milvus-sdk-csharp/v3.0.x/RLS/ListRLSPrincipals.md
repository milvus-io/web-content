# ListRLSPrincipals

Lists the RLS principals of a collection.

```csharp
public async Task<ListRLSPrincipalsResp> ListRLSPrincipalsAsync(ListRLSPrincipalsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRLSPrincipalsReq
{
    DatabaseName = null,
    CollectionName = "value",
};

var resp = await client.ListRLSPrincipalsAsync(new ListRLSPrincipalsReq
{
    DatabaseName = null,
    CollectionName = "value",
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to list the RLS principals of.

**RETURN TYPE:**

*ListRLSPrincipalsResp*

**RETURNS:**

A **ListRLSPrincipalsResp** object returned by the operation.
## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.ListRLSPrincipalsAsync(new ListRLSPrincipalsReq
{
    DatabaseName = null,
    CollectionName = "value",
});
```
