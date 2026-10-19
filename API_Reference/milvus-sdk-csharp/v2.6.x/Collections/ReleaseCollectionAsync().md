# ReleaseCollectionAsync()

Releases a loaded collection from memory.

```csharp
public async Task ReleaseCollectionAsync(ReleaseCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ReleaseCollectionReq
{
    CollectionName = "my_collection"
};

await client.ReleaseCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to release.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.ReleaseCollectionAsync(new ReleaseCollectionReq
{
    CollectionName = "my_collection"
});
```
