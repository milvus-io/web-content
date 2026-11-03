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

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "sparse",
    Texts = ["The Hobbit"],
    Limit = 5,
    Parameters = new SearchParameters
    {
        Highlighter = { ["pre_tag"] = "<b>", ["post_tag"] = "</b>" }
    }
});

foreach (HighlightResult highlight in results.HighlightResults ?? [])
{
    foreach (MilvusHighlightData data in highlight.Datas)
    {
        Console.WriteLine(string.Join(" ", data.Fragments));
    }
}
```
