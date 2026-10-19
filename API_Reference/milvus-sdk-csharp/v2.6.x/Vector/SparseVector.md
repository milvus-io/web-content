# SparseVector

Represents a sparse vector using COO (Coordinate) format: a set of (index, value) pairs with non-negative, ascending indices.

```csharp
public readonly struct SparseVector<T> : IEquatable<SparseVector<T>>
{
    public SparseVector(ReadOnlyMemory<int> indices, ReadOnlyMemory<T> values) { ... }
    public int Count { get; }
    public ReadOnlyMemory<int> Indices { get; }
    public ReadOnlyMemory<T> Values { get; }
}
```

**PARAMETERS:**

- `Count` (*int*) -

    The number of non-zero elements.

- `Indices` (*ReadOnlyMemory\<int\>*) -

    The indices of non-zero elements, in ascending order.

- `Values` (*ReadOnlyMemory\<T\>*) -

    The values of non-zero elements, in the same order as `Indices`.

**METHODS:**

- `SparseVector(ReadOnlyMemory<int> indices, ReadOnlyMemory<T> values)` (*constructor*) -

    Creates a sparse vector from parallel collections of indices and values. The indices must be non-negative and sorted in ascending order.
