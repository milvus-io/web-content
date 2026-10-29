# AddFunctionFieldAsync()

Adds a function field (doc-in/doc-out function output) to a collection schema.

```csharp
public async Task AddFunctionFieldAsync(AddFunctionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddFunctionFieldReq
{
    CollectionName = "my_collection",
    Field = new FieldSchema("bm25_score", DataType.SparseFloatVector),
    Function = new FunctionSchema("bm25_fn", FunctionType.Bm25, ["text"], ["bm25_score"]),
    IndexParam = new IndexParam("bm25_score", indexType: IndexType.SparseInvertedIndex, metricType: MetricType.Bm25)
};

await client.AddFunctionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to add the function field to.

- `Field` (*FieldSchema*) -

    The schema of the function's output field. The data type must match the output type required by the function's type. See [FieldSchema](FieldSchema.md).

- `Function` (*FunctionSchema*) -

    The function to add, e.g. a BM25 function whose output field is `Field`. See [FunctionSchema](FunctionSchema.md).

- `IndexParam` (*IndexParam*) -

    The index to bind to the function's output field. An explicit, non-`IndexType.Invalid` index type is required. See [IndexParam](../Management/IndexParam.md).

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

await client.AddFunctionFieldAsync(new AddFunctionFieldReq
{
    CollectionName = "my_collection",
    Field = new FieldSchema("bm25_score", DataType.SparseFloatVector),
    Function = new FunctionSchema("bm25_fn", FunctionType.Bm25, ["text"], ["bm25_score"]),
    IndexParam = new IndexParam("bm25_score", indexType: IndexType.SparseInvertedIndex, metricType: MetricType.Bm25)
});
```
