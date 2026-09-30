---
id: text-highlighter.md
title: "Text Highlighter"
summary: "The Highlighter in Milvus annotates matched terms in text fields by wrapping them with customizable tags. Highlighting helps explain why a document matches, improves result readability, and supports rich rendering in search and RAG applications."
beta: Milvus 2.6.8+
---

# Text Highlighter

The Highlighter in Milvus annotates matched terms in text fields by wrapping them with customizable tags. Highlighting helps explain why a document matches, improves result readability, and supports rich rendering in search and RAG applications.

Highlighting is executed as a post-processing step on the final search result set. It does not affect candidate retrieval, filtering logic, ranking, or scoring.

The Highlighter provides three independent dimensions of control:

- **Which terms are highlighted**

    You can choose where highlighted terms come from. For example, highlight search terms used in **BM25 full text search**, or query terms specified in **text-based filtering expressions** (such as `TEXT_MATCH` conditions).

- **How highlighted terms are rendered**

    You can control how matched terms appear in the highlighting output by configuring the tags inserted before and after each match. For example, use simple markers like `{}` or HTML tags such as `<em></em>` for rich rendering.

- **How highlighted text is returned**

    You can control how highlighted results are returned as fragments, including where fragments start, how long they are, and how many fragments are returned.

The following sections walk through these scenarios.

## Search term highlighting in BM25 full text search

When you perform a BM25 full text search, you can highlight the **search terms** in the returned result to help explain why a document matches the query. To learn more about BM25 full text search, refer to [Full Text Search](full-text-search.md).

In this scenario, highlighted terms come directly from the search terms used in BM25 full text search. The Highlighter uses these terms to annotate matched text in the final result.

Assume the following content is stored in a text field:

```plaintext
Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
```

**Highlighter configuration**

To highlight search terms in BM25 full text search, create a `LexicalHighlighter` and enable search term highlighting for BM25 full text search:

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],              # Tag inserted before each highlighted term
    post_tags=["}"],             # Tag inserted after each highlighted term
    highlight_search_text=True   # Enable search term highlighting for BM25 full text search
)
```

In this example:

- `pre_tags` and `post_tags` control how highlighted text appears in the output. In this case, matched terms are wrapped by `{}` (for example, `{term}`). You can also provide multiple tags as a list (for example, `["<b>", "<i>"]`). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.

- `highlight_search_text=True` tells Milvus to use the search terms in BM25 full text search as the source of highlighted terms.

Once the Highlighter object is created, apply its configuration to your BM25 full text search request:

```python
results = client.search(
    ...,
    data=["BM25"],      # Search term used in BM25 full text search
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

**Highlighting output**

When highlighting is enabled, Milvus returns highlighted text in a dedicated `highlight` field. By default, highlighted output is returned as a fragment starting from the first matched term.

In this example, the search term is `"BM25"`, so it is highlighted in the returned result:

```json
{
    ...,
    "highlight": {
        "text": [
            "{BM25} for keyword relevance. Filters can narrow results."
        ]
    }
}
```

To control the position, length, and number of returned fragments, see [Return highlighted text as fragments](text-highlighter.md#Fragment-based-highlighting-output).

## Query term highlighting in filtering

In addition to highlighting search terms, you can highlight terms used in text-based filtering expressions.

<div class="alert note">

Currently, only the `TEXT_MATCH` filtering condition is supported for query term highlighting. To learn more, refer to [Text Match](keyword-match.md).

</div>

In this scenario, highlighted terms come from text-based filtering expressions. Filtering determines which documents match, while the Highlighter annotates the matched text spans.

Assume the following content is stored in a text field:

```python
This document explains how text filtering works in Milvus.
```

**Highlighter configuration**

To highlight query terms used in filtering, create a `LexicalHighlighter` and define a `highlight_query` that corresponds to the filtering condition:

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],              # Tag inserted before each highlighted term
    post_tags=["}"],             # Tag inserted after each highlighted term
    highlight_query=[{
        "type": "TextMatch",     # Text filtering type
        "field": "text",         # Target text field
        "text": "text filtering" # Terms to highlight
    }]
)
```

In this configuration:

- `pre_tags` and `post_tags` control how highlighted text appears in the output. In this case, matched terms are wrapped by `{}` (for example, `{term}`). You can also provide multiple tags as a list (for example, `["<b>", "<i>"]`). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.

- `highlight_query` defines which filtering terms should be highlighted.

Once the Highlighter object is created, apply the same filtering expression and the highlighter configuration to your search request:

```python
results = client.search(
    ...,
    filter='TEXT_MATCH(text, "text filtering")',
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

**Highlighting output**

When query term highlighting is enabled for filtering, Milvus returns highlighted text in a dedicated `highlight` field. By default, highlighted output is returned as a fragment starting from the first matched term.

In this example, the first matched term is `"text"`, so the returned highlighted text starts from that position:

```json
{
    ...,
    "highlight": {
        "text": [
            "{text} {filtering} works in Milvus."
        ]
    }
}
```

To control the position, length, and number of returned fragments, see [Return highlighted text as fragments](text-highlighter.md#Fragment-based-highlighting-output).

## Fragment-based highlighting output

By default, Milvus returns highlighted text as fragments starting from the first matched term. Fragment-related settings allow you to further control how fragments are returned, without changing which terms are highlighted.

Assume the following content is stored in a text field:

```plaintext
Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
```

**Highlighter configuration**

To control the shape of highlighted fragments, configure fragment-related options in the `LexicalHighlighter`:

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
    fragment_offset=5,     # Number of characters to reserve before the first matched term
    fragment_size=60,      # Max. length of each fragment to return
    num_of_fragments=1     # Max. number of fragments to return
)
```

In this configuration:

- `fragment_offset` reserves leading context before the first highlighted term.

- `fragment_size` limits how much text is included in each fragment.

- `num_of_fragments` controls how many fragments are returned.

Once the Highlighter object is created, apply the highlighter configuration to your search request:

```python
results = client.search(
    ...,
    data=["BM25"],
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

**Highlighting output**

With fragment-based highlighting enabled, Milvus returns highlighted text as fragments in the `highlight` field:

```json
{
    ...,
    "highlight": {
        "text": [
            "Use {BM25} for keyword relevance. Filters can narrow results."
        ]
    }
}
```

In this output:

- The fragment does not start exactly at `{BM25}` because `fragment_offset` is set.

- Only one fragment is returned because `num_of_fragments` is 1.

- The length of the fragment is capped by `fragment_size`.

## Examples

### Preparation

Before using the highlighter, ensure your collection is properly configured.

The example below creates a collection that supports BM25 full text search and `TEXT_MATCH` queries, then inserts sample documents.

<details>

<summary><strong>Prepare your collection</strong></summary>

```python
from pymilvus import (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    LexicalHighlighter,
)

client = MilvusClient(uri="http://localhost:19530")
COLLECTION_NAME = "highlighter_demo"

# Clean up existing collection
if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

# Define schema
schema = client.create_schema(enable_dynamic_field=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True, auto_id=True)
schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=2000,
    enable_analyzer=True,  # Required for BM25
    enable_match=True,     # Required for TEXT_MATCH
)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)

# Add BM25 function
schema.add_function(Function(
    name="text_bm25",
    function_type=FunctionType.BM25,
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
))

# Create index
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="sparse_vector",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="BM25",
    params={"inverted_index_algo": "DAAT_MAXSCORE", "bm25_k1": 1.2, "bm25_b": 0.75},
)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema, index_params=index_params)

# Insert sample documents
docs = [
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications "
    "of every size from running a demo chatbot to building web-scale search.",
]
client.insert(collection_name=COLLECTION_NAME, data=[{"text": t} for t in docs])
print(f"✓ Collection created with {len(docs)} documents\n")

# Helper for search params
SEARCH_PARAMS = {"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}}

# Expected output:
# ✓ Collection created with 4 documents
```

</details>

### Example 1: Highlight search terms in BM25 full text search

This example shows how to highlight search terms in BM25 full text search.

- BM25 full text search uses `"test"` as the search term

- The highlighter wraps all occurrences of "test" with `{` and `}` tags

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,  # Highlight BM25 query terms
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test"],
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for hit in results[0]:
    print(f"  {hit.get('highlight', {}).get('text', [])}")
print()
```

<details>

<summary>Expected output</summary>

```plaintext
['{test} doc']
['{test} doc']
['{test} doc. Milvus is an open-source vector database built for GenAI applications.']
['{test} doc. Milvus is an open-source vector database that suits AI applications of every size from run']
```

</details>

### Example 2: Highlight query terms in filtering

This example shows how to highlight terms matched by a `TEXT_MATCH` filter.

- BM25 full text search uses `"test"` as the query term

- The `queries` parameter adds `"my doc"` to the highlight list

- The highlighter wraps all matched terms (`"my"`, `"test"`, `"doc"`) with `{` and `}`

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,   # Also highlight BM25 term
    highlight_query=[                     # Additional TEXT_MATCH terms to highlight
        {"type": "TextMatch", "field": "text", "text": "my doc"},
    ],
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test"],
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for hit in results[0]:
    print(f"  {hit.get('highlight', {}).get('text', [])}")
print()
```

<details>

<summary>Expected output</summary>

```plaintext
['{my} first {test} {doc}']
['{my} second {test} {doc}']
['{my} first {test} {doc}. Milvus is an open-source vector database built for GenAI applications.']
['{my} second {test} {doc}. Milvus is an open-source vector database that suits AI applications of every siz']
```

</details>

### Example 3: Return highlights as fragments

In this example, the query searches for `"Milvus"` and returns highlight fragments in the following settings:

- `fragment_offset` keeps up to 20 characters before the first highlighted span as leading context (default is 0).

- `fragment_size` limits each fragment to approximately 60 characters (default is 100).

- `num_of_fragments` limits the number of returned fragments per text value (default is 5).

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
    fragment_offset=20,  # Keep 20 chars before match
    fragment_size=60,    # Max ~60 chars per fragment
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["Milvus"],
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for i, hit in enumerate(results[0]):
    frags = hit.get('highlight', {}).get('text', [])
    print(f"  Doc {i+1}: {frags}")
print()
```

<details>

<summary>Expected output</summary>

```plaintext
Doc 1: ['my first test doc. {Milvus} is an open-source vector database ']
Doc 2: ['my second test doc. {Milvus} is an open-source vector database']
```

</details>

### Example 4: Multi-query highlighting

When searching with multiple queries in BM25 full text search, each query's results are highlighted independently. The first query's results contain highlights for its search term, and the second query's results contain highlights for its search term, and so on. Each query uses the same `highlighter` configuration but applies it independently.

In the example below:

- First query highlights `"test"` in its result set

- Second query highlights `"Milvus"` in its result set

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test", "Milvus"],  # Two queries
    anns_field="sparse_vector",
    limit=2,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for nq_idx, hits in enumerate(results):
    query_term = ["test", "Milvus"][nq_idx]
    print(f"  Query '{query_term}':")
    for hit in hits:
        print(f"    {hit.get('highlight', {}).get('text', [])}")
print()
```

<details>

<summary>Expected output</summary>

```plaintext
Query 'test':
  ['{test} doc']
  ['{test} doc']
Query 'Milvus':
  ['{Milvus} is an open-source vector database built for GenAI applications.']
  ['{Milvus} is an open-source vector database that suits AI applications of every size from running a dem']
```

</details>

### Example 5: Custom HTML tags

You can use any tags for highlighting, such as HTML-safe tags for web UIs. This is useful when rendering search results in a browser.

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["<mark>"],
    post_tags=["</mark>"],
    highlight_search_text=True,
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test"],
    anns_field="sparse_vector",
    limit=2,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for hit in results[0]:
    print(f"  {hit.get('highlight', {}).get('text', [])}")
print()
```

<details>

<summary>Expected output</summary>

```plaintext
['<mark>test</mark> doc']
['<mark>test</mark> doc']
```

</details>

