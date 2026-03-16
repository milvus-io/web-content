# LexicalHighlighter

The **LexicalHighlighter** configures post-processing term highlighting for text fields in search results. Highlighting annotates matched spans using customizable tags, and can return fragment-based snippets for improved readability and UI rendering. It does not impact retrieval, filtering, ranking, or scoring.

```python
class pymilvus.LexicalHighlighter
```

## Constructor

Initializes a highlighter configuration used with search and scalar filtering.

```python
LexicalHighlighter(
    highlight_query: Optional[List] = None,
    highlight_search_text: Optional[bool] = None,
    pre_tags: Optional[List[str]] = None,
    post_tags: Optional[List[str]] = None,
    fragment_offset: Optional[int] = None,
    fragment_size: Optional[int] = None,
)
```

**PARAMETERS**:

- **highlight_query** (*list[dict]*) -
Defines which query terms from text-based filters are highlighted. Each entry must be a dict:

    ```python
    [
        {"type": "<QueryType>", "field": "<text field name>", "text": "<terms to highlight>"},
        {...},
    ]
    ```

    If unset, no filtering terms are highlighted.

    For details, refer to [Text Highlighter](https://milvus.io/docs/text-highlighter.md).

- **highlight_search_text** (*bool*) -
Whether to highlight search terms used in BM25 full text search. If True, the BM25 query terms are used as the source of highlighted terms. If unset, BM25 search terms are not highlighted.

- **pre_tags** (*list[str]*) -
Tags inserted before each matched term in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- **post_tags** (*list[str]*) -
Tags inserted after each matched term, paired with `pre_tags`. Rotation follows the same order as pre_tags when multiple tags are provided.

- **fragment_offset** (*int*) -
Number of characters of leading context to keep before the first highlighted match when returning fragment-based output. Default behavior keeps no extra leading context.

- **fragment_size** (*int*) -
Maximum length of each returned fragment (in characters). The highlighter will cap fragment length approximately to this size.

- **num_of_fragments** (*int*) -
Maximum number of fragments to return per text value. If unset, the default is multiple fragments (implementation default; see Examples for typical values).

**RETURN TYPE**:

*LexicalHighlighter*

**RETURNS**:

A **LexicalHighlighter** object.

## Examples

Highlight search terms in BM25 full text search:

```python
from pymilvus import MilvusClient, LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
)

results = client.search(
    collection_name="your_collection",
    data=["test"],                 # BM25 query term
    anns_field="sparse_vector",
    limit=10,
    search_params={"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}},
    output_fields=["text"],
    highlighter=highlighter,
)
```

Highlight query terms in Text Match:

```python
from pymilvus import MilvusClient, LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["<mark>"],
    post_tags=["</mark>"],
    highlight_query=[{"type": "TextMatch", "field": "text", "text": "my doc"}],
)

results = client.search(
    collection_name="your_collection",
    data=["test"],                 # BM25 can be combined
    anns_field="sparse_vector",
    limit=10,
    search_params={"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}},
    output_fields=["text"],
    highlighter=highlighter,
)
```
