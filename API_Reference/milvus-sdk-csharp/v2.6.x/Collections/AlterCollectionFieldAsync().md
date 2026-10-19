# AlterCollectionFieldAsync()

Alters the properties of a field in an existing collection.

```csharp
public async Task AlterCollectionFieldAsync(AlterCollectionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AlterCollectionFieldReq
{
    CollectionName = "my_collection",
    FieldName = "title",
    Properties = { { "mmap.enabled", "true" } }
};

await client.AlterCollectionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection containing the field to alter.

- `FieldName` (*string*) -

    The name of the field to alter.

- `Properties` (*IDictionary\<string, string\>*) -

    The key-value pairs of properties to set on the field. Entries are added via the collection-initializer syntax `Properties = { ... }`.

- `DeleteKeys` (*IReadOnlyList\<string\>?*) -

    The keys of properties to remove from the field, if any.

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

await client.AlterCollectionFieldAsync(new AlterCollectionFieldReq
{
    CollectionName = "my_collection",
    FieldName = "title",
    Properties = { { "mmap.enabled", "true" } }
});
```
