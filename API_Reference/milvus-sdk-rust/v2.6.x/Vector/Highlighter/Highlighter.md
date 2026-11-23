# Highlighter

A **Highlighter** instance configures post-processing term highlighting for text fields in search results. There are two types of highlighters: lexical highlighters and semantic highlighters.

```rust
pub struct Highlighter
```

**PARAMETERS:**

- `highlight_type: HighlightType`

    The highlighting strategy, `Lexical` or `Semantic`. Defaults to `Lexical`.

- `params: HashMap<String, String>`

    The highlighting parameters, such as pre-tags, post-tags, and fragment settings.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `highlight_type(value)` / `set_highlight_type(value)` / `get_highlight_type()` - Sets or returns the highlight type.
- `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the highlighting parameters.

`Highlighter` also implements `From<LexicalHighlighter>` and `From<SemanticHighlighter>` to convert a typed highlighter into its parameterized form.

## Related operations

- [LexicalHighlighter](LexicalHighlighter.md)

- [SemanticHighlighter](SemanticHighlighter.md)

## Example

```rust
let highlighter = LexicalHighlighter::new()
    .highlight_search_text(true)
    .pre_tags(["{"])
    .post_tags(["}"]);
let request = SearchRequest::builder()
    .collection_name("my_collection")
    .vector_field("sparse_vector")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3]]))
    .highlighter(highlighter)
    .build()?;
```
