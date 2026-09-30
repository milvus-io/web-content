---
id: arabic-analyzer.md
title: "Arabic"
summary: "The built-in Arabic analyzer processes Arabic text by normalizing letter variants and digits, stemming terms, and removing Arabic stop words."
beta: Milvus 3.0.0+
---

# Arabic

The `arabic` analyzer is a built-in analyzer for Arabic text. Use this analyzer when you need Milvus to normalize Arabic letter variants, remove diacritics and Tatweel, convert Arabic-Indic digits, apply Arabic stemming, and remove Arabic stop words.

## Configuration

Built-in analyzers are Milvus-provided analyzer templates. To use a built-in analyzer, set `type` to a predefined analyzer name in `analyzer_params`.

To use the built-in Arabic analyzer, set `type` to `arabic`:

```python
analyzer_params = {
    "type": "arabic",
}
```

The `arabic` analyzer accepts the following optional parameter:

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Default</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>stop_words</code></p></td>
     <td><p><code>list[str]</code></p></td>
     <td><p><code>_arabic_</code></p></td>
     <td><p>A list of additional stop words to remove from tokenization. By default, the <code>arabic</code> analyzer uses the built-in <code>_arabic_</code> dictionary. To inspect the default dictionary, refer to the Milvus <a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/arabic.txt">Arabic stop-word list</a>. The list is sourced from the Apache Lucene <a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/ar/stopwords.txt">Arabic stopwords file</a>.</p></td>
   </tr>
</table>

To add custom stop words, include `stop_words`:

```python
analyzer_params = {
    "type": "arabic",
    "stop_words": ["ميلفوس"],
}
```

Milvus applies custom stop words in addition to the built-in `_arabic_` dictionary.

The built-in `arabic` analyzer is equivalent to the following custom analyzer configuration:

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": [
        "lowercase",
        "decimaldigit",
        "arabic_normalization",
        {
            "type": "stemmer",
            "language": "arabic",
        },
        {
            "type": "stop",
            "stop_words": "_arabic_",
        },
    ],
}
```

This analyzer applies the following processing steps:

- **Tokenization**: Uses the `standard` tokenizer to split text into tokens.
- **Digit normalization**: Uses the `decimaldigit` filter to convert Arabic-Indic and other Unicode decimal digits to ASCII digits.
- **Arabic normalization**: Uses the `arabic_normalization` filter to normalize Alef variants, Teh Marbuta, and Alef Maksura, and remove Harakat and Tatweel.
- **Stemming**: Uses the `stemmer` filter with `language` set to `arabic`.
- **Stop-word removal**: Uses the `stop` filter with the built-in `_arabic_` dictionary.

After defining `analyzer_params`, you can apply the analyzer to a `VARCHAR` field when defining a collection schema. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

```python
analyzer_params = {
    "type": "arabic",
}
```

### Verification using `run_analyzer`

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

sample_text = "كِتَابٌ عـــربي ١٢٣"

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

### Expected output

```
['كتاب', 'عرب', '123']
```
