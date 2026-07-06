---
id: thai-tokenizer.md
title: "Thai"
summary: "The thai tokenizer segments Thai text into word tokens and filters out whitespace and punctuation-only segments."
beta: Milvus 3.0.0+
---

# Thai

The `thai` tokenizer segments Thai text into word tokens without relying on spaces. Use this tokenizer when you need to build a custom analyzer pipeline for Thai or mixed Thai/English text.

## Configuration

<div class="alert note">

For Thai text, use the built-in [`thai`](thai-analyzer.md) analyzer in most cases. The built-in analyzer includes this tokenizer together with lowercasing, decimal digit normalization, and Thai stop-word removal. Use the `thai` tokenizer directly only when you need to build a custom analyzer pipeline.

</div>

To configure an analyzer using the `thai` tokenizer, set `tokenizer` to `thai` in `analyzer_params`.

```python
analyzer_params = {
    "tokenizer": "thai",
}
```

The `thai` tokenizer has no configurable parameters.

The tokenizer can work with one or more filters. For example, the following configuration uses the `thai` tokenizer with the [`lowercase`](lowercase-filter.md) and [`decimaldigit`](decimaldigit-filter.md) filters:

```python
analyzer_params = {
    "tokenizer": "thai",
    "filter": [
        "lowercase",
        "decimaldigit",
    ],
}
```

This custom pipeline is not equivalent to the built-in `thai` analyzer because it does not include the built-in `_thai_` stop-word dictionary. For the complete predefined pipeline, use `{"type": "thai"}`.

The tokenizer applies the following behavior:

- **Thai segmentation**: Segments Thai text into word tokens without relying on whitespace.
- **Whitespace and punctuation filtering**: Filters out whitespace and punctuation-only segments. This differs from the [`icu`](icu-tokenizer.md) tokenizer, which can preserve punctuation and spaces as tokens.
- **Mixed-script text**: Emits Latin word tokens in mixed Thai/English text.
- **Tokenizer only**: Does not lowercase tokens, normalize Unicode digits, or remove stop words. Add filters or use the built-in [`thai`](thai-analyzer.md) analyzer for those steps.
- **Position semantics**: Uses character-based token positions that include skipped whitespace and punctuation, which keeps phrase and proximity matching behavior consistent with other non-Latin tokenizers.

After defining `analyzer_params`, you can apply the analyzer to a `VARCHAR` field when defining a collection schema. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

```python
analyzer_params = {
    "tokenizer": "thai",
}
```

### Verification using `run_analyzer`

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

sample_text = "สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓"

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

### Expected output

```
['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus', '๑๒๓']
```
