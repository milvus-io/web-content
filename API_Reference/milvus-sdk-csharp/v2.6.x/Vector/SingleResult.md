# SingleResult

The search results for a single query vector: its top-K hits with scores, primary keys and output fields.

```csharp
public sealed class SingleResult
{
    public string PrimaryKeyName { get; }
    public Ids Ids { get; }
    public IReadOnlyList<float> Scores { get; }
    public IReadOnlyList<FieldData> OutputFields { get; }
    public IReadOnlyDictionary<string, object?> GetRow(int rowIndex);
}
```

**PARAMETERS:**

- `PrimaryKeyName` (*string*) -

    The primary key field name of the searched collection, as reported by the server.

- `Ids` (*Ids*) -

    The primary keys of the top-K hits, in score order. See [Ids](Ids.md).

- `Scores` (*IReadOnlyList\<float\>*) -

    The scores (distances) of the top-K hits, in descending similarity order.

- `OutputFields` (*IReadOnlyList\<FieldData\>*) -

    The output fields of this query's hits, one column per requested output field (column-oriented, one element per hit). See [FieldData](FieldData.md).

**METHODS:**

- `GetRow(int rowIndex)` (*IReadOnlyDictionary\<string, object?\>*) -

    Materializes the hit at the given zero-based index into a row dictionary mapping field name to value (plus the `"score"` entry), the same shape the row-based insert/upsert accepts.
