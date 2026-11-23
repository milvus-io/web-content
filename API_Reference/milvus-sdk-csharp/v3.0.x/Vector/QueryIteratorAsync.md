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

    The optional query parameters. See [QueryParameters](QueryParameters.md). `OrderByFields` and `GroupByFields` are rejected for iterators: the primary-key cursor protocol pages independently of ordering.

- `BatchSize` (*int*) -

    The number of rows to fetch per batch. Defaults to 1000.

- `ReduceStopForBest` (*bool*) -

    When true (default), the server stops reducing results once the top-K best results are found, which can improve performance at the cost of exactness. When false, the server performs a full reduction.

- `RlsPrincipal` (*string?*) -

    The row-level security (RLS) principal for the operation. When set, Milvus applies the row policies of the collection to this operation.

- `SkipRls` (*bool?*) -

    Whether the operation should skip row-level security (RLS) enforcement. When `null`, the server default applies.

- `Cursor` (*QueryIteratorCursor?*) -

    An optional cursor from a previous `QueryIteratorAsync` (via `QueryIterator.GetCursor`), resuming pagination from that position on the captured MVCC snapshot. When set, the iterator skips the offset seek. A **QueryIteratorCursor** has the following members:

    - `SessionTs` (*ulong*) -

        The session timestamp of the iterator that produced this cursor, pinning the MVCC snapshot the resumed iterator continues on.

    - `IntPk` (*long?*) -

        The last returned integer primary key, or `null` when the primary key is a string.

    - `StrPk` (*string?*) -

        The last returned string primary key, or `null` when the primary key is an integer.

    - `LastElementOffset` (*long?*) -

        For an `element_filter` iterator, the last matched element offset; `null` for ordinary iterators.

**RETURN TYPE:**

*QueryIterator*

**RETURNS:**

A **QueryIterator** that lazily pages over query results as an async iterator of `IReadOnlyList<FieldData>` batches, consuming one `BatchSize`-sized batch per server round-trip. Consume with `await foreach`, optionally with `.WithCancellation(token)`.

The **QueryIterator** exposes the following members:

**METHODS:**

- `GetAsyncEnumerator(CancellationToken cancellationToken = default)` -

    Returns an async enumerator that yields each page of query results as a batch of `FieldData`. See [FieldData](FieldData.md).

- `GetCursor()` -

    Captures the current iterator position as a resumable cursor, which can be passed back through `QueryIteratorReq.Cursor` to continue pagination from this point on the same MVCC snapshot. The cursor carries the members described under `Cursor` above (`SessionTs`, `IntPk`/`StrPk` and, for element-filter iterators, `LastElementOffset`). Returns `null` when no snapshot has been established yet (no page consumed, or a fresh iterator whose first page is still in flight).

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
