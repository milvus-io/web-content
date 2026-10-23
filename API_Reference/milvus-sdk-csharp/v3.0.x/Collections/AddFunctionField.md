# AddFunctionField

Adds a function field (doc-in/doc-out function output) to a collection schema.

```csharp
public async Task AddFunctionFieldAsync(AddFunctionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddFunctionFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    Field = 0,
    Function = 0,
    IndexParam = 0,
};

await client.AddFunctionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to add the function field to.

- `Field` (*FieldSchema*) -

    The schema of the function's output field. The data type must match the output type required by the function's type.

- `Function` (*FunctionSchema*) -

    The function to add, e.g. a BM25 function whose output field is <see cref="Field" />.

- `IndexParam` (*IndexParam*) -

    The index to bind to the function's output field. An explicit, non-<see cref="IndexType.Invalid" /> index type is required.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.AddFunctionFieldAsync(new AddFunctionFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    Field = 0,
    Function = 0,
    IndexParam = 0,
});
```
