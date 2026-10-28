---
id: icu-tokenizer.md
title: "ICU"
summary: "The icu tokenizer is built on the Internationalization Components of Unicode (ICU) open‑source project, which provides key tools for software internationalization. By using ICU's word‑break algorithm, the tokenizer can accurately split text into words across the majority of the world’s languages."
beta: Milvus 2.5.11+
---

# ICU

The `icu` tokenizer is built on the [Internationalization Components of Unicode](http://site.icu-project.org/) (ICU) open‑source project, which provides key tools for software internationalization. By using ICU's word‑break algorithm, the tokenizer can accurately split text into words across the majority of the world’s languages.

<div class="alert note">

The `icu` tokenizer preserves punctuation marks and spaces as separate tokens in the output. For example, `"Привет! Как дела?"` becomes `["Привет", "!", " ", "Как", " ", "дела", "?"]`. To remove these standalone punctuation tokens, use the [`removepunct`](removepunct-filter.md) filter.

</div>

## Configuration

To configure an analyzer using the `icu` tokenizer, set `tokenizer` to `icu` in `analyzer_params`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "icu",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "icu");
```

```go
analyzerParams := map[string]any{"tokenizer": "icu"}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let analyzer_params = json!({ "tokenizer": "icu" });
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "icu"}
};
```

```javascript
const analyzer_params = {
    tokenizer: "icu",
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "icu"
}'
```

The `icu` tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `icu` tokenizer and [remove punct filter](removepunct-filter.md):

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "icu",
    "filter": ["removepunct"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "icu");
analyzerParams.put("filter", Collections.singletonList("removepunct"));
```

```go
analyzerParams := map[string]any{"tokenizer": "icu", "filter": []string{"removepunct"}}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "icu",
    "filter": ["removepunct"]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "icu"},
    {"filter", {"removepunct"}}
};
```

```javascript
const analyzer_params = {
    tokenizer: "icu",
    filter: ["removepunct"],
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "icu",
  "filter": ["removepunct"]
}'
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

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
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "icu",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "icu");
```

```go
analyzerParams := map[string]any{"tokenizer": "icu"}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let analyzer_params = json!({ "tokenizer": "icu" });
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "icu"}
};
```

```javascript
const analyzer_params = {
    tokenizer: "icu",
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "icu"
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
sample_text = "Привет! Как дела?"

# Run the icu analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("ICU analyzer output:", result)
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
texts.add("Привет! Как дела?");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
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

texts := []string{"Привет! Как дела?"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let analyzer_params = json!({ "tokenizer": "icu" });
let result = client
    .run_analyzer(
        RunAnalyzerRequest::builder()
            .texts(vec!["Привет! Как дела?"])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;

println!("ICU analyzer output: {:?}", result.results());
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

std::string text = "Привет! Как дела?";
auto request = milvus::RunAnalyzerRequest()
                       .AddText(text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: "http://localhost:19530",
    token: "root:Milvus",
});

const sample_text = "Привет! Как дела?";

// Run the icu analyzer with the defined configuration
const result = await client.runAnalyzer({
    text: sample_text,
    analyzer_params,
});
console.log("ICU analyzer output:", result);
```

```bash
# restful
curl --request POST \
     --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
     --header "Authorization: Bearer root:Milvus" \
     --header "Content-Type: application/json" \
     -d '{
        "text": ["Привет! Как дела?"],
        "analyzerParams": "{\"tokenizer\": \"icu\"}"
     }'
```

### Expected output

```plaintext
['Привет', '!', ' ', 'Как', ' ', 'дела', '?']
```
