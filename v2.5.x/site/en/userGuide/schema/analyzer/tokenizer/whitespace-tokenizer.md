---
id: whitespace-tokenizer.md
title: Whitespace​ Tokenizer
summary: "The `whitespace` tokenizer divides text into terms whenever there is a space between words.​"
---

# Whitespace​

The `whitespace` tokenizer divides text into terms whenever there is a space between words.​

## Configuration​

To configure an analyzer using the `whitespace` tokenizer, set `tokenizer` to `whitespace` in `analyzer_params`.​

```python
analyzer_params = {​
    "tokenizer": "whitespace",​
}​
```

The whitespace tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `whitespace` tokenizer and [`lowercase filter`](lowercase-filter.md):​

```python
analyzer_params = {​
    "tokenizer": "whitespace",​
    "filter": ["lowercase"]​
}​
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).​

## Example output​

Here’s an example of how the `whitespace` tokenizer processes text:​

**Original text**:​

```python
"The Milvus vector database is built for scale!"​
```

**Expected output**:​

```python
["The", "Milvus", "vector", "database", "is", "built", "for", "scale!"]​
```