# with_query()

Adds a query-term definition to a `LexicalHighlighter` configuration for highlighting text matched by filtering expressions (e.g., TEXT_MATCH). This augments `highlight_query` with one entry describing which field and terms to highlight and which filter type produced them. Highlighting runs as post-processing and does not affect retrieval, filtering, ranking, or scoring.

## Request syntax

```python
with_query(
    field: str,
    text: str,
    query_type: str
)
```

**PARAMETERS**:

- **field** (*str*) -
The target text field name whose content should be annotated when matches are found by the filtering expression. Must correspond to a **VARCHAR** text field in the collection schema.

- **text** (*str*) -
The terms or phrase to highlight from the filtering expression. For example, **"my doc"** will highlight matches of **"my"** and **"doc"** in the specified field.

- **query_type** (*str*) -
The filtering type that provides the terms to highlight. For text-based filtering, use **"TextMatch"** to correspond to the **TEXT_MATCH** condition.

**RETURNS**:

*None*

## Examples

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
)

highlighter.with_query(field="text", text="my doc", query_type="TextMatch")

results = client.search(
    collection_name="your_collection",
    data=["test"],
    anns_field="sparse_vector",
    limit=10,
    search_params={"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}},
    output_fields=["text"],
    highlighter=highlighter,
)
```
