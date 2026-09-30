# Highlighter

This struct configures text highlighting for search results.

```rust
pub struct Highlighter
```

**PARAMETERS:**

- `highlight_type: HighlightType`

    Highlighting strategy, `Lexical` or `Semantic`. Defaults to `Lexical`.

- `params: HashMap<String, String>`

    Highlighting parameters, such as pre-tags, post-tags, and fragment settings.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `highlight_type(value)` / `set_highlight_type(value)` / `get_highlight_type()` - Sets or returns the highlight type.
- `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the highlighting parameters.

`Highlighter` also implements `From<LexicalHighlighter>` and `From<SemanticHighlighter>` to convert a typed highlighter into its parameterized form.

## Example

```rust
let highlighter = Highlighter::new()
    .highlight_type(HighlightType::Lexical)
    .params(HashMap::from([("pre_tags".to_owned(), "<b>".to_owned())]));
```
