# QueryIterator

A server-side iterator that pages over query results in batches, driven by the primary key cursor.

```csharp
public sealed class QueryIterator : IAsyncEnumerable<IReadOnlyList<FieldData>>
{
    public IAsyncEnumerator<IReadOnlyList<FieldData>> GetAsyncEnumerator(CancellationToken cancellationToken = default) { ... }
}
```

**METHODS:**

- `GetAsyncEnumerator(CancellationToken cancellationToken = default)` -

    Returns an async enumerator that yields each page of query results as a batch of `FieldData`. See [FieldData](FieldData.md).
