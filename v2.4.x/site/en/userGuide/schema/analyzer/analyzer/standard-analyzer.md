---
id: standard-analyzer.md
title: Standard​ Analyzer
related_key: standard, analyzer
summary: The `standard` analyzer is the default analyzer in Milvus, which is automatically applied to text fields if no analyzer is specified. It uses grammar-based tokenization, making it effective for most languages.​
---

# Standard​

The `standard` analyzer is the default analyzer in Milvus, which is automatically applied to text fields if no analyzer is specified. It uses grammar-based tokenization, making it effective for most languages.​

## Definition​

The `standard` analyzer consists of:​

- **Tokenizer**: Uses the `standard` tokenizer to split text into discrete word units based on grammar rules. For more information, refer to [​Standard](standard-tokenizer.md).​

- **Filter**: Uses the `lowercase` filter to convert all tokens to lowercase, enabling case-insensitive searches. For more information, refer to ​[`lowercase filter`](lowercase-filter.md).

The functionality of the `standard` analyzer is equivalent to the following custom analyzer configuration:​

```python
analyzer_params = {​
    "tokenizer": "standard",​
    "filter": ["lowercase"]​
}​
```

## Configuration​

To apply the `standard` analyzer to a field, simply set `type` to `standard` in `analyzer_params`, and include optional parameters as needed.​

```python
analyzer_params = {​
    "type": "standard", # Specifies the standard analyzer type​
}​
```

The `standard` analyzer accepts the following optional parameters: ​

<table data-block-token="RYdmdh6LRoVtrVxY4RHcvUTxned"><thead><tr><th data-block-token="IbXLd0A89oY8rjxRXsccdHxmn6d" colspan="1" rowspan="1"><p data-block-token="Afe5dOJUIoIEhOxAPyqcUlqdnih">Parameter​</p>

</th><th data-block-token="LpTFdYXm6ox6Rgx5wAWciQjfnjn" colspan="1" rowspan="1"><p data-block-token="LR2QdjlzVoMv8ixoLDScpuhsnxb">Description​</p>

</th></tr></thead><tbody><tr><td data-block-token="AJKvdnlG8oAp8exzFbocIvf9nGf" colspan="1" rowspan="1"><p data-block-token="EXV8djjJtoYolLxllxRcIivYnre"><code>stop_words</code>​</p>

</td><td data-block-token="KWkqdOBuRoPg39xtTqWcf5RQnbb" colspan="1" rowspan="1"><p data-block-token="R8HedE6qTo4UmlxpQaLcE8oNn0b">An array containing a list of stop words, which will be removed from tokenization. Defaults to <code>_english_</code>, a built-in set of common English stop words. The details of <code>_english_</code> can be found <a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">here</a>.​</p>

</td></tr></tbody></table>

Example configuration of custom stop words:​

```python
analyzer_params = {​
    "type": "standard", # Specifies the standard analyzer type​
    "stop_words", ["of"] # Optional: List of words to exclude from tokenization​
}​
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For more information, refer to [Example use](analyzer-overview.md#).​

## Example output​

Here’s how the `standard` analyzer processes text.​

**Original text**:​

```python
"The Milvus vector database is built for scale!"​
```

**Expected output**:​

```python
["the", "milvus", "vector", "database", "is", "built", "for", "scale"]​
```