---
id: chinese-analyzer.md
title: Chinese Analyzer
related_key: chinese, analyzer
summary: The `chinese` analyzer is designed specifically to handle Chinese text, providing effective segmentation and tokenization.​
---

# Chinese​

The `chinese` analyzer is designed specifically to handle Chinese text, providing effective segmentation and tokenization.​

### Definition​

The `chinese` analyzer consists of:​

- **Tokenizer**: Uses the `jieba` tokenizer to segment Chinese text into tokens based on vocabulary and context. For more information, refer to [​Jieba](jieba-tokenizer.md).​

- **Filter**: Uses the `cnalphanumonly` filter to remove tokens that contain any non-Chinese characters. For more information, refer to [​Cnalphanumonly](cnalphanumonly-filter.md).​

The functionality of the `chinese` analyzer is equivalent to the following custom analyzer configuration:​

```python
analyzer_params = {​
    "tokenizer": "jieba",​
    "filter": ["cnalphanumonly"]​
}​
```

### Configuration​

To apply the `chinese` analyzer to a field, simply set `type` to `chinese` in `analyzer_params`.​

```python
analyzer_params = {​
    "type": "chinese",​
}​
```

<div class="alert note">

The `chinese` analyzer does not accept any optional parameters.​

</div>

### Example output​

Here’s how the `chinese` analyzer processes text.​

**Original text**:​

```python
"Milvus 是一个高性能、可扩展的向量数据库！"​
```

**Expected output**:​

```python
["Milvus", "是", "一个", "高性", "性能", "高性能", "可", "扩展", "的", "向量", "数据", "据库", "数据库"]​
```
