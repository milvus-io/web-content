# EmbeddingList

A list of vectors used to search an Array-of-Struct vector sub-field; each vector in the list is matched against the struct elements, and the struct is scored by the closest element.

```csharp
public sealed class EmbeddingList
{
    public EmbeddingList() { }
    public EmbeddingList(IEnumerable<ReadOnlyMemory<float>> vectors) { ... }
    public EmbeddingList Add(ReadOnlyMemory<float> vector) { ... }
    public IReadOnlyList<ReadOnlyMemory<float>> Vectors { get; }
    public int Count { get; }
}
```

**PARAMETERS:**

- `Vectors` (*IReadOnlyList\<ReadOnlyMemory\<float\>\>*) -

    The vectors in the list.

- `Count` (*int*) -

    The number of vectors in the list.

**METHODS:**

- `EmbeddingList()` (*constructor*) -

    Creates an empty embedding list.

- `EmbeddingList(IEnumerable<ReadOnlyMemory<float>> vectors)` (*constructor*) -

    Creates an embedding list from the given vectors.

- `Add(ReadOnlyMemory<float> vector)` -

    Adds a vector to the list and returns this instance.
