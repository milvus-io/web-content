# CreateAliasAsync()

Creates an alias for a collection.

```csharp
public async Task CreateAliasAsync(CreateAliasReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateAliasReq
{
    CollectionName = "my_collection",
    Alias = "my_collection_alias"
};

await client.CreateAliasAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection the alias points to.

- `Alias` (*string*) -

    The name of the alias to create.

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
using Milvus.Client.V2.Requests.Aliases;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.CreateAliasAsync(new CreateAliasReq
{
    CollectionName = "my_collection",
    Alias = "my_collection_alias"
});
```
