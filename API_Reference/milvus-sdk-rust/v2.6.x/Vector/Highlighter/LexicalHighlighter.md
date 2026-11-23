# LexicalHighlighter

A **LexicalHighlighter** instance configures post-processing term highlighting for text fields in search results. Highlighting annotates matched spans using customizable tags, and can return fragment-based snippets for improved readability and UI rendering. It does not impact retrieval, filtering, ranking, or scoring.

```rust
pub struct LexicalHighlighter
```

**PARAMETERS:**

- `highlight_queries: Vec<HighlightQuery>`

    Which query terms from text-based filters are highlighted. Each entry is a `HighlightQuery` with a query type, a text field name, and the terms to highlight.

- `highlight_search_text: bool`

    Whether to highlight the search terms used in BM25 full text search. Defaults to `false`.

- `pre_tags: Vec<String>`

    Tags inserted before each matched term in the returned highlight. Supports plain strings (e.g., `{`) or HTML-safe markers (e.g., `<em>`, `<mark>`). If multiple tags are provided, tags rotate by match sequence.

- `post_tags: Vec<String>`

    Tags inserted after each matched term, paired with `pre_tags`. Rotation follows the same order as `pre_tags` when multiple tags are provided.

- `fragment_offset: Option<i64>`

    Number of characters of leading context to keep before the first highlighted match when returning fragment-based output.

- `fragment_size: Option<i64>`

    Maximum length of each returned fragment, in characters.

- `num_of_fragments: Option<i64>`

    Maximum number of fragments to return per text value.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `highlight_queries(value)` / `set_highlight_queries(value)` / `get_highlight_queries()` - Sets or returns the highlight queries.
- `add_highlight_query(value)` - Appends one highlight query.
- `highlight_search_text(value)` / `set_highlight_search_text(value)` / `get_highlight_search_text()` - Sets or returns whether search terms are highlighted.
- `pre_tags(value)` / `set_pre_tags(value)` / `get_pre_tags()` - Sets or returns the pre tags.
- `add_pre_tag(value)` - Appends one pre tag.
- `post_tags(value)` / `set_post_tags(value)` / `get_post_tags()` - Sets or returns the post tags.
- `add_post_tag(value)` - Appends one post tag.
- `fragment_offset(value)` / `set_fragment_offset(value)` / `get_fragment_offset()` - Sets or returns the fragment offset.
- `fragment_size(value)` / `set_fragment_size(value)` / `get_fragment_size()` - Sets or returns the fragment size.
- `num_of_fragments(value)` / `set_num_of_fragments(value)` / `get_num_of_fragments()` - Sets or returns the maximum number of fragments.

### HighlightQuery

Each entry of `highlight_queries` identifies the terms to highlight for a text-based filter query.

**PARAMETERS:**

- `query_type: String`

    The type of the filter query whose terms are highlighted.

- `field: String`

    The text field name the query targets.

- `text: String`

    The terms to highlight.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `query_type(value)` / `set_query_type(value)` / `get_query_type()` - Sets or returns the query type.
- `field(value)` / `set_field(value)` / `get_field()` - Sets or returns the field name.
- `text(value)` / `set_text(value)` / `get_text()` - Sets or returns the terms to highlight.

## Example

```rust
let highlighter = LexicalHighlighter::new()
    .highlight_search_text(true)
    .pre_tags(["<mark>"])
    .post_tags(["</mark>"]);
```
