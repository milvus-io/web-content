# DropRowPolicy

Drops a row policy from a collection.

```csharp
public async Task DropRowPolicyAsync(DropRowPolicyReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropRowPolicyReq
{
    DatabaseName = null,
    CollectionName = "value",
    PolicyName = "value",
};

await client.DropRowPolicyAsync(new DropRowPolicyReq
{
    DatabaseName = null,
    CollectionName = "value",
    PolicyName = "value",
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the row policy belongs to.

- `PolicyName` (*string*) -

    The name of the row policy to drop.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.DropRowPolicyAsync(new DropRowPolicyReq
{
    DatabaseName = null,
    CollectionName = "value",
    PolicyName = "value",
});
```
