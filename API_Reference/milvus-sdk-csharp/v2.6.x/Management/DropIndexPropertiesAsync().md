# DropIndexPropertiesAsync()

Drops the properties of an index.

```csharp
public async Task DropIndexPropertiesAsync(DropIndexPropertiesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropIndexPropertiesReq
{
    CollectionName = "my_collection",
    IndexName = "_default_idx",
    DeleteKeys = ["nlist"]
};

await client.DropIndexPropertiesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `IndexName` (*string?*) -

    The index name. Defaults to `"_default_idx"` when unset (the server's default index name, also used by `CreateIndexReq`); the proxy rejects an empty index name on alter.

- `DeleteKeys` (*IReadOnlyList\<string\>*) -

    The names of the properties to remove from the index.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Index;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropIndexPropertiesAsync(new DropIndexPropertiesReq
{
    CollectionName = "my_collection",
    IndexName = "_default_idx",
    DeleteKeys = ["nlist"]
});
```
