---
id: whitespace-tokenizer.md
title: "Whitespace"
summary: "The whitespace tokenizer splits text at five ASCII whitespace characters: tab, line feed, form feed, carriage return, and space."
---

# Whitespace

The `whitespace` tokenizer splits text at five ASCII whitespace characters: tab, line feed, form feed, carriage return, and space.

## Tokenization rules

The `whitespace` tokenizer splits text only at the following five ASCII whitespace characters:

| Character | Name | Unicode code point |
| --- | --- | --- |
| `\t` | Horizontal tab | U+0009 |
| `\n` | Line feed | U+000A |
| `\x0C` or `\f` | Form feed | U+000C |
| `\r` | Carriage return | U+000D |
| `' '` | Space | U+0020 |

These separators are discarded, and consecutive separators do not produce empty tokens. Punctuation and other characters remain in the tokens. In particular, vertical tab (`\x0B`, U+000B), no-break space (`\u00A0`), and ideographic space (`\u3000`) do not trigger splitting.

This set follows Rust's [`char::is_ascii_whitespace()`](https://doc.rust-lang.org/std/primitive.char.html#method.is_ascii_whitespace), which excludes other Unicode whitespace characters.

The following examples use `{"tokenizer": "whitespace"}` with no filters. Inputs and outputs use Python string notation: escape sequences such as `\t` and `\u00A0` represent the actual characters.

| Input | Output tokens |
| --- | --- |
| `"a\tb\nc\x0Cd\re f"` | `["a", "b", "c", "d", "e", "f"]` |
| `"Hello,World! foo_bar"` | `["Hello,World!", "foo_bar"]` |
| `"a\x0Bb"` | `["a\x0Bb"]` |
| `"a\u00A0b"` | `["a\u00A0b"]` |
| `"a\u3000b"` | `["a\u3000b"]` |
| `" a  b "` | `["a", "b"]` |

## Configuration

To configure an analyzer using the `whitespace` tokenizer, set `tokenizer` to `whitespace` in `analyzer_params`.

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
    "tokenizer": "whitespace",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
```

```go
analyzerParams := map[string]any{"tokenizer": "whitespace"}
```

```rust
use serde_json::json;

let analyzer_params = json!({"tokenizer": "whitespace"});
```

```cpp
#include <milvus/thirdparty/nlohmann/json.hpp>

nlohmann::json analyzer_params = {
    {"tokenizer", "whitespace"}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "whitespace"
};
```

```csharp
using System.Collections.Generic;

Dictionary<string, object> analyzerParams = new()
{
    ["tokenizer"] = "whitespace"
};
```

```bash
analyzerParams='{"tokenizer": "whitespace"}'
```

The whitespace tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `whitespace` tokenizer and the [lowercase filter](lowercase-filter.md):

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
    "tokenizer": "whitespace",
    "filter": ["lowercase"],
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```go
analyzerParams := map[string]any{"tokenizer": "whitespace", "filter": []any{"lowercase"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "whitespace",
    "filter": ["lowercase"]
});
```

```cpp
#include <milvus/thirdparty/nlohmann/json.hpp>

nlohmann::json analyzer_params = {
    {"tokenizer", "whitespace"},
    {"filter", {"lowercase"}}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "whitespace",
    "filter": ["lowercase"],
};
```

```csharp
using System.Collections.Generic;

Dictionary<string, object> analyzerParams = new()
{
    ["tokenizer"] = "whitespace",
    ["filter"] = new List<object> { "lowercase" }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "whitespace",
  "filter": [
    "lowercase"
  ]
}'
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method. Use the configuration below with the verification example for your selected language.

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
    "tokenizer": "whitespace",
    "filter": ["lowercase"],
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```go
analyzerParams := map[string]any{"tokenizer": "whitespace", "filter": []any{"lowercase"}}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": "whitespace",
    "filter": ["lowercase"]
});
```

```cpp
#include <milvus/thirdparty/nlohmann/json.hpp>

nlohmann::json analyzer_params = {
    {"tokenizer", "whitespace"},
    {"filter", {"lowercase"}}
};
```

```javascript
const analyzer_params = {
    "tokenizer": "whitespace",
    "filter": ["lowercase"],
};
```

```csharp
using System.Collections.Generic;

Dictionary<string, object> analyzerParams = new()
{
    ["tokenizer"] = "whitespace",
    ["filter"] = new List<object> { "lowercase" }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": "whitespace",
  "filter": [
    "lowercase"
  ]
}'
```

### Verification using `run_analyzer` | Milvus 2.5.11+

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

# Run the whitespace analyzer with the defined configuration
result = client.run_analyzer(sample_text, analyzer_params)
print("Whitespace analyzer output:", result)
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
        System.out.println(token.getToken());
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
    panic(err)
}

defer client.Close(ctx)

texts := []string{"The Milvus vector database is built for scale!"}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    panic(err)
}

for _, r := range result {
    for _, token := range r.Tokens {
        fmt.Println(token.Text)
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
        println!("Whitespace analyzer output: {}", token.get_text());
    }
}
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <string>
#include <iostream>
#include <stdexcept>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

std::string text = "The Milvus vector database is built for scale!";
auto request = milvus::RunAnalyzerRequest()
                       .AddText(text)
                       .WithAnalyzerParams(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

for (const auto& result : response.Results()) {
    for (const auto& token : result.Tokens()) {
        std::cout << token.token_ << std::endl;
    }
}
```

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: "root:Milvus",
});

const sample_text = 'The Milvus vector database is built for scale!';
const result = await client.runAnalyzer({
  text: sample_text,
  analyzer_params,
});
const tokens = result.results.flatMap(r => r.tokens.map(t => t.token));
console.log('Whitespace analyzer output:', tokens);
```

```csharp
using System;
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});

// Sample text to analyze
string sampleText = "The Milvus vector database is built for scale!";

// Run the whitespace analyzer with the defined configuration
RunAnalyzerResp result = await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { sampleText }
});

foreach (AnalyzerResult r in result.Results)
{
    foreach (AnalyzerToken t in r.Tokens)
    {
        Console.WriteLine($"Whitespace analyzer output: {t.Token}");
    }
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "analyzerParams": "{\"tokenizer\": \"whitespace\", \"filter\": [\"lowercase\"]}",
    "text": ["The Milvus vector database is built for scale!"]
  }'
```

### Expected output

For the sample text, the analyzer produces the following tokens in order. SDK response objects and printed formatting vary by language; the REST response contains these tokens at `data.results[].tokens[].token`.

```plaintext
['the', 'milvus', 'vector', 'database', 'is', 'built', 'for', 'scale!']
```
