# ListRowPolicies

ListRowPoliciesResp

```csharp
public async Task<ListRowPoliciesResp> ListRowPoliciesAsync(ListRowPoliciesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRowPoliciesReq
{
    DatabaseName = null,
    CollectionName = "value",
};

var resp = await client.ListRowPoliciesAsync(new ListRowPoliciesReq
{
    DatabaseName = null,
    CollectionName = "value",
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to list the row policies of.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.ListRowPoliciesAsync(new ListRowPoliciesReq
{
    DatabaseName = null,
    CollectionName = "value",
});
```
