# DeleteRLSPrincipalTagsAsync()

Deletes the RLS principal tags of a principal on a collection.

```csharp
public async Task DeleteRLSPrincipalTagsAsync(DeleteRLSPrincipalTagsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DeleteRLSPrincipalTagsReq
{
    CollectionName = "my_collection",
    PrincipalName = "user1",
    TagKeys = ["department"]
};

await client.DeleteRLSPrincipalTagsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection the principal tags belong to.

- `PrincipalName` (*string*) -

    The name of the principal whose tags are deleted.

- `TagKeys` (*IReadOnlyList\<string\>?*) -

    The tag keys to delete. An empty or null list deletes all tags of the principal.

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

await client.DeleteRLSPrincipalTagsAsync(new DeleteRLSPrincipalTagsReq
{
    CollectionName = "my_collection",
    PrincipalName = "user1",
    TagKeys = ["department"]
});
```
