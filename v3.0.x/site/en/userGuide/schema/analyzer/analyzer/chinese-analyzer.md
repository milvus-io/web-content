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

<div class="alert note">

The built-in `chinese` analyzer does not emit Pinyin tokens. To match Chinese text with Pinyin query terms, use a custom analyzer with the `jieba` tokenizer and the [`pinyin`](pinyin-filter.md) filter.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
analyzerParams = map[string]any{"tokenizer": "jieba", "filter": []any{"cnalphanumonly"}}
```

```cpp
#include <iostream>

#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

nlohmann::json analyzer_params = {
    {"tokenizer", "jieba"},
    {"filter", {"cnalphanumonly"}}
};
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let analyzer_params = serde_json::json!({
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
});
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
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
analyzerParams = map[string]any{"type": "chinese"}
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "chinese"}
};
```

```rust
let analyzer_params = serde_json::json!({
    "type": "chinese"
});
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
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
// javascript
```

```go
analyzerParams = map[string]any{"type": "chinese"}
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "chinese"}
};
```

```rust
let analyzer_params = serde_json::json!({
    "type": "chinese"
});
```

```bash
# restful
```

### Verification using `run_analyzer` | Milvus 2.5.11+

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import (
    MilvusClient,
)

client = MilvusClient(uri="http://localhost:19530")

# Sample text to analyze
sample_text = "Milvus 是一个高性能、可扩展的向量数据库！"

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
texts.add("Milvus 是一个高性能、可扩展的向量数据库！");

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
texts := []string{"Milvus 是一个高性能、可扩展的向量数据库！"}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(string(bs))

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```cpp
milvus::RunAnalyzerRequest run_analyzer_request;
run_analyzer_request.WithTexts({"Milvus 是一个高性能、可扩展的向量数据库！"});
run_analyzer_request.WithAnalyzerParams({{"type", "chinese"}});
milvus::RunAnalyzerResponse run_analyzer_response;
status = client->RunAnalyzer(run_analyzer_request, run_analyzer_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

for (const auto& result : run_analyzer_response.Results()) {
    for (const auto& token : result.Tokens()) {
        std::cout << token.token_ << std::endl;
    }
}
```

```rust
let response = client
    .run_analyzer(
        RunAnalyzerRequest::builder()
            .texts(["Milvus 是一个高性能、可扩展的向量数据库！"])
            .analyzer_params(serde_json::json!({"type": "chinese"}))
            .build()?,
    )
    .await?;
for result in response.results() {
    for token in result.get_tokens() {
        println!("{}", token.get_text());
    }
}
```

```bash
# restful
```

### Expected output

```python
Chinese analyzer output: ['Milvus', '是', '一个', '高性', '性能', '高性能', '可', '扩展', '的', '向量', '数据', '据库', '数据库']
```
