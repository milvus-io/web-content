# RenameCollectionAsync()

Renames a collection.

```csharp
public async Task RenameCollectionAsync(RenameCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RenameCollectionReq
{
    CollectionName = "my_collection",
    NewCollectionName = "my_collection_v2"
};

await client.RenameCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The current name of the collection.

- `DatabaseName` (*string?*) -

    An optional database name containing the collection to rename. When empty, the client's currently selected database is used.

- `NewCollectionName` (*string*) -

    The new name of the collection.

- `TargetDatabaseName` (*string?*) -

    An optional target database to move the collection into. When empty, the collection is renamed in its current database.

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

await client.RenameCollectionAsync(new RenameCollectionReq
{
    CollectionName = "my_collection",
    NewCollectionName = "my_collection_v2"
});
```
