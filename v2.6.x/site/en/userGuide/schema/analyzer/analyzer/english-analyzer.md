---
id: english-analyzer.md
title: "English"
summary: "The english analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering."
---

# English

The `english` analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering.

## Definition

The `english` analyzer uses the following components:

- **Tokenizer**: Uses the `standard`[ tokenizer](standard-tokenizer.md) to split text into discrete word units.

- **Filters**: Includes multiple filters for comprehensive text processing:

    - `lowercase`: Converts all tokens to lowercase, enabling case-insensitive searches.

    - `stemmer`: Reduces words to their root form to support broader matching (e.g., "running" becomes "run").

    - `stop_words`: Removes common English stop words to focus on key terms in text.

The functionality of the `english` analyzer is equivalent to the following custom analyzer configuration:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
        "tokenizer": "standard",
        "filter": [
                "lowercase",
                {
                        "type": "stemmer",
                        "language": "english"
                }, {
                        "type": "stop",
                        "stop_words": "_english_"
                }
        ]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
        Arrays.asList("lowercase",
                new HashMap<String, Object>() {{
                    put("type", "stemmer");
                    put("language", "english");
                }},
                new HashMap<String, Object>() {{
                    put("type", "stop");
                    put("stop_words", Collections.singletonList("_english_"));
                }}
        )
);
```

```javascript
const analyzer_params = {
    "type": "standard", // Specifies the standard analyzer type
    "stop_words", ["of"] // Optional: List of words to exclude from tokenization
}
```

```go
analyzerParams = map[string]any{"tokenizer": "standard",
        "filter": []any{"lowercase", map[string]any{
            "type":     "stemmer",
            "language": "english",
        }, map[string]any{
            "type":       "stop",
            "stop_words": "_english_",
        }}}
```

```bash
# restful
analyzerParams='{
  "tokenizer": "standard",
  "filter": [
    "lowercase",
    {
      "type": "stemmer",
      "language": "english"
    },
    {
      "type": "stop",
      "stop_words": "_english_"
    }
  ]
}'

```

## Configuration

To apply the `english` analyzer to a field, simply set `type` to `english` in `analyzer_params`, and include optional parameters as needed.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "type": "english",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
```

```javascript
const analyzer_params = {
    "type": "english",
}
```

```go
analyzerParams = map[string]any{"type": "english"}
```

```bash
# restful
analyzerParams='{
  "type": "english"
}'
```

The `english` analyzer accepts the following optional parameters: 

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>stop_words</code></p></td>
     <td><p>An array containing a list of stop words, which will be removed from tokenization. Defaults to <code>_english_</code>, a built-in set of common English stop words.</p></td>
   </tr>
</table>

Example configuration with custom stop words:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "type": "english",
    "stop_words": ["a", "an", "the"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
analyzerParams.put("stop_words", Arrays.asList("a", "an", "the"));
```

```javascript
const analyzer_params = {
    "type": "english",
    "stop_words": ["a", "an", "the"]
}
```

```go
analyzerParams = map[string]any{"type": "english", "stop_words": []string{"a", "an", "the"}}
```

```bash
# restful
analyzerParams='{
  "type": "english",
  "stop_words": [
    "a",
    "an",
    "the"
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
    "type": "english",
    "stop_words": ["a", "an", "the"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
analyzerParams.put("stop_words", Arrays.asList("a", "an", "the"));
```

```javascript
// javascript
```

```go
analyzerParams = map[string]any{"type": "english", "stop_words": []string{"a", "an", "the"}}
```

```bash
# restful
analyzerParams='{
  "type": "english",
  "stop_words": [
    "a",
    "an",
    "the"
  ]
}'

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
sample_text = "Milvus is a vector database built for scale!"

# Run the standard analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("English analyzer output:", result)
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
texts.add("Milvus is a vector database built for scale!");

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

```python
English analyzer output: ['milvus', 'vector', 'databas', 'built', 'scale']
```

