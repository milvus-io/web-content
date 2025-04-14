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
    "tokenizer": "jieba",  
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
// go
```

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba"
}'
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

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
    "tokenizer": "jieba",  
}
```

```java
// java
```

```javascript
// javascript
```

```go
// go
```

```bash
# restful
```

### Expected output

```python
['milvus', '结巴分词器', '中', '文', '测', '试']
```

