---
id: thai-analyzer.md
title: "Thai"
summary: "The built-in Thai analyzer segments Thai text into words, normalizes Unicode decimal digits, and removes Thai stop words."
beta: Milvus 3.0.0+
---

# Thai

The `thai` analyzer is a built-in analyzer for Thai text. Use this analyzer when you need Milvus to segment Thai text into words, normalize Thai digits, lowercase mixed Latin text, and remove Thai stop words.

## Configuration

Built-in analyzers are Milvus-provided analyzer templates. To use a built-in analyzer, set `type` to a predefined analyzer name in `analyzer_params`.

To use the built-in Thai analyzer, set `type` to `thai`:

```python
analyzer_params = {
    "type": "thai",
}
```

The `thai` analyzer accepts the following optional parameter:

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
     <td><p><code>_thai_</code></p></td>
     <td><p>A list of additional stop words to remove from tokenization. By default, the <code>thai</code> analyzer uses the built-in <code>_thai_</code> dictionary. To inspect the default dictionary, refer to the Milvus <a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/thai.txt">Thai stop-word list</a>. The list is sourced from the Apache Lucene <a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/th/stopwords.txt">Thai stopwords file</a>.</p></td>
   </tr>
</table>

To add custom stop words, include `stop_words`:

```python
analyzer_params = {
    "type": "thai",
    "stop_words": ["มิลวัส"],
}
```

Milvus applies custom stop words in addition to the built-in `_thai_` dictionary.

The built-in `thai` analyzer is equivalent to the following custom analyzer configuration:

```python
analyzer_params = {
    "tokenizer": "thai",
    "filter": [
        "lowercase",
        "decimaldigit",
        {
            "type": "stop",
            "stop_words": ["_thai_"],
        },
    ],
}
```

This analyzer applies the following processing steps:

- **Tokenization**: Uses the [`thai`](thai-tokenizer.md) tokenizer to segment Thai text into word tokens without relying on whitespace. The tokenizer filters out whitespace and punctuation-only segments.
- **Case normalization**: Uses the `lowercase` filter, which affects Latin letters in mixed Thai/English text.
- **Digit normalization**: Uses the `decimaldigit` filter to convert Thai digits and other Unicode decimal digits to ASCII digits.
- **Stop-word removal**: Uses the `stop` filter with the built-in `_thai_` dictionary.
- **No stemming**: The built-in `thai` analyzer does not apply a `stemmer` filter.

After defining `analyzer_params`, you can apply the analyzer to a `VARCHAR` field when defining a collection schema. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

```python
analyzer_params = {
    "type": "thai",
}
```

### Verification using `run_analyzer`

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

sample_text = "ฉันรักการค้นหาข้อความใน Milvus ๑๒๓"

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

### Expected output

```
['ฉัน', 'รัก', 'ค้นหา', 'ข้อความ', 'milvus', '123']
```
