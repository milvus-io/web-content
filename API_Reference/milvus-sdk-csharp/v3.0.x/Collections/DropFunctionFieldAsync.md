# DropFunctionFieldAsync()

Drops a function field from an existing collection.

```csharp
public async Task DropFunctionFieldAsync(DropFunctionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropFunctionFieldReq
{
    CollectionName = "my_collection",
    FunctionName = "bm25_fn"
};

await client.DropFunctionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to drop the function field from.

- `FunctionName` (*string*) -

    The name of the function to drop.

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

await client.DropFunctionFieldAsync(new DropFunctionFieldReq
{
    CollectionName = "my_collection",
    FunctionName = "bm25_fn"
});
```
