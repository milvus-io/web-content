---
id: jieba-tokenizer.md
title: "Jieba"
summary: "The jieba tokenizer processes Chinese text by breaking it down into its component words."
---

# Jieba

The `jieba` tokenizer processes Chinese text by breaking it down into its component words.

## Configuration

Milvus supports two configuration approaches for the `jieba` tokenizer: a simple configuration and a custom configuration.

### Simple configuration

With the simple configuration, you only need to set the tokenizer to `"jieba"`. For example:

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

This simple configuration is equivalent to the following custom configuration:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Custom configuration equivalent to the simple configuration above
analyzer_params = {
    "type": "jieba",          # Tokenizer type, fixed as "jieba"
    "dict": ["_default_"],     # Use the default dictionary
    "mode": "search",          # Use search mode for improved recall (see mode details below)
    "hmm": true                # Enable HMM for probabilistic segmentation
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "jieba");
analyzerParams.put("dict", Collections.singletonList("_default_"));
analyzerParams.put("mode", "search");
analyzerParams.put("hmm", true);
```

```javascript
// javascript
```

```go
analyzerParams = map[string]any{"type": "jieba", "dict": []any{"_default_"}, "mode": "search", "hmm": true}
```

```bash
# restful
```

For details on parameters, refer to [Custom configuration](jieba-tokenizer.md#Custom-configuration).

### Custom configuration

For more control, you can provide a custom configuration that allows you to specify a custom dictionary, select the segmentation mode, and enable or disable the Hidden Markov Model (HMM). For example:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Custom configuration with user-defined settings
analyzer_params = {
    "tokenizer": {
        "type": "jieba",           # Fixed tokenizer type
        "dict": ["customDictionary"],  # Custom dictionary list; replace with your own terms
        "mode": "exact",           # Use exact mode (non-overlapping tokens)
        "hmm": false               # Disable HMM; unmatched text will be split into individual characters
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "jieba");
analyzerParams.put("dict", Collections.singletonList("customDictionary"));
analyzerParams.put("mode", "exact");
analyzerParams.put("hmm", false);
```

```javascript
// javascript
```

```go
analyzerParams = map[string]any{"type": "jieba", "dict": []any{"customDictionary"}, "mode": "exact", "hmm": false}
```

```bash
# restful
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
   </tr>
   <tr>
     <td><p><code>type</code></p></td>
     <td><p>The type of tokenizer. This is fixed to <code>"jieba"</code>.</p></td>
     <td><p><code>"jieba"</code></p></td>
   </tr>
   <tr>
     <td><p><code>dict</code></p></td>
     <td><p>A list of dictionaries that the analyzer will load as its vocabulary source. Built-in options:</p>
<ul>
<li><p><code>"_default_"</code>: Loads the engine's built‑in Simplified‑Chinese dictionary. For details, refer to <a href="https://github.com/messense/jieba-rs/blob/v0.6.8/src/data/dict.txt">dict.txt</a>.</p></li>
<li><p><code>"_extend_default_"</code>: Loads everything in <code>"_default_"</code> plus an additional Traditional‑Chinese supplement. For details, refer to <a href="https://github.com/milvus-io/milvus/blob/v2.5.11/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/data/jieba/dict.txt.big">dict.txt.big</a>.</p>
<p>You can also mix the built‑in dictionary with any number of custom dictionaries. Example: <code>["_default_", "结巴分词器"]</code>.</p></li>
</ul></td>
     <td><p><code>["_default_"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>mode</code></p></td>
     <td><p>The segmentation mode. Possible values:</p>
<ul>
<li><p><code>"exact"</code>: Tries to segment the sentence in the most precise manner, making it ideal for text analysis.</p></li>
<li><p><code>"search"</code>: Builds on exact mode by further breaking down long words to improve recall, making it suitable for search engine tokenization.</p>
<p>For more information, refer to <a href="https://github.com/fxsjy/jieba">Jieba GitHub Project</a>.</p></li>
</ul></td>
     <td><p><code>"search"</code></p></td>
   </tr>
   <tr>
     <td><p><code>hmm</code></p></td>
     <td><p>A boolean flag indicating whether to enable the Hidden Markov Model (HMM) for probabilistic segmentation of words not found in the dictionary.</p></td>
     <td><p><code>true</code></p></td>
   </tr>
</table>

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
sample_text = "milvus结巴分词器中文测试"

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
texts.add("milvus结巴分词器中文测试");

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
['milvus', '结巴分词器', '中', '文', '测', '试']
```

