# DropCollectionFieldPropertiesAsync()

Drops the properties of a field in a collection's schema.

```csharp
public async Task DropCollectionFieldPropertiesAsync(DropCollectionFieldPropertiesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropCollectionFieldPropertiesReq
{
    CollectionName = "my_collection",
    FieldName = "title",
    DeleteKeys = ["mmap.enabled"]
};

await client.DropCollectionFieldPropertiesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `FieldName` (*string*) -

    The name of the field whose properties are to be dropped.

- `DeleteKeys` (*IReadOnlyList\<string\>*) -

    The names of the properties to remove from the field.

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

await client.DropCollectionFieldPropertiesAsync(new DropCollectionFieldPropertiesReq
{
    CollectionName = "my_collection",
    FieldName = "title",
    DeleteKeys = ["mmap.enabled"]
});
```
