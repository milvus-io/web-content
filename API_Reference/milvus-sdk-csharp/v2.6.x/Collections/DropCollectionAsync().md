# DropCollectionAsync()

Drops a collection.

```csharp
public async Task DropCollectionAsync(DropCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropCollectionReq
{
    CollectionName = "my_collection"
};

await client.DropCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to drop.

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

await client.DropCollectionAsync(new DropCollectionReq
{
    CollectionName = "my_collection"
});
```
