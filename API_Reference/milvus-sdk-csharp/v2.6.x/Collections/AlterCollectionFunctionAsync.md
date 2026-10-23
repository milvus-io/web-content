# AlterCollectionFunctionAsync()

Alters a function in a collection's schema.

```csharp
public async Task AlterCollectionFunctionAsync(AlterCollectionFunctionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AlterCollectionFunctionReq
{
    CollectionName = "my_collection",
    FunctionName = "bm25_fn",
    Function = FunctionSchema.CreateBm25("bm25_fn", "text", "sparse")
};

await client.AlterCollectionFunctionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection containing the function to alter.

- `FunctionName` (*string*) -

    The name of the function to alter.

- `Function` (*FunctionSchema*) -

    The new schema of the function. See [FunctionSchema](FunctionSchema.md).

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
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.AlterCollectionFunctionAsync(new AlterCollectionFunctionReq
{
    CollectionName = "my_collection",
    FunctionName = "bm25_fn",
    Function = FunctionSchema.CreateBm25("bm25_fn", "text", "sparse")
});
```
