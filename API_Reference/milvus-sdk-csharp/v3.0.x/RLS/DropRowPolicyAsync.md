# DropRowPolicyAsync()

Drops a row policy from a collection.

```csharp
public async Task DropRowPolicyAsync(DropRowPolicyReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropRowPolicyReq
{
    CollectionName = "my_collection",
    PolicyName = "policy_1"
};

await client.DropRowPolicyAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the row policy belongs to.

- `PolicyName` (*string*) -

    The name of the row policy to drop.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rls;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropRowPolicyAsync(new DropRowPolicyReq
{
    CollectionName = "my_collection",
    PolicyName = "policy_1"
});
```
