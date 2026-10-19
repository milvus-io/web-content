# AddCollectionFunctionAsync()

Adds a function (e.g. BM25) to a collection's schema.

```csharp
public async Task AddCollectionFunctionAsync(AddCollectionFunctionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddCollectionFunctionReq
{
    CollectionName = "my_collection",
    Function = FunctionSchema.CreateBm25("bm25_fn", "text", "sparse")
};

await client.AddCollectionFunctionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to add the function to.

- `Function` (*FunctionSchema*) -

    The schema of the function to add. See [FunctionSchema](FunctionSchema.md).

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.AddCollectionFunctionAsync(new AddCollectionFunctionReq
{
    CollectionName = "my_collection",
    Function = FunctionSchema.CreateBm25("bm25_fn", "text", "sparse")
});
```
