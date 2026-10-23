# TruncateCollectionAsync()

Removes all entities from a collection.

```csharp
public async Task TruncateCollectionAsync(TruncateCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new TruncateCollectionReq
{
    CollectionName = "my_collection"
};

await client.TruncateCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to truncate.

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
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.TruncateCollectionAsync(new TruncateCollectionReq
{
    CollectionName = "my_collection"
});
```
