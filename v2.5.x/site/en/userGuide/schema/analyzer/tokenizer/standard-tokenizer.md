---
id: standard-tokenizer.md
title: "Standard Tokenizer"
summary: "The standard tokenizer in Milvus splits text based on spaces and punctuation marks, making it suitable for most languages."
---

# Standard Tokenizer

The `standard` tokenizer in Milvus splits text based on spaces and punctuation marks, making it suitable for most languages.

## Configuration

To configure an analyzer using the `standard` tokenizer, set `tokenizer` to `standard` in `analyzer_params`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
</div>

```python
analyzer_params = {
    "tokenizer": "standard",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
```

The `standard` tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `standard` tokenizer and `lowercase` filter:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
</div>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["lowercase"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

<div class="alert note">

For simpler setup, you may choose to use the `standard` [analyzer](standard-analyzer.md), which combines the `standard` tokenizer with the `lowercase`[ filter](lowercase-filter.md).

</div>

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#null).

## Example output

Here’s an example of how the `standard` tokenizer processes text:

**Original text**:

```python
"The Milvus vector database is built for scale!"
```

**Expected output**:

```python
["The", "Milvus", "vector", "database", "is", "built", "for", "scale"]
```

