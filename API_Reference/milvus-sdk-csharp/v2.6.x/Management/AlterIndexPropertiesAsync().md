# AlterIndexPropertiesAsync()

Alters the properties of an index.

```csharp
public async Task AlterIndexPropertiesAsync(AlterIndexPropertiesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AlterIndexPropertiesReq
{
    CollectionName = "my_collection",
    IndexName = "_default_idx",
    Properties = { ["nlist"] = "1024" }
};

await client.AlterIndexPropertiesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `IndexName` (*string?*) -

    The index name. Defaults to `"_default_idx"` when unset (the server's default index name, also used by `CreateIndexReq`); the proxy rejects an empty index name on alter.

- `Properties` (*IDictionary\<string, string\>*) -

    The properties to set or update on the index. Entries are added via the collection-initializer syntax `Properties = { ... }`. Mutually exclusive with `DeleteKeys`.

- `DeleteKeys` (*IReadOnlyList\<string\>?*) -

    The names of the properties to remove from the index. Mutually exclusive with `Properties`.

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

await client.AlterIndexPropertiesAsync(new AlterIndexPropertiesReq
{
    CollectionName = "my_collection",
    IndexName = "_default_idx",
    Properties = { ["nlist"] = "1024" }
});
```
