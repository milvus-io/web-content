# QueryIteratorAsync()

Creates a server-side iterator that pages over query results in batches.

```csharp
public QueryIterator QueryIteratorAsync(QueryIteratorReq request)
```

## Request Syntax

```csharp
var request = new QueryIteratorReq
{
    CollectionName = "my_collection",
    Expression = "pages > 100",
    BatchSize = 500
};

QueryIterator iterator = client.QueryIteratorAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to query.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `Expression` (*string?*) -

    The boolean expression identifying the rows to return. When omitted, the iterator returns all rows ordered by primary key.

- `Parameters` (*QueryParameters?*) -

    The optional query parameters. See [QueryParameters](QueryParameters.md).

- `BatchSize` (*int*) -

    The number of rows to fetch per batch. Defaults to 1000.

- `ReduceStopForBest` (*bool*) -

    When true (default), the server stops reducing results once the top-K best results are found, which can improve performance at the cost of exactness. When false, the server performs a full reduction.

**RETURN TYPE:**

*QueryIterator*

**RETURNS:**

A **QueryIterator** that lazily pages over query results as an async iterator of `IReadOnlyList<FieldData>` batches, consuming one `BatchSize`-sized batch per server round-trip. Consume with `await foreach`, optionally with `.WithCancellation(token)`.

The **QueryIterator** exposes the following members:

**METHODS:**

- `GetAsyncEnumerator(CancellationToken cancellationToken = default)` -

    Returns an async enumerator that yields each page of query results as a batch of `FieldData`. See [FieldData](FieldData.md).

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

await foreach (IReadOnlyList<FieldData> batch in client.QueryIteratorAsync(new QueryIteratorReq
{
    CollectionName = "my_collection",
    Expression = "pages > 100"
}))
{
    // batch holds BatchSize rows of the matching collection.
}
```
