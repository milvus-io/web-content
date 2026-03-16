# SemanticHighlighter

The **SemanticHighlighter** configures post-processing semantic highlighting for text fields in search results. Unlike lexical highlighting which matches exact terms, semantic highlighting identifies and marks relevant text segments based on semantic similarity to the query. Highlighting annotates matched spans using customizable tags. It does not impact retrieval, filtering, ranking, or scoring.

```python
class pymilvus.SemanticHighlighter
```

## Constructor

Initializes a highlighter configuration used with semantic search.

```python
SemanticHighlighter(
    queries: List[str],
    input_fields: List[str],
    pre_tags: Optional[List[str]] = None,
    post_tags: Optional[List[str]] = None,
    threshold: Optional[float] = None,
    highlight_only: Optional[bool] = None,
    model_deployment_id: Optional[str] = None,
    max_client_batch_size: Optional[int] = None,
)
```

**PARAMETERS:**

- **queries** (*list[str]*) - 

    A list of search queries to match against the document. The highlighter uses these queries to identify semantically relevant text segments in the results.

- **input_fields** (*list[str]*) - 

    The schema fields to highlight. Specifies which text fields in the search results should be processed for semantic highlighting.

- **pre_tags** (*list[str]*) - 

    Tags inserted before each matched segment in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- **post_tags** (*list[str]*) - 

    Tags inserted after each matched segment, paired with `pre_tags`. Rotation follows the same order as `pre_tags` when multiple tags are provided.

- **threshold** (*float*) - 

    The minimum confidence score (0.0 to 1.0) that defines "sufficient match" for highlighting. Semantic highlighting is applied per item after top-k retrieval—only segments that semantically match the query above this threshold will return highlighted fragments with `pre_tags`/`post_tags`. If unset, segments below the threshold return empty results (`fragments=[], scores=[]`)

- **highlight_only** (*bool*) - 

    If `True` (default), only the sentence-level fragments that are semantically related to the query are returned, which helps focus on the most relevant context. If set to `False`, the full paragraph containing those fragments is returned instead, as long as its length does not exceed the model’s context limit. However, when full paragraphs are returned, the `scores` field is no longer meaningful.

- **model_deployment_id** (*str*) - 

    The ID of the deployed highlight model used for semantic inference. This model determines how semantic similarity is computed between queries and document segments.

- **max_client_batch_size** (*int*) - 

    Limits the number of items processed in a single batch. Useful for controlling memory usage and processing throughput.

**RETURN TYPE:**

*SemanticHighlighter*

**RETURNS:**

A SemanticHighlighter object.

## Examples

Highlight semantically relevant text in dense vector search:

```python
from pymilvus import MilvusClient, SemanticHighlighter

queries = ["When was artificial intelligence founded",
           "Where was Alan Turing born?"]

highlighter = SemanticHighlighter(
    queries,
    ["document"],
    pre_tags=["<mark>"],
    post_tags=["</mark>"],
    model_deployment_id="your-model-deployment-id",
)

results = client.search(
    collection_name="your_collection",
    data=queries,
    anns_field="dense",
    limit=3,
    output_fields=["document"],
    highlighter=highlighter,
)
```

The search results include a `highlight` field containing the highlighted fragments and their confidence scores:

```python
# Example output:
# hit: {
#     'id': 1,
#     'distance': 0.766,
#     'entity': {'document': 'Artificial intelligence was founded as an academic discipline in 1956.'},
#     'highlight': {
#         'document': {
#             'fragments': ['<mark>Artificial intelligence was founded as an academic discipline in 1956.</mark>'],
#             'scores': [1.0]
#         }
#     }
# }
```

Use `threshold` to filter low-confidence highlights:

```python
from pymilvus import MilvusClient, SemanticHighlighter

highlighter = SemanticHighlighter(
    queries=["machine learning applications"],
    input_fields=["content"],
    pre_tags=["<em>"],
    post_tags=["</em>"],
    threshold=0.8,
    model_deployment_id="your-model-deployment-id",
)

results = client.search(
    collection_name="your_collection",
    data=["machine learning applications"],
    anns_field="dense",
    limit=10,
    output_fields=["content"],
    highlighter=highlighter,
)
```
