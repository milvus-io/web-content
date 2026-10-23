# DropIndexAsync()

Drops an index.

```csharp
public async Task DropIndexAsync(
    DropIndexReq request,
    CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropIndexReq
{
    CollectionName = "my_collection",
    IndexName = "_default_idx"
};

await client.DropIndexAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `FieldName` (*string?*) -

    The field name the index is built on. Optional: Milvus identifies the index by `IndexName` and ignores the field name, so it only needs to be set when a server version requires it.

- `IndexName` (*string?*) -

    The index name. When unset, the empty name is sent, which the proxy treats as "all indexes of the collection". Only set it to drop a specific named index.

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
using Milvus.Client.V2.Requests.Index;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropIndexAsync(new DropIndexReq
{
    CollectionName = "my_collection",
    IndexName = "_default_idx"
});
```
