# SearchIteratorAsync()

Creates a server-side iterator that pages over search results in batches.

```csharp
public SearchIterator SearchIteratorAsync(SearchIteratorReq request)
```

## Request Syntax

```csharp
var request = new SearchIteratorReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    MetricType = MetricType.L2,
    Limit = 100,
    BatchSize = 20
};

SearchIterator iterator = client.SearchIteratorAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to search in.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `VectorFieldName` (*string*) -

    The name of the vector field to search in.

- `Vectors` (*IReadOnlyList\<ReadOnlyMemory\<float\>\>*) -

    The query vectors to search for (dense float vectors). Only a single query vector is supported.

- `SparseVectors` (*IReadOnlyList\<SparseVector\<float\>\>?*) -

    The sparse query vectors to search for. When set, `Vectors` must be empty. See [SparseVector](SparseVector.md).

- `Float16Vectors` (*IReadOnlyList\<ReadOnlyMemory\<ushort\>\>?*) -

    The float16 query vectors to search for. When set, `Vectors` must be empty.

- `BFloat16Vectors` (*IReadOnlyList\<ReadOnlyMemory\<ushort\>\>?*) -

    The bfloat16 query vectors to search for. When set, `Vectors` must be empty.

- `BinaryVectors` (*IReadOnlyList\<ReadOnlyMemory\<byte\>\>?*) -

    The binary query vectors to search for (raw bytes). When set, `Vectors` must be empty.

- `Int8Vectors` (*IReadOnlyList\<ReadOnlyMemory\<sbyte\>\>?*) -

    The int8 query vectors to search for. When set, `Vectors` must be empty.

- `Texts` (*IReadOnlyList\<string\>?*) -

    The text query strings to search for (embedded-text / BM25 targets). When set, `Vectors` must be empty.

- `EmbeddingLists` (*IReadOnlyList\<EmbeddingList\>?*) -

    The embedding lists to search for, used for Array-of-Struct vector sub-fields such as `"clips[vector]"` with a MAX_SIM metric. The search iterator accepts a single query, so provide exactly one embedding list. See [EmbeddingList](EmbeddingList.md).

- `MetricType` (*MetricType*) -

    The metric type used to measure the distance between vectors. See [MetricType](MetricType.md).

- `Limit` (*int*) -

    The maximum total number of rows to return. `0` or `int.MaxValue` means no limit.

- `Parameters` (*SearchParameters?*) -

    The optional search parameters. See [SearchParameters](SearchParameters.md).

- `BatchSize` (*int*) -

    The number of rows to fetch per batch. Defaults to 1000.

- `ExternalFilterFunc` (*Func\<SingleResult, IReadOnlyList\<int\>\>?*) -

    An optional client-side per-page filter that receives each page as a `SingleResult` and returns the zero-based row indices to keep, in the desired order. Filtered rows are accumulated and returned in batches of `BatchSize`, with a final partial batch when no more results remain.

- `RlsPrincipal` (*string?*) -

    The row-level security (RLS) principal for the operation. When set, Milvus applies the row policies of the collection to this operation.

- `SkipRls` (*bool?*) -

    Whether the operation should skip row-level security (RLS) enforcement. When `null`, the server default applies.

**RETURN TYPE:**

*SearchIterator*

**RETURNS:**

A **SearchIterator** that pages over search results as an async iterator of batches. It uses the `search_iter_v2` server protocol and requires a Milvus server of version 2.5.2 or later. Consume with `await foreach`, optionally with `.WithCancellation(token)`.

The **SearchIterator** exposes the following members:

**METHODS:**

- `GetAsyncEnumerator(CancellationToken cancellationToken = default)` -

    Returns an async enumerator that yields each page of search results as a `SingleResult` holding that page's top-K hits with their scores, primary keys and output fields.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await foreach (SingleResult batch in client.SearchIteratorAsync(new SearchIteratorReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    MetricType = MetricType.L2,
    Limit = 100,
    BatchSize = 20
}))
{
    // batch holds the page's top-K scores, primary keys and output fields.
}
```
