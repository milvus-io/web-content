# Highlighter

A `Highlighter` instance configures post-processing term highlighting for text fields in search results. There are two types of highlighters, namely lexical highlighters and semantic highlighters.

```java
io.milvus.v2.service.vector.request.highlighter.Highlighter
```

## Methods

The following are the methods of the `Highlighter` interface:

- `highlightType()`

    Returns the type of the highlighter.

- `getParams()`

    Returns the parameters of the highlighter as key-value pairs.

## Related operations

- [LexicalHighlighter](LexicalHighlighter.md)

- [SemanticHighlighter](SemanticHighlighter.md)

