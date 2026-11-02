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
    "tokenizer": "jieba",
    # highlight-next-line
    "filter": ["pinyin"],
}
```

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("pinyin"));
```

```go
analyzerParams := map[string]any{
    "tokenizer": "jieba",
    "filter":    []string{"pinyin"},
}
```

```rust
let analyzer_params = serde_json::json!({
    "tokenizer": "jieba",
    "filter": ["pinyin"]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"pinyin"}}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["pinyin"],
};
```

```csharp
using System.Collections.Generic;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba",
    ["filter"] = new[] { "pinyin" }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba",
  "filter": ["pinyin"]
}'
```

This shorthand keeps the original Chinese tokens and emits character-level Pinyin tokens. It does not emit joined Pinyin or Pinyin initials unless you enable those options explicitly.

For full control, specify the filter as an object and configure the Pinyin token forms that Milvus emits.

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

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
Map<String, Object> pinyinFilter = new HashMap<>();
pinyinFilter.put("type", "pinyin");
pinyinFilter.put("keep_original", true);
pinyinFilter.put("keep_full_pinyin", true);
pinyinFilter.put("keep_joined_full_pinyin", false);
pinyinFilter.put("keep_separate_first_letter", false);
analyzerParams.put("filter", Collections.singletonList(pinyinFilter));
```

```go
analyzerParams := map[string]any{
    "tokenizer": "jieba",
    "filter": []map[string]any{
        {
            "type":                       "pinyin",
            "keep_original":              true,
            "keep_full_pinyin":           true,
            "keep_joined_full_pinyin":    false,
            "keep_separate_first_letter": false,
        },
    },
}
```

```rust
let analyzer_params = serde_json::json!({
    "tokenizer": "jieba",
    "filter": [
        {
            "type": "pinyin",
            "keep_original": true,
            "keep_full_pinyin": true,
            "keep_joined_full_pinyin": false,
            "keep_separate_first_letter": false
        }
    ]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {
        {
            {"type", "pinyin"},
            {"keep_original", true},
            {"keep_full_pinyin", true},
            {"keep_joined_full_pinyin", false},
            {"keep_separate_first_letter", false}
        }
    }}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
    "filter": [
        {
            "type": "pinyin",
            "keep_original": true,
            "keep_full_pinyin": true,
            "keep_joined_full_pinyin": false,
            "keep_separate_first_letter": false,
        },
    ],
};
```

```csharp
using System.Collections.Generic;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba",
    ["filter"] = new[]
    {
        new Dictionary<string, object>
        {
            ["type"] = "pinyin",
            ["keep_original"] = true,
            ["keep_full_pinyin"] = true,
            ["keep_joined_full_pinyin"] = false,
            ["keep_separate_first_letter"] = false
        }
    }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "jieba",
  "filter": [
    {
      "type": "pinyin",
      "keep_original": true,
      "keep_full_pinyin": true,
      "keep_joined_full_pinyin": false,
      "keep_separate_first_letter": false
    }
  ]
}'
```

The filter accepts the following parameters.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `keep_original` | Boolean | `true` | Keeps the original Chinese token in the analyzer output. |
| `keep_full_pinyin` | Boolean | `true` | Emits character-level Pinyin tokens. For example, `中文` produces `zhong` and `wen`. |
| `keep_joined_full_pinyin` | Boolean | `false` | Emits a joined Pinyin token for each source token. For example, `中文` produces `zhongwen`. |
| `keep_separate_first_letter` | Boolean | `false` | Emits a Pinyin-initials token for each source token. For example, `中文` produces `zw`. |

The filter operates on tokens produced by the tokenizer. For Chinese text, use it with a tokenizer such as `jieba`.

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior with `run_analyzer`.

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

sample_text = "中文测试"
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import java.util.*;

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

List<String> texts = new ArrayList<>();
texts.add("中文测试");
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

texts := []string{"中文测试"}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let sample_text = "中文测试";
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

std::string sample_text = "中文测试";
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: "http://localhost:19530",
    token: "root:Milvus",
});

const sample_text = "中文测试";
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var sampleText = "中文测试";
```

```bash
# restful
# The run_analyzer request is sent directly to the endpoint below.
```

### Match Chinese text with character-level Pinyin

The default `pinyin` filter keeps the original Chinese tokens and emits character-level Pinyin tokens.

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
    "tokenizer": "jieba",
    "filter": ["pinyin"],
}

result = client.run_analyzer(sample_text, analyzer_params)
print(result)
```

```java
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("pinyin"));

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
```

```go
import "github.com/milvus-io/milvus/client/v3/milvusclient"

analyzerParams := map[string]any{
    "tokenizer": "jieba",
    "filter":    []string{"pinyin"},
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(result)
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "jieba",
    "filter": ["pinyin"]
});

let result = client
    .run_analyzer(
        RunAnalyzerRequest::builder()
            .texts(vec![sample_text])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"pinyin"}}
};

auto request = milvus::RunAnalyzerRequest()
                       .AddText(sample_text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const analyzer_params = {
    tokenizer: "jieba",
    filter: ["pinyin"],
};

const char_result = await client.runAnalyzer({
    text: sample_text,
    analyzer_params,
});
console.log(char_result.results);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba",
    ["filter"] = new[] { "pinyin" }
};

RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});
Console.WriteLine(string.Join(", ", result.Results.SelectMany(r => r.Tokens).Select(t => t.Token)));
```

```bash
curl --request POST \
     --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
     --header "Authorization: Bearer root:Milvus" \
     --header "Content-Type: application/json" \
     -d '{
        "text": ["中文测试"],
        "analyzerParams": "{\"tokenizer\": \"jieba\", \"filter\": [\"pinyin\"]}"
     }'
```

Expected output:

```plaintext
['中文', 'zhong', 'wen', '测试', 'ce', 'shi']
```

### Match Chinese terms with joined Pinyin

Enable `keep_joined_full_pinyin` when you need a Chinese term to match its full joined Pinyin form.

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

```java
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
Map<String, Object> pinyinFilter = new HashMap<>();
pinyinFilter.put("type", "pinyin");
pinyinFilter.put("keep_original", true);
pinyinFilter.put("keep_full_pinyin", false);
pinyinFilter.put("keep_joined_full_pinyin", true);
pinyinFilter.put("keep_separate_first_letter", false);
analyzerParams.put("filter", Collections.singletonList(pinyinFilter));

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
```

```go
import "github.com/milvus-io/milvus/client/v3/milvusclient"

analyzerParams := map[string]any{
    "tokenizer": "jieba",
    "filter": []map[string]any{
        {
            "type":                       "pinyin",
            "keep_original":              true,
            "keep_full_pinyin":           false,
            "keep_joined_full_pinyin":    true,
            "keep_separate_first_letter": false,
        },
    },
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(result)
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "jieba",
    "filter": [
        {
            "type": "pinyin",
            "keep_original": true,
            "keep_full_pinyin": false,
            "keep_joined_full_pinyin": true,
            "keep_separate_first_letter": false
        }
    ]
});

let result = client
    .run_analyzer(
        RunAnalyzerRequest::builder()
            .texts(vec![sample_text])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {
        {
            {"type", "pinyin"},
            {"keep_original", true},
            {"keep_full_pinyin", false},
            {"keep_joined_full_pinyin", true},
            {"keep_separate_first_letter", false}
        }
    }}
};

auto request = milvus::RunAnalyzerRequest()
                       .AddText(sample_text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const analyzer_params = {
    tokenizer: "jieba",
    filter: [
        {
            type: "pinyin",
            keep_original: true,
            keep_full_pinyin: false,
            keep_joined_full_pinyin: true,
            keep_separate_first_letter: false,
        },
    ],
};

const joined_result = await client.runAnalyzer({
    text: sample_text,
    analyzer_params,
});
console.log(joined_result.results);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba",
    ["filter"] = new[]
    {
        new Dictionary<string, object>
        {
            ["type"] = "pinyin",
            ["keep_original"] = true,
            ["keep_full_pinyin"] = false,
            ["keep_joined_full_pinyin"] = true,
            ["keep_separate_first_letter"] = false
        }
    }
};

RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});
Console.WriteLine(string.Join(", ", result.Results.SelectMany(r => r.Tokens).Select(t => t.Token)));
```

```bash
curl --request POST \
     --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
     --header "Authorization: Bearer root:Milvus" \
     --header "Content-Type: application/json" \
     -d '{
        "text": ["中文测试"],
        "analyzerParams": "{\"tokenizer\": \"jieba\", \"filter\": [{\"type\": \"pinyin\", \"keep_original\": true, \"keep_full_pinyin\": false, \"keep_joined_full_pinyin\": true, \"keep_separate_first_letter\": false}]}"
     }'
```

Expected output:

```plaintext
['中文', 'zhongwen', '测试', 'ceshi']
```

### Match Chinese terms with Pinyin initials

Enable `keep_separate_first_letter` when you need a Chinese term to match the initials of its Pinyin form.

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

```java
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
Map<String, Object> pinyinFilter = new HashMap<>();
pinyinFilter.put("type", "pinyin");
pinyinFilter.put("keep_original", true);
pinyinFilter.put("keep_full_pinyin", false);
pinyinFilter.put("keep_joined_full_pinyin", false);
pinyinFilter.put("keep_separate_first_letter", true);
analyzerParams.put("filter", Collections.singletonList(pinyinFilter));

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
```

```go
import "github.com/milvus-io/milvus/client/v3/milvusclient"

analyzerParams := map[string]any{
    "tokenizer": "jieba",
    "filter": []map[string]any{
        {
            "type":                       "pinyin",
            "keep_original":              true,
            "keep_full_pinyin":           false,
            "keep_joined_full_pinyin":    false,
            "keep_separate_first_letter": true,
        },
    },
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println(result)
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "jieba",
    "filter": [
        {
            "type": "pinyin",
            "keep_original": true,
            "keep_full_pinyin": false,
            "keep_joined_full_pinyin": false,
            "keep_separate_first_letter": true
        }
    ]
});

let result = client
    .run_analyzer(
        RunAnalyzerRequest::builder()
            .texts(vec![sample_text])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {
        {
            {"type", "pinyin"},
            {"keep_original", true},
            {"keep_full_pinyin", false},
            {"keep_joined_full_pinyin", false},
            {"keep_separate_first_letter", true}
        }
    }}
};

auto request = milvus::RunAnalyzerRequest()
                       .AddText(sample_text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const analyzer_params = {
    tokenizer: "jieba",
    filter: [
        {
            type: "pinyin",
            keep_original: true,
            keep_full_pinyin: false,
            keep_joined_full_pinyin: false,
            keep_separate_first_letter: true,
        },
    ],
};

const initials_result = await client.runAnalyzer({
    text: sample_text,
    analyzer_params,
});
console.log(initials_result.results);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba",
    ["filter"] = new[]
    {
        new Dictionary<string, object>
        {
            ["type"] = "pinyin",
            ["keep_original"] = true,
            ["keep_full_pinyin"] = false,
            ["keep_joined_full_pinyin"] = false,
            ["keep_separate_first_letter"] = true
        }
    }
};

RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});
Console.WriteLine(string.Join(", ", result.Results.SelectMany(r => r.Tokens).Select(t => t.Token)));
```

```bash
curl --request POST \
     --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
     --header "Authorization: Bearer root:Milvus" \
     --header "Content-Type: application/json" \
     -d '{
        "text": ["中文测试"],
        "analyzerParams": "{\"tokenizer\": \"jieba\", \"filter\": [{\"type\": \"pinyin\", \"keep_original\": true, \"keep_full_pinyin\": false, \"keep_joined_full_pinyin\": false, \"keep_separate_first_letter\": true}]}"
     }'
```

Expected output:

```plaintext
['中文', 'zw', '测试', 'cs']
```
