---
id: chinese-analyzer.md
title: "Chinese"
summary: "The chinese analyzer is designed specifically to handle Chinese text, providing effective segmentation and tokenization."
---

# Chinese

The `chinese` analyzer is designed specifically to handle Chinese text, providing effective segmentation and tokenization.

### Definition

The `chinese` analyzer consists of:

- **Tokenizer**: Uses the `jieba` tokenizer to segment Chinese text into tokens based on vocabulary and context. For more information, refer to [Jieba](jieba-tokenizer.md).

- **Filter**: Uses the `cnalphanumonly` filter to remove tokens that contain any non-Chinese characters. For more information, refer to [Cnalphanumonly](cnalphanumonly-filter.md).

The functionality of the `chinese` analyzer is equivalent to the following custom analyzer configuration:

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
    "filter": ["cnalphanumonly"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("cnalphanumonly"));
```

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
};
```

```go
// go
```

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba",
  "filter": [
    "cnalphanumonly"
  ]
}'

```

### Configuration

To apply the `chinese` analyzer to a field, simply set `type` to `chinese` in `analyzer_params`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "type": "chinese",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "chinese");
```

```javascript
const analyzer_params = {
    "type": "chinese",
}
```

```go
// go
```

```bash
# restful
analyzerParams='{
  "type": "chinese"
}'
```

<div class="alert note">

The `chinese` analyzer does not accept any optional parameters.

</div>

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

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
    "type": "chinese",
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
Chinese analyzer output: ['Milvus', '是', '一个', '高性', '性能', '高性能', '可', '扩展', '的', '向量', '数据', '据库', '数据库']
```

