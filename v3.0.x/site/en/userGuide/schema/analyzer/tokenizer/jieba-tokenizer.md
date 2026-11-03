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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

```go
analyzerParams := map[string]any{"tokenizer": "jieba"}
```

```rust
use serde_json::json;

let analyzer_params = json!({"tokenizer": "jieba"});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
};
```

```csharp
// Simple configuration: only specifying the tokenizer name
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba" // Use the default settings: dict=["_default_"], mode="search", hmm=True
};
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
# Custom configuration equivalent to the simple configuration above
analyzer_params = {
    "tokenizer": {                 # Tokenizer configuration
        "type": "jieba",           # Tokenizer type, fixed as "jieba"
        "dict": ["_default_"],     # Use the default dictionary
        "mode": "search",          # Use search mode for improved recall (see mode details below)
        "hmm": True                # Enable HMM for probabilistic segmentation
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
  put("type", "jieba");
  put("dict", Collections.singletonList("_default_"));
  put("mode", "search");
  put("hmm", true);
}});
```

```go
analyzerParams := map[string]any{
  "tokenizer": map[string]any{
    "type": "jieba",
    "dict": []any{"_default_"},
    "mode": "search",
    "hmm":  true,
  },
}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": {
        "type": "jieba",
        "dict": ["_default_"],
        "mode": "search",
        "hmm": true
    }
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", {
        {"type", "jieba"},
        {"dict", {"_default_"}},
        {"mode", "search"},
        {"hmm", true}
    }}
};
```

```javascript
const analyzer_params = {
  tokenizer: {
    type: "jieba",
    dict: ["_default_"],
    mode: "search",
    hmm: true,
  },
};
```

```csharp
// Custom configuration equivalent to the simple configuration above
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object> // Tokenizer configuration
    {
        ["type"] = "jieba",               // Tokenizer type, fixed as "jieba"
        ["dict"] = new[] { "_default_" }, // Use the default dictionary
        ["mode"] = "search",              // Use search mode for improved recall (see mode details below)
        ["hmm"] = true                    // Enable HMM for probabilistic segmentation
    }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": {
    "type": "jieba",
    "dict": ["_default_"],
    "mode": "search",
    "hmm": true
  }
}'
```

For details on parameters, refer to [Custom configuration](jieba-tokenizer.md#Custom-configuration).

### Custom configuration

For more control, you can provide a custom configuration that allows you to specify a custom dictionary, select the segmentation mode, and enable or disable the Hidden Markov Model (HMM). For example:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

```go
analyzerParams := map[string]any{
  "tokenizer": map[string]any{
      "type": "jieba",
      "dict": []string{"customDictionary"},
      "mode": "exact",
      "hmm":  false,
  },
}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": {
        "type": "jieba",
        "dict": ["customDictionary"],
        "mode": "exact",
        "hmm": false
    }
});
```

```cpp
nlohmann::json analyzer_params = {
  {"tokenizer", {
      {"type", "jieba"},
      {"dict", {"customDictionary"}},
      {"mode", "exact"},
      {"hmm", false}
  }}
};
```

```javascript
const analyzer_params = {
  tokenizer: {
    type: "jieba",
    dict: ["customDictionary"],
    mode: "exact",
    hmm: false,
  },
};
```

```csharp
// Custom configuration with user-defined settings
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "jieba",                  // Fixed tokenizer type
        ["dict"] = new[] { "customDictionary" }, // Custom dictionary list; replace with your own terms
        ["mode"] = "exact",                  // Use exact mode (non-overlapping tokens)
        ["hmm"] = false                      // Disable HMM; unmatched text will be split into individual characters
    }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": {
    "type": "jieba",
    "dict": ["customDictionary"],
    "mode": "exact",
    "hmm": false
  }
}'
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

<!-- This section is published to both Cloud manuals, so the heading stays product-neutral. -->
### Custom configuration with a dictionary file

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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Register the uploaded file under a name you'll reference from analyzer configs.
client.add_file_resource(
    name="zh_terms",
    path="file/zh_terms.txt",    # full S3 object key, including the rootPath prefix
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.AddFileResourceReq;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

client.addFileResource(AddFileResourceReq.builder()
        .name("zh_terms")
        .path("file/zh_terms.txt")
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = client.AddFileResource(ctx, milvusclient.NewAddFileResourceOption("zh_terms", "file/zh_terms.txt"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

client.add_file_resource(AddFileResourceRequest::builder()
    .name("zh_terms")
    .path("file/zh_terms.txt")
    .build()?).await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::AddFileResourceRequest add_file_request;
add_file_request.WithName("zh_terms");
add_file_request.WithPath("file/zh_terms.txt");
status = client->AddFileResource(add_file_request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

await client.addFileResource({
  name: "zh_terms",
  path: "file/zh_terms.txt",
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

// Register the uploaded file under a name you'll reference from analyzer configs.
await client.AddFileResourceAsync(new AddFileResourceReq
{
    Name = "zh_terms",
    Path = "file/zh_terms.txt" // full S3 object key, including the rootPath prefix
});
```

```bash
# restful
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/file_resources/add" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "name": "zh_terms",
    "path": "file/zh_terms.txt"
  }'
```

Reference the registered resource in the tokenizer via `extra_dict_file`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

result = client.run_analyzer("milvus结巴分词器中文测试", analyzer_params)
print(result)
```

```java
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
  put("type", "jieba");
  put("dict", Collections.singletonList("_default_"));
  put("mode", "exact");
  put("hmm", false);
  put("extra_dict_file", new HashMap<String, Object>() {{
    put("type", "remote");
    put("resource_name", "zh_terms");
    put("file_name", "zh_terms.txt");
  }});
}});

List<String> texts = new ArrayList<>();
texts.add("milvus结巴分词器中文测试");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

texts := []string{"milvus结巴分词器中文测试"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, r := range result {
    for _, token := range r.Tokens {
        fmt.Println("Jieba analyzer output:", token.Text)
    }
}
```

```rust
use milvus::v2::prelude::*;

let analyzer_params = serde_json::json!({
    "tokenizer": {
        "type": "jieba",
        "dict": ["_default_"],
        "mode": "exact",
        "hmm": false,
        "extra_dict_file": {
            "type": "remote",
            "resource_name": "zh_terms",
            "file_name": "zh_terms.txt"
        }
    }
});

let response = client.run_analyzer(RunAnalyzerRequest::builder()
    .texts(["milvus结巴分词器中文测试"])
    .analyzer_params(analyzer_params)
    .build()?).await?;

println!("{:?}", response.results());
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

nlohmann::json analyzer_params = {
    {"tokenizer", {
        {"type", "jieba"},
        {"dict", {"_default_"}},
        {"mode", "exact"},
        {"hmm", false},
        {"extra_dict_file", {
            {"type", "remote"},
            {"resource_name", "zh_terms"},
            {"file_name", "zh_terms.txt"}
        }}
    }}
};

milvus::RunAnalyzerRequest request;
request.WithAnalyzerParams(analyzer_params);
request.AddText("milvus结巴分词器中文测试");

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const analyzer_params = {
  tokenizer: {
    type: "jieba",
    dict: ["_default_"],
    mode: "exact",
    hmm: false,
    extra_dict_file: {
      type: "remote",
      resource_name: "zh_terms",
      file_name: "zh_terms.txt",
    },
  },
};

const result = await client.runAnalyzer({
  text: "milvus结巴分词器中文测试",
  analyzer_params,
});
console.log(result.results);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "jieba",
        ["dict"] = new[] { "_default_" }, // keep the built-in dictionary
        ["mode"] = "exact",
        ["hmm"] = false,
        ["extra_dict_file"] = new Dictionary<string, object>
        {
            ["type"] = "remote",
            ["resource_name"] = "zh_terms",
            ["file_name"] = "zh_terms.txt"
        }
    }
};

var result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { "milvus结巴分词器中文测试" }
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "text": ["milvus结巴分词器中文测试"],
    "analyzerParams": "{\"tokenizer\":{\"type\":\"jieba\",\"dict\":[\"_default_\"],\"mode\":\"exact\",\"hmm\":false,\"extra_dict_file\":{\"type\":\"remote\",\"resource_name\":\"zh_terms\",\"file_name\":\"zh_terms.txt\"}}}"
  }'
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

```go
analyzerParams := map[string]any{
  "tokenizer": map[string]any{
      "type": "jieba",
      "dict": []string{"结巴分词器"},
      "mode": "exact",
      "hmm":  false,
  },
}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": {
        "type": "jieba",
        "dict": ["结巴分词器"],
        "mode": "exact",
        "hmm": false
    }
});
```

```cpp
nlohmann::json analyzer_params = {
  {"tokenizer", {
      {"type", "jieba"},
      {"dict", {"结巴分词器"}},
      {"mode", "exact"},
      {"hmm", false}
  }}
};
```

```javascript
const analyzer_params = {
  tokenizer: {
    type: "jieba",
    dict: ["结巴分词器"],
    mode: "exact",
    hmm: false,
  },
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "jieba",
        ["dict"] = new[] { "结巴分词器" },
        ["mode"] = "exact",
        ["hmm"] = false
    }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": {
    "type": "jieba",
    "dict": ["结巴分词器"],
    "mode": "exact",
    "hmm": false
  }
}'
```

### Verification using `run_analyzer`

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

# Run the jieba tokenizer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Jieba analyzer output:", result)
```

```java
import java.util.*;
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

for (RunAnalyzerResp.AnalyzerResult result : results) {
    for (RunAnalyzerResp.AnalyzerToken token : result.getTokens()) {
        System.out.println("Jieba analyzer output: " + token.getToken());
    }
}
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

texts := []string{"milvus结巴分词器中文测试"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, r := range result {
    for _, token := range r.Tokens {
        fmt.Println("Jieba analyzer output:", token.Text)
    }
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let response = client
    .run_analyzer(
        RunAnalyzerRequest::builder()
            .texts(["milvus结巴分词器中文测试"])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;

for result in response.results() {
    for token in result.get_tokens() {
        println!("Jieba analyzer output: {}", token.get_text());
    }
}
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <string>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::string text = "milvus结巴分词器中文测试";
auto request = milvus::RunAnalyzerRequest()
                       .AddText(text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (const auto& result : response.Results()) {
    for (const auto& token : result.Tokens()) {
        std::cout << "Jieba analyzer output: " << token.token_ << std::endl;
    }
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

const sample_text = 'milvus结巴分词器中文测试';
const result = await client.runAnalyzer({
  text: sample_text,
  analyzer_params,
});
const tokens = result.results.flatMap(r => r.tokens.map(t => t.token));
console.log('Jieba analyzer output:', tokens);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

// Sample text to analyze
var sampleText = "milvus结巴分词器中文测试";

// Run the jieba tokenizer with the defined configuration
RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});

foreach (AnalyzerResult r in result.Results)
{
    foreach (AnalyzerToken t in r.Tokens)
    {
        Console.WriteLine($"Jieba analyzer output: {t.Token}");
    }
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "text": ["milvus结巴分词器中文测试"],
    "analyzerParams": "{\"tokenizer\":{\"type\":\"jieba\",\"dict\":[\"结巴分词器\"],\"mode\":\"exact\",\"hmm\":false}}"
  }'
```

### Expected output

For the sample text, the analyzer produces the following tokens in order. SDK response objects and printed formatting vary by language; the REST response contains these tokens at `data.results[].tokens[].token`.

```plaintext
['milvus', '结巴分词器', '中', '文', '测', '试']
```
