---
id: english-analyzer.md
title: "English"
summary: "The english analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering."
---

# English

The `english` analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering.

## Definition

The `english` analyzer uses the following components:

- **Tokenizer**: Uses the [`standard` tokenizer](standard-tokenizer.md) to split text into discrete word units.

- **Filters**: Includes multiple filters for comprehensive text processing:

    - [`lowercase`](lowercase-filter.md): Converts all tokens to lowercase, enabling case-insensitive searches.

    - [`stemmer`](stemmer-filter.md): Reduces words to their root form to support broader matching (e.g., "running" becomes "run").

    - [`stop_words`](stop-filter.md): Removes common English stop words to focus on key terms in text.

The functionality of the `english` analyzer is equivalent to the following custom analyzer configuration:

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
    "filter": [
        "lowercase",
        {
            "type": "stemmer",
            "language": "english"
        },
        {
            "type": "stop",
            "stop_words": ["_english_"]
        }
    ]
}
```

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

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

```go
analyzerParams := map[string]any{"tokenizer": "standard",
        "filter": []any{"lowercase", map[string]any{
            "type":     "stemmer",
            "language": "english",
        }, map[string]any{
            "type":       "stop",
            "stop_words": []string{"_english_"},
        }}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "standard",
    "filter": [
        "lowercase",
        { "type": "stemmer", "language": "english" },
        { "type": "stop", "stop_words": ["_english_"] }
    ]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", "standard"},
    {"filter", {
        "lowercase",
        {{"type", "stemmer"}, {"language", "english"}},
        {{"type", "stop"}, {"stop_words", {"_english_"}}}
    }}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "standard",
    "filter": [
        "lowercase",
        { "type": "stemmer", "language": "english" },
        { "type": "stop", "stop_words": ["_english_"] }
    ]
};
```

```csharp
using System.Collections.Generic;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = "standard",
    ["filter"] = new object[]
    {
        "lowercase",
        new Dictionary<string, object>
        {
            ["type"] = "stemmer",
            ["language"] = "english"
        },
        new Dictionary<string, object>
        {
            ["type"] = "stop",
            ["stop_words"] = new[] { "_english_" }
        }
    }
};
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
      "stop_words": [
        "_english_"
      ]
    }
  ]
}'
```

## Configuration

To apply the `english` analyzer to a field, simply set `type` to `english` in `analyzer_params`, and include optional parameters as needed.

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
    "type": "english",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
```

```go
analyzerParams := map[string]any{"type": "english"}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "english"
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "english"}
};
```

```javascript
const analyzer_params = {
    "type": "english",
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "english"
};
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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

```go
analyzerParams := map[string]any{"type": "english", "stop_words": []string{"a", "an", "the"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "english",
    "stop_words": ["a", "an", "the"]
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "english"},
    {"stop_words", {"a", "an", "the"}}
};
```

```javascript
const analyzer_params = {
    "type": "english",
    "stop_words": ["a", "an", "the"]
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "english",
    ["stop_words"] = new[] { "a", "an", "the" }
};
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "type": "english", # Uses the default `_english_` stop-word list
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
```

```go
analyzerParams := map[string]any{"type": "english"}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "type": "english"
});
```

```cpp
nlohmann::json analyzer_params = {
    {"type", "english"}
};
```

```javascript
const analyzer_params = {
    "type": "english", // Uses the default `_english_` stop-word list
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["type"] = "english" // Uses the default `_english_` stop-word list
};
```

```bash
# restful
analyzerParams='{
  "type": "english"
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
sample_text = "Milvus is a vector database built for scale!"

# Run the english analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("English analyzer output:", result)
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
texts.add("Milvus is a vector database built for scale!");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();

for (RunAnalyzerResp.AnalyzerResult result : results) {
    for (RunAnalyzerResp.AnalyzerToken token : result.getTokens()) {
        System.out.println("English analyzer output: " + token.getToken());
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

texts := []string{"Milvus is a vector database built for scale!"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, r := range result {
    for _, token := range r.Tokens {
        fmt.Println("English analyzer output:", token.Text)
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
            .texts(["Milvus is a vector database built for scale!"])
            .analyzer_params(analyzer_params)
            .build()?,
    )
    .await?;

for result in response.results() {
    for token in result.get_tokens() {
        println!("English analyzer output: {}", token.get_text());
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

std::string text = "Milvus is a vector database built for scale!";
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
        std::cout << "English analyzer output: " << token.token_ << std::endl;
    }
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

const sample_text = 'Milvus is a vector database built for scale!';
const result = await client.runAnalyzer({
  text: sample_text,
  analyzer_params,
});
const tokens = result.results.flatMap(r => r.tokens.map(t => t.token));
console.log('English analyzer output:', tokens);
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
var sampleText = "Milvus is a vector database built for scale!";

// Run the english analyzer with the defined configuration
RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});

foreach (AnalyzerResult r in result.Results)
{
    foreach (AnalyzerToken t in r.Tokens)
    {
        Console.WriteLine($"English analyzer output: {t.Token}");
    }
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "analyzerParams": "{\"type\": \"english\"}",
    "text": ["Milvus is a vector database built for scale!"]
  }'
```

### Expected output

For the sample text, the analyzer produces the following tokens in order. SDK response objects and printed formatting vary by language; the REST response contains these tokens at `data.results[].tokens[].token`.

```plaintext
['milvus', 'vector', 'databas', 'built', 'scale']
```
