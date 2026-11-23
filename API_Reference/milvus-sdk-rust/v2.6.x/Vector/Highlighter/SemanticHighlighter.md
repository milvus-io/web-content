# SemanticHighlighter

A **SemanticHighlighter** instance configures post-processing semantic highlighting for text fields in search results. Unlike lexical highlighting which matches exact terms, semantic highlighting identifies and marks relevant text segments based on semantic similarity to the query. Highlighting annotates matched spans using customizable tags. It does not impact retrieval, filtering, ranking, or scoring.

```rust
pub struct SemanticHighlighter
```

**PARAMETERS:**

- `queries: Vec<String>`

    A list of search queries to match against the document. The highlighter uses these queries to identify semantically relevant text segments in the results.

- `input_fields: Vec<String>`

    The schema fields to highlight. Specifies which text fields in the search results should be processed for semantic highlighting.

- `pre_tags: Vec<String>`

    Tags inserted before each matched segment in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- `post_tags: Vec<String>`

    Tags inserted after each matched segment, paired with `pre_tags`. Rotation follows the same order as `pre_tags` when multiple tags are provided.

- `threshold: Option<f32>`

    The minimum confidence score (0.0 to 1.0) that defines "sufficient match" for highlighting. Semantic highlighting is applied per item after top-k retrieval; only segments that semantically match the query above this threshold return highlighted fragments with `pre_tags`/`post_tags`.

- `highlight_only: bool`

    If `true`, only the sentence-level fragments that are semantically related to the query are returned, which helps focus on the most relevant context. If `false`, the full paragraph containing those fragments is returned instead, as long as its length does not exceed the model's context limit. Defaults to `true`.

- `model_deployment_id: String`

    The ID of the deployed highlight model used for semantic inference. This model determines how semantic similarity is computed between queries and document segments.

- `max_client_batch_size: Option<i64>`

    Limits the number of items processed in a single batch. Useful for controlling memory usage and processing throughput.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `queries(value)` / `set_queries(value)` / `get_queries()` - Sets or returns the queries.
- `input_fields(value)` / `set_input_fields(value)` / `get_input_fields()` - Sets or returns the input fields.
- `pre_tags(value)` / `set_pre_tags(value)` / `get_pre_tags()` - Sets or returns the pre tags.
- `post_tags(value)` / `set_post_tags(value)` / `get_post_tags()` - Sets or returns the post tags.
- `threshold(value)` / `set_threshold(value)` / `get_threshold()` - Sets or returns the confidence threshold.
- `highlight_only(value)` / `set_highlight_only(value)` / `get_highlight_only()` - Sets or returns whether only sentence-level fragments are returned.
- `model_deployment_id(value)` / `set_model_deployment_id(value)` / `get_model_deployment_id()` - Sets or returns the model deployment ID.
- `max_client_batch_size(value)` / `set_max_client_batch_size(value)` / `get_max_client_batch_size()` - Sets or returns the maximum client batch size.

## Example

```rust
let highlighter = SemanticHighlighter::new()
    .queries(["my doc"])
    .input_fields(["text"])
    .pre_tags(["<mark>"])
    .post_tags(["</mark>"])
    .threshold(0.3);
```
