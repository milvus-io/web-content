# SearchIterator

A server-side iterator that pages over search results in batches using the `search_iter_v2` token protocol.

```csharp
public sealed class SearchIterator : IAsyncEnumerable<SingleResult>
{
    public IAsyncEnumerator<SingleResult> GetAsyncEnumerator(CancellationToken cancellationToken = default) { ... }
}
```

**METHODS:**

- `GetAsyncEnumerator(CancellationToken cancellationToken = default)` -

    Returns an async enumerator that yields each page of search results as a `SingleResult` holding that page's top-K hits with their scores, primary keys and output fields.
