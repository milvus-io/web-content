# DropCollectionFunctionAsync()

Drops a function from a collection's schema.

```csharp
public async Task DropCollectionFunctionAsync(DropCollectionFunctionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropCollectionFunctionReq
{
    CollectionName = "my_collection",
    FunctionName = "bm25_fn"
};

await client.DropCollectionFunctionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection containing the function to drop.

- `FunctionName` (*string*) -

    The name of the function to drop.

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

await client.DropCollectionFunctionAsync(new DropCollectionFunctionReq
{
    CollectionName = "my_collection",
    FunctionName = "bm25_fn"
});
```
