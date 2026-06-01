# LexicalHighlighter

A `LexicalHighlighter` instance configures post-processing term highlighting for text fields in search results. Highlighting annotates matched spans using customizable tags, and can return fragment-based snippets for improved readability and UI rendering. It does not impact retrieval, filtering, ranking, or scoring.

```java
io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter
```

## Constructor

This constructor initializes a new `LexicalHighlighter` instance.

```java
LexicalHighlighter.builder()
    .highlightQueries(List<HighlightQuery>)
    .highlightSearchText(Boolean)
    .preTags(List<String>)
    .postTags(List<String>)
    .fragmentOffset(Integer)
    .fragmentSize(Integer)
    .numOfFragments(Integer)
    .build(); 
```

**BUILDER METHODS:**

- `highlightQueries(List<HighlightQuery>)`

    Defines which query terms from text-based filters are highlighted. Each entry must be a `HighlightQuery` instance.

    ```java
    import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
    import java.util.ArrayList;
    import java.util.List;
    
    LexicalHighter.HighlightQuery q = new LexicalHighlighter.HighlighterQuery(
        "<QueryType>",
        "<text field name>",
        "<terms to highlight>"
    )
    
    List<LexicalHighter.HighlightQuery> queries = new ArrayList<>();
    queries.add(q);
    ```

    If unset, no filtering terms are highlighted.

    For details, refer to [Text Highlighter](https://milvus.io/docs/text-highlighter.md).

- `highlightSearchText(Boolean)`

    Whether to highlight search terms used in BM25 full text search. If True, the BM25 query terms are used as the source of highlighted terms. If unset, BM25 search terms are not highlighted.

- `preTags(List<String>)`

    Tags inserted before each matched term in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- `postTags(List<String>)`

    Tags inserted after each matched term, paired with `pre_tags`. Rotation follows the same order as pre_tags when multiple tags are provided.

- `fragmentOffset(Integer)`

    Number of characters of leading context to keep before the first highlighted match when returning fragment-based output. Default behavior keeps no extra leading context.

- `fragmentSize(Integer)`

    Maximum length of each returned fragment (in characters). The highlighter will cap fragment length approximately to this size.

- `numOfFragments(Integer)`

    Maximum number of fragments to return per text value. If unset, the default is multiple fragments (implementation default; see Examples for typical values).

**RETURN TYPE:**

*LexicalHighlighter*

**RETURNS:**

A **LexicalHighlighter** instance.

## Example

Highlight search terms in BM25 full text search:

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

List<String> preTags = new ArrayList<>();
preTags.add("{");

List<String> postTags = new ArrayList<>();
postTags.add("}");

LexicalHighlighter highlighter = LexicalHighlighter.builder()
    .highlightSearchText(true)
    .preTags(preTags)
    .postTags(PostTags)
    .build(); 
    
SearchResp searchR = client.search(SearchReq.builder()
    .collectionName("your_collection")
    .data(Collections.singletonList("test"))
    .annsField("sparse_vector")
    .topK(10)
    .outputFields(Collections.singletonList("text"))
    .highlighter(highlighter)
    .build());
```

Highlight query terms in Text Match:

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

LexicalHighter.HighlightQuery q = new LexicalHighlighter.HighlighterQuery(
    "TextMatch",
    "text",
    "my doc"
)

List<LexicalHighter.HighlightQuery> queries = new ArrayList<>();
queries.add(q);

List<String> preTags = new ArrayList<>();
preTags.add("<mark>");

List<String> postTags = new ArrayList<>();
postTags.add("</mark>");

LexicalHighlighter highlighter = LexicalHighlighter.builder()
    .highlightQueries(Collections.singletonlist(q))
    .preTags(preTags)
    .postTags(PostTags)
    .build(); 
    
SearchResp searchR = client.search(SearchReq.builder()
    .collectionName("your_collection")
    .data(Collections.singletonList("test"))
    .annsField("sparse_vector")
    .topK(10)
    .outputFields(Collections.singletonList("text"))
    .highlighter(highlighter)
    .build());
```
