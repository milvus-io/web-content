---
id: standard-analyzer.md
title: "Standard Analyzer"
summary: "The standard analyzer is the default analyzer in Milvus, which is automatically applied to text fields if no analyzer is specified. It combines the standard tokenizer with the lowercase filter."
---

# Standard Analyzer

The `standard` analyzer is the default analyzer in Milvus, which is automatically applied to text fields if no analyzer is specified. It combines the standard tokenizer with the lowercase filter.

<div class="alert note">

The `standard` analyzer is suitable for languages that rely on separators (such as spaces, punctuation) for word boundaries. However, languages like Chinese, Arabic, Thai, Japanese, and Korean need language-specific tokenization or normalization. In such cases, use a language-specific analyzer such as [`chinese`](chinese-analyzer.md), [`arabic`](arabic-analyzer.md), or [`thai`](thai-analyzer.md), or custom analyzers with specialized tokenizers such as [`lindera`](lindera-tokenizer.md) and [`icu`](icu-tokenizer.md).

</div>

## Definition

The `standard` analyzer consists of:

- **Tokenizer**: Uses the `standard` tokenizer to keep consecutive Unicode letters and numeric characters in tokens and split at other characters. For the exact character rules, refer to [Standard Tokenizer](standard-tokenizer.md#Tokenization-rules).

- **Filter**: Uses the `lowercase` filter to convert all tokens to lowercase, enabling case-insensitive searches. For more information, refer to [Lowercase](lowercase-filter.md).

The functionality of the `standard` analyzer is equivalent to the following custom analyzer configuration:

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
    "tokenizer": "standard",
    "filter": ["lowercase"]
}
```

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```go
analyzerParams := map[string]any{"tokenizer": "standard", "filter": []any{"lowercase"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "standard",
    "filter": ["lowercase"]
});
```

```cpp
#include <milvus/thirdparty/nlohmann/json.hpp>

nlohmann::json analyzer_params = {
    {"tokenizer", "standard"},
    {"filter", {"lowercase"}}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "standard",
    "filter": ["lowercase"]
};
```

```csharp
using System.Collections.Generic;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "standard",
    ["filter"] = new[] { "lowercase" }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "standard",
  "filter": [
    "lowercase"
  ]
}'
```

## Configuration

To apply the `standard` analyzer to a field, simply set `type` to `standard` in `analyzer_params`, and include optional parameters as needed.

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
    "type": "standard", # Specifies the standard analyzer type
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "standard");
```

```go
analyzerParams := map[string]any{"type": "standard"}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "standard"
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "standard"}
};
```

```javascript
const analyzer_params = {
    "type": "standard", // Specifies the standard analyzer type
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "standard" // Specifies the standard analyzer type
};
```

```bash
# restful
analyzerParams='{
  "type": "standard"
}'
```

The `standard` analyzer accepts the following optional parameters: 

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>stop_words</code></p></td>
     <td><p>An array containing a list of stop words, which will be removed from tokenization. For the accepted values, refer to <a href="stop-filter.md">Stop</a>.</p></td>
   </tr>
</table>

Example configuration of custom stop words:

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
    "type": "standard", # Specifies the standard analyzer type
    "stop_words": ["of"] # Optional: List of words to exclude from tokenization
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "standard");
analyzerParams.put("stop_words", Collections.singletonList("of"));
```

```go
analyzerParams := map[string]any{"type": "standard", "stop_words": []string{"of"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "standard",
    "stop_words": ["of"]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "standard"},
    {"stop_words", {"of"}}
};
```

```javascript
const analyzer_params = {
    "type": "standard", // Specifies the standard analyzer type
    "stop_words": ["of"] // Optional: List of words to exclude from tokenization
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "standard", // Specifies the standard analyzer type
    ["stop_words"] = new[] { "of" } // Optional: List of words to exclude from tokenization
};
```

```bash
# restful
analyzerParams='{
  "type": "standard",
  "stop_words": [
    "of"
  ]
}'
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For more information, refer to [Example use](analyzer-overview.md#Example-use).

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
    "type": "standard",  # Standard analyzer configuration
    "stop_words": ["for"] # Optional: Custom stop words parameter
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "standard");
analyzerParams.put("stop_words", Collections.singletonList("for"));
```

```go
analyzerParams := map[string]any{"type": "standard", "stop_words": []string{"for"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "standard",
    "stop_words": ["for"]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "standard"},
    {"stop_words", {"for"}}
};
```

```javascript
const analyzer_params = {
    "type": "standard", // Standard analyzer configuration
    "stop_words": ["for"] // Optional: Custom stop words parameter
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "standard", // Standard analyzer configuration
    ["stop_words"] = new[] { "for" } // Optional: Custom stop words parameter
};
```

```bash
# restful
analyzerParams='{
  "type": "standard",
  "stop_words": [
    "for"
  ]
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
sample_text = "The Milvus vector database is built for scale!"

# Run the standard analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Standard analyzer output:", result)
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
texts.add("The Milvus vector database is built for scale!");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();

for (RunAnalyzerResp.AnalyzerResult result : results) {
    for (RunAnalyzerResp.AnalyzerToken token : result.getTokens()) {
        System.out.println("Standard analyzer output: " + token.getToken());
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

texts := []string{"The Milvus vector database is built for scale!"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, r := range result {
    for _, token := range r.Tokens {
        fmt.Println("Standard analyzer output:", token.Text)
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
            .texts(["The Milvus vector database is built for scale!"])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;

for result in response.results() {
    for token in result.get_tokens() {
        println!("Standard analyzer output: {}", token.get_text());
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

std::string text = "The Milvus vector database is built for scale!";
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
        std::cout << "Standard analyzer output: " << token.token_ << std::endl;
    }
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

const sample_text = 'The Milvus vector database is built for scale!';
const result = await client.runAnalyzer({
  text: sample_text,
  analyzer_params,
});
const tokens = result.results.flatMap(r => r.tokens.map(t => t.token));
console.log('Standard analyzer output:', tokens);
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
var sampleText = "The Milvus vector database is built for scale!";

// Run the standard analyzer with the defined configuration
RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});

foreach (AnalyzerResult r in result.Results)
{
    foreach (AnalyzerToken t in r.Tokens)
    {
        Console.WriteLine($"Standard analyzer output: {t.Token}");
    }
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "analyzerParams": "{\"type\": \"standard\", \"stop_words\": [\"for\"]}",
    "text": ["The Milvus vector database is built for scale!"]
  }'
```

### Expected output

For the sample text, the analyzer produces the following tokens in order. SDK response objects and printed formatting vary by language; the REST response contains these tokens at `data.results[].tokens[].token`.

```plaintext
['the', 'milvus', 'vector', 'database', 'is', 'built', 'scale']
```
