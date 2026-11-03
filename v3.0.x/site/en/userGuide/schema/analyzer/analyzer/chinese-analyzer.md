---
id: chinese-analyzer.md
title: "Chinese"
summary: "The chinese analyzer is designed specifically to handle Chinese text, providing effective segmentation and tokenization."
---

# Chinese

The `chinese` analyzer is designed specifically to handle Chinese text, providing effective segmentation and tokenization.

## Definition

The `chinese` analyzer consists of:

- **Tokenizer**: Uses the `jieba` tokenizer to segment Chinese text into tokens based on vocabulary and context. For more information, refer to [Jieba](jieba-tokenizer.md).

- **Filter**: Uses the `cnalphanumonly` filter to remove tokens that contain any characters other than Chinese characters, English letters, or digits. For more information, refer to [Cnalphanumonly](cnalphanumonly-filter.md).

The functionality of the `chinese` analyzer is equivalent to the following custom analyzer configuration:

<div class="alert note">

The built-in `chinese` analyzer does not emit Pinyin tokens. To match Chinese text with Pinyin query terms, use a custom analyzer with the `jieba` tokenizer and the [`pinyin`](pinyin-filter.md) filter.

</div>

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
    "filter": ["cnalphanumonly"]
}
```

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Collections.singletonList("cnalphanumonly"));
```

```go
analyzerParams := map[string]any{"tokenizer": "jieba", "filter": []any{"cnalphanumonly"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"cnalphanumonly"}}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
};
```

```csharp
using System.Collections.Generic;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "jieba",
    ["filter"] = new[] { "cnalphanumonly" }
};
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

## Configuration

To apply the `chinese` analyzer to a field, simply set `type` to `chinese` in `analyzer_params`.

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
    "type": "chinese",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "chinese");
```

```go
analyzerParams := map[string]any{"type": "chinese"}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "chinese"
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "chinese"}
};
```

```javascript
const analyzer_params = {
    "type": "chinese",
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "chinese"
};
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

```go
analyzerParams := map[string]any{"type": "chinese"}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "chinese"
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "chinese"}
};
```

```javascript
const analyzer_params = {
    "type": "chinese",
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "chinese"
};
```

```bash
# restful
analyzerParams='{
  "type": "chinese"
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
sample_text = "Milvus 是一个高性能、可扩展的向量数据库！"

# Run the chinese analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Chinese analyzer output:", result)
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
texts.add("Milvus 是一个高性能、可扩展的向量数据库！");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();

for (RunAnalyzerResp.AnalyzerResult result : results) {
    for (RunAnalyzerResp.AnalyzerToken token : result.getTokens()) {
        System.out.println("Chinese analyzer output: " + token.getToken());
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

texts := []string{"Milvus 是一个高性能、可扩展的向量数据库！"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, r := range result {
    for _, token := range r.Tokens {
        fmt.Println("Chinese analyzer output:", token.Text)
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
            .texts(["Milvus 是一个高性能、可扩展的向量数据库！"])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;

for result in response.results() {
    for token in result.get_tokens() {
        println!("Chinese analyzer output: {}", token.get_text());
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

std::string text = "Milvus 是一个高性能、可扩展的向量数据库！";
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
        std::cout << "Chinese analyzer output: " << token.token_ << std::endl;
    }
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

const sample_text = 'Milvus 是一个高性能、可扩展的向量数据库！';
const result = await client.runAnalyzer({
  text: sample_text,
  analyzer_params,
});
const tokens = result.results.flatMap(r => r.tokens.map(t => t.token));
console.log('Chinese analyzer output:', tokens);
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
var sampleText = "Milvus 是一个高性能、可扩展的向量数据库！";

// Run the chinese analyzer with the defined configuration
RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});

foreach (AnalyzerResult r in result.Results)
{
    foreach (AnalyzerToken t in r.Tokens)
    {
        Console.WriteLine($"Chinese analyzer output: {t.Token}");
    }
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "analyzerParams": "{\"type\": \"chinese\"}",
    "text": ["Milvus 是一个高性能、可扩展的向量数据库！"]
  }'
```

### Expected output

For the sample text, the analyzer produces the following tokens in order. SDK response objects and printed formatting vary by language; the REST response contains these tokens at `data.results[].tokens[].token`.

```plaintext
['Milvus', '是', '一个', '高性', '性能', '高性能', '可', '扩展', '的', '向量', '数据', '据库', '数据库']
```
