---
id: whitespace-tokenizer.md
title: "Whitespace"
summary: "The whitespace tokenizer divides text into terms whenever there is a space between words."
---

# Whitespace

The `whitespace` tokenizer divides text into terms whenever there is a space between words.

## Configuration

To configure an analyzer using the `whitespace` tokenizer, set `tokenizer` to `whitespace` in `analyzer_params`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "whitespace",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
```

```javascript
const analyzer_params = {
    "tokenizer": "whitespace"
};
```

```go
analyzerParams = map[string]any{"tokenizer": "whitespace"}
```

```bash
# restful
analyzerParams='{
  "tokenizer": "whitespace"
}'
```

The whitespace tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `whitespace` tokenizer and `lowercase`[ filter](lowercase-filter.md):

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "whitespace",
    "filter": ["lowercase"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```javascript
const analyzer_params = {
    "tokenizer": "whitespace",
    "filter": ["lowercase"]
};
```

```go
analyzerParams = map[string]any{"tokenizer": "whitespace", "filter": []any{"lowercase"}}
```

```bash
# restful
analyzerParams='{
  "tokenizer": "whitespace",
  "filter": [
    "lowercase"
  ]
}'
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

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
    "tokenizer": "whitespace",
    "filter": ["lowercase"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```javascript
// javascript
```

```go
analyzerParams = map[string]any{"tokenizer": "whitespace", "filter": []any{"lowercase"}}
```

```bash
# restful
```

### Verification using `run_analyzer`

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import (
    MilvusClient,
)

client = MilvusClient(uri="http://localhost:19530")

# Sample text to analyze
sample_text = "The Milvus vector database is built for scale!"

# Run the standard analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Standard analyzer output:", result)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

List<String> texts = new ArrayList<>();
texts.add("The Milvus vector database is built for scale!");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
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

```plaintext
['the', 'milvus', 'vector', 'database', 'is', 'built', 'for', 'scale!']
```

