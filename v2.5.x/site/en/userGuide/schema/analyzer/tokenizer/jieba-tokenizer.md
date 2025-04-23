---
id: jieba-tokenizer.md
title: "Jieba"
summary: "The jieba tokenizer processes Chinese text by breaking it down into its component words."
---

# Jieba

The `jieba` tokenizer processes Chinese text by breaking it down into its component words.

## Configuration

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Simple configuration: only specifying the tokenizer name
analyzer_params = {
    "tokenizer": "jieba",  # Use the default settings: dict=["_default_"], mode="search", hmm=true
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
```

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
};
```

```go
analyzerParams = map[string]any{"tokenizer": "jieba"}
```

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba"
}'
```

## Examples

### Analyzer configuration

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": {
        "type": "jieba",
        "dict": ["结巴分词器"],
        "mode": "exact",
        "hmm": False
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "jieba");
analyzerParams.put("dict", Collections.singletonList("结巴分词器"));
analyzerParams.put("mode", "exact");
analyzerParams.put("hmm", false);
```

```javascript
// javascript
```

```go
analyzerParams = map[string]any{"type": "jieba", "dict": []any{"结巴分词器"}, "mode": "exact", "hmm": false}
```

```bash
# restful
```

### Expected output

```python
['milvus', '结巴分词器', '中', '文', '测', '试']
```

