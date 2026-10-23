# AlterCollectionPropertiesAsync()

Alters the properties of a collection.

```csharp
public async Task AlterCollectionPropertiesAsync(AlterCollectionPropertiesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { { "ttl.seconds", "3600" } }
};

await client.AlterCollectionPropertiesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `Properties` (*IDictionary\<string, string\>*) -

    The properties to set or update on the collection. Entries are added via the collection-initializer syntax `Properties = { ... }`.

- `DeleteKeys` (*IReadOnlyList\<string\>?*) -

    The names of properties to remove from the collection.

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

await client.AlterCollectionPropertiesAsync(new AlterCollectionPropertiesReq
{
    CollectionName = "my_collection",
    Properties = { { "ttl.seconds", "3600" } }
});
```
