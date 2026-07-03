---
id: pinyin-filter.md
title: "Pinyin"
summary: "The pinyin filter converts Chinese character tokens into Pinyin tokens during text analysis, enabling Pinyin-based matching for Chinese text."
beta: Milvus 3.0.x
---

# Pinyin

Chinese text search often requires users to enter Chinese characters exactly as they appear in the indexed text. In name lookup, autocomplete, and search-as-you-type workflows, users frequently type Pinyin instead of Chinese characters. For example, a user may type `zuqiu` to search for `足球`. The `pinyin` filter adds Pinyin tokens to the analyzer output so Chinese text can match Pinyin input without maintaining a separate Pinyin field.

The `pinyin` filter is typically used with the [Jieba](jieba-tokenizer.md) tokenizer for Chinese text. It works in a custom analyzer filter pipeline and can emit multiple Pinyin token forms for the same Chinese token.

## Configuration

To use the default options, specify `"pinyin"` in the `filter` section of `analyzer_params`.

```python
analyzer_params = {
    "tokenizer": "jieba",
    # highlight-next-line
    "filter": ["pinyin"],
}
```

This shorthand keeps the original Chinese tokens and emits character-level Pinyin tokens. It does not emit joined Pinyin or Pinyin initials unless you enable those options explicitly.

For full control, specify the filter as an object and configure the Pinyin token forms that Milvus emits.

```python
analyzer_params = {
    "tokenizer": "jieba",
    # highlight-start
    "filter": [
        {
            "type": "pinyin",
            "keep_original": True,
            "keep_full_pinyin": True,
            "keep_joined_full_pinyin": False,
            "keep_separate_first_letter": False,
        }
    ],
    # highlight-end
}
```

The filter accepts the following parameters.


| Parameter                    | Type    | Default | Description                                                                               |
| ---------------------------- | ------- | ------- | ----------------------------------------------------------------------------------------- |
| `keep_original`              | Boolean | `true`  | Keeps the original Chinese token in the analyzer output.                                   |
| `keep_full_pinyin`           | Boolean | `true`  | Emits character-level Pinyin tokens. For example, `中文` produces `zhong` and `wen`.        |
| `keep_joined_full_pinyin`    | Boolean | `false` | Emits a joined Pinyin token for each source token. For example, `中文` produces `zhongwen`. |
| `keep_separate_first_letter` | Boolean | `false` | Emits a Pinyin-initials token for each source token. For example, `中文` produces `zw`.     |


The filter operates on tokens produced by the tokenizer. For Chinese text, use it with a tokenizer such as `jieba`.

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior with `run_analyzer`.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

sample_text = "中文测试"
```

### Match Chinese text with character-level Pinyin

The default `pinyin` filter keeps the original Chinese tokens and emits character-level Pinyin tokens.

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["pinyin"],
}

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

Expected output:

```plaintext
['中文', 'zhong', 'wen', '测试', 'ce', 'shi']
```

### Match Chinese terms with joined Pinyin

Enable `keep_joined_full_pinyin` when you need a Chinese term to match its full joined Pinyin form.

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": [
        {
            "type": "pinyin",
            "keep_original": True,
            "keep_full_pinyin": False,
            "keep_joined_full_pinyin": True,
            "keep_separate_first_letter": False,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

Expected output:

```plaintext
['中文', 'zhongwen', '测试', 'ceshi']
```

### Match Chinese terms with Pinyin initials

Enable `keep_separate_first_letter` when you need a Chinese term to match the initials of its Pinyin form.

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": [
        {
            "type": "pinyin",
            "keep_original": True,
            "keep_full_pinyin": False,
            "keep_joined_full_pinyin": False,
            "keep_separate_first_letter": True,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

Expected output:

```plaintext
['中文', 'zw', '测试', 'cs']
```
