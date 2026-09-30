---
id: jieba-tokenizer.md
title: "Jieba"
summary: "The jieba tokenizer processes Chinese text by breaking it down into its component words."
---

# Jieba

The `jieba` tokenizer processes Chinese text by breaking it down into its component words.

<div class="alert note">

The `jieba` tokenizer preserves punctuation marks as separate tokens in the output. For example, `"你好！世界。"` becomes `["你好", "！", "世界", "。"]`. To remove these standalone punctuation tokens, use the [`removepunct`](removepunct-filter.md) filter.

</div>

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
    "tokenizer": "jieba",  # Use the default settings: dict=["_default_"], mode="search", hmm=True
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
    "hmm": True                # Enable HMM for probabilistic segmentation
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
        "hmm": False               # Disable HMM; unmatched text will be split into individual characters
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();                                                                          
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
  put("type", "jieba");                                                                                                      
  put("dict", Arrays.asList("customDictionary"));             
  put("mode", "exact");
  put("hmm", false);
}});

```

```javascript
// javascript
```

```go
analyzerParams := map[string]interface{}{
  "tokenizer": map[string]interface{}{
      "type": "jieba",
      "dict": []string{"customDictionary"},
      "mode": "exact",
      "hmm":  false,
  },
}
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
     <td><p>A list of dictionaries that the analyzer will load as its vocabulary source. Built-in options:</p><ul><li><p><code>"_default_"</code>: Loads the engine's built‑in Simplified‑Chinese dictionary. For details, refer to <a href="https://github.com/messense/jieba-rs/blob/v0.6.8/src/data/dict.txt">dict.txt</a>.</p></li><li><p><code>"_extend_default_"</code>: Loads everything in <code>"_default_"</code> plus an additional Traditional‑Chinese supplement. For details, refer to <a href="https://github.com/milvus-io/milvus/blob/v2.5.11/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/data/jieba/dict.txt.big">dict.txt.big</a>.</p><p>You can also mix the built‑in dictionary with any number of custom dictionaries. Example: <code>["_default_", "结巴分词器"]</code>.</p></li></ul></td>
     <td><p><code>["_default_"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>mode</code></p></td>
     <td><p>The segmentation mode. Possible values:</p><ul><li><p><code>"exact"</code>: Tries to segment the sentence in the most precise manner, making it ideal for text analysis.</p></li><li><p><code>"search"</code>: Builds on exact mode by further breaking down long words to improve recall, making it suitable for search engine tokenization.</p><p>For more information, refer to <a href="https://github.com/fxsjy/jieba">Jieba GitHub Project</a>.</p></li></ul></td>
     <td><p><code>"search"</code></p></td>
   </tr>
   <tr>
     <td><p><code>hmm</code></p></td>
     <td><p>A boolean flag indicating whether to enable the Hidden Markov Model (HMM) for probabilistic segmentation of words not found in the dictionary.</p></td>
     <td><p><code>true</code></p></td>
   </tr>
</table>

To load a large custom vocabulary from an external file instead of inlining it via `dict`, see [Custom configuration with a dictionary file](jieba-tokenizer.md#Custom-configuration-with-a-dictionary-file) below.

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

### Custom configuration with a dictionary file | Milvus 3.0.x

For large custom vocabularies — domain glossaries, product terminology, or proper-noun lists — store the words in a file and register the file as a remote file resource, then reference it from the tokenizer via the `extra_dict_file` parameter. The analyzer loads these words into its vocabulary on top of the built-in dictionary.

The file is plain UTF‑8 text with one term per line. For example:

```plaintext
结巴分词器
向量数据库
```

Upload the file to the object store that your Milvus cluster is configured to use, then register it:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Register the uploaded file under a name you'll reference from analyzer configs.
client.add_file_resource(
    name="zh_terms",
    path="file/zh_terms.txt",    # full S3 object key, including the rootPath prefix
)
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

Reference the registered resource in the tokenizer via `extra_dict_file`:

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
        "dict": ["_default_"],             # keep the built-in dictionary
        "mode": "exact",
        "hmm": False,
        "extra_dict_file": {
            "type": "remote",
            "resource_name": "zh_terms",
            "file_name": "zh_terms.txt",
        },
    },
}

client.run_analyzer(["milvus结巴分词器中文测试"], analyzer_params)
# → [['milvus', '结巴', '分词器', '中文', '测试']]
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

The `extra_dict_file` parameter accepts an object with the following fields:

<table>
   <tr>
     <th><p>Field</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>type</code></p></td>
     <td><p>The resource type. Use <code>"remote"</code> for a file registered via <code>add_file_resource</code>. For the <code>"local"</code> variant used in self-hosted deployments, refer to <a href="manage-file-resources.md">Manage File Resources</a>.</p></td>
   </tr>
   <tr>
     <td><p><code>resource_name</code></p></td>
     <td><p>The name used when the file was registered with <code>add_file_resource</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>file_name</code></p></td>
     <td><p>The filename portion of the registered resource's object-store path (for example, <code>"zh_terms.txt"</code> if the resource was registered with <code>path="file/zh_terms.txt"</code>).</p></td>
   </tr>
</table>

Words added via `extra_dict_file` are merged with the built-in dictionary, so jieba's segmentation algorithm sees them alongside existing entries. Whether any specific term surfaces as a standalone token depends on jieba's probability-weighted DAG selection — a long custom term such as `向量数据库` may still be split into `向量` + `数据库` if those shorter entries have higher frequencies in the built-in dictionary.

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
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
  put("type", "jieba");                                                                                                      
  put("dict", Arrays.asList("结巴分词器"));                   
  put("mode", "exact");
  put("hmm", false);
}});
```

```javascript
// javascript
```

```go
analyzerParams := map[string]interface{}{
  "tokenizer": map[string]interface{}{
      "type": "jieba",
      "dict": []string{"结巴分词器"},
      "mode": "exact",
      "hmm":  false,
  },
}
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

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

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
        .token("root:Milvus")
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
import (
    "context"
    "encoding/json"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

bs, _ := json.Marshal(analyzerParams)
texts := []string{"milvus结巴分词器中文测试"}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(string(bs))

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
# restful
```

### Expected output

```python
['milvus', '结巴分词器', '中', '文', '测', '试']
```

