# HighlightResult

Highlight fragments for one field of a full-text/hybrid search result.

```csharp
public sealed class HighlightResult
{
    public string FieldName { get; }
    public IReadOnlyList<MilvusHighlightData> Datas { get; }
}
```

**PARAMETERS:**

- `FieldName` (*string*) -

    The name of the highlighted field.

- `Datas` (*IReadOnlyList\<MilvusHighlightData\>*) -

    The per-hit highlight data, flattened across all queries in the same order as the search hits.

**MilvusHighlightData:**

The highlight fragments and scores for a single query of a highlighted field.

```csharp
public sealed class MilvusHighlightData
{
    public IReadOnlyList<string> Fragments { get; }
    public IReadOnlyList<float> Scores { get; }
}
```

**PARAMETERS:**

- `Fragments` (*IReadOnlyList\<string\>*) -

    The matched fragments.

- `Scores` (*IReadOnlyList\<float\>*) -

    The per-fragment relevance scores.
