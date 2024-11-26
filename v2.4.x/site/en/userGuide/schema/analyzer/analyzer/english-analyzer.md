---
id: english-analyzer.md
title: English Analyzer
related_key: english, analyzer
summary: The `english` analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering.​
---

# English​

The `english` analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering.​

### Definition​

The `english` analyzer uses the following components:​

- **Tokenizer**: Uses the [`standard tokenizer`](standard-tokenizer.md) to split text into discrete word units.​

- Filters: Includes multiple filters for comprehensive text processing:​

    - [`lowercase`](lowercase-filter.md): Converts all tokens to lowercase, enabling case-insensitive searches.​

    - [`stemmer`](stemmer-filter.md): Reduces words to their root form to support broader matching (e.g., "running" becomes "run").​

    - [`stop_words`](stop-filter.md): Removes common English stop words to focus on key terms in text.​

The functionality of the `english` analyzer is equivalent to the following custom analyzer configuration:​

```python
analyzer_params = {​
    "tokenizer": "standard",​
    "filter": [​
        "lowercase",​
        {​
            "type": "stemmer",​
            "language": "english"​
        }，{​
            "type": "stop",​
            "stop_words": "_english_",​
        }​
    ]​
}​
```

### Configuration​

To apply the `english` analyzer to a field, simply set `type` to `english` in `analyzer_params`, and include optional parameters as needed.​

```python
analyzer_params = {​
    "type": "english",​
}​
```

The `english` analyzer accepts the following optional parameters: ​

<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parameter​</p>

</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Description​</p>

</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code>stop_words</code>​</p>

</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">An array containing a list of stop words, which will be removed from tokenization. Defaults to <code>_english_</code>, a built-in set of common English stop words.​</p>

</td></tr></tbody></table>

Example configuration with custom stop words:​

```python
analyzer_params = {​
    "type": "english",​
    "stop_words": ["a", "an", "the"]​
}​
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).​

### Example output​

Here’s how the `english` analyzer processes text.​

**Original text**:​

```python
"The Milvus vector database is built for scale!"​
```

**Expected output**:​

```python
["milvus", "vector", "databas", "built", "scale"]​
```