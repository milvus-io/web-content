# DropFunctionField

Drops a function field from a collection schema.

```csharp
public async Task DropFunctionFieldAsync(DropFunctionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropFunctionFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    FunctionName = "value",
};

await client.DropFunctionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection containing the function to drop.

- `FunctionName` (*string*) -

    The name of the function to drop.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.DropFunctionFieldAsync(new DropFunctionFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    FunctionName = "value",
});
```
