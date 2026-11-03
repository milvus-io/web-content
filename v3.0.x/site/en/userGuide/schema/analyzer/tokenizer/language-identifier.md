---
id: language-identifier.md
title: "Language Identifier"
summary: "The language_identifier is a specialized tokenizer designed to enhance the text search capabilities of Milvus by automating the language analysis process. Its primary function is to detect the language of a text field and then dynamically apply a pre-configured analyzer that is most suitable for that language. This is particularly valuable for applications that handle a variety of languages, as it eliminates the need for manual language assignment on a per-input basis."
beta: Milvus v2.5.15+
---

# Language Identifier

The `language_identifier` is a specialized tokenizer designed to enhance the text search capabilities of Milvus by automating the language analysis process. Its primary function is to detect the language of a text field and then dynamically apply a pre-configured analyzer that is most suitable for that language. This is particularly valuable for applications that handle a variety of languages, as it eliminates the need for manual language assignment on a per-input basis.

By intelligently routing text data to the appropriate processing pipeline, the `language_identifier` streamlines multilingual data ingestion and ensures accurate tokenization for subsequent search and retrieval operations.

## Language detection workflow

The `language_identifier` performs a series of steps to process a text string, a workflow that is critical for users to understand how to configure it correctly.

![Language Detection Workflow](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/language-detection-workflow.png)

1. **Input:** The workflow begins with a text string as input.

1. **Language detection:** This string is first passed to a language detection engine, which attempts to identify the language. Milvus supports two engines: **whatlang** and **lingua**.

1. **Analyzer selection:**

    - **Success:** If the language is successfully detected, the system checks if the detected language name has a corresponding analyzer configured in your `analyzers` dictionary. If a match is found, the system applies the specified analyzer to the input text. For example, a detected "Mandarin" text would be routed to a `jieba` tokenizer.

    - **Fallback:** If detection fails, or if a language is successfully detected but you have not provided a specific analyzer for it, the system defaults to a pre-configured **default analyzer**. This is a crucial point of clarification; the `default` analyzer is a fallback for both detection failure and an absence of a matching analyzer.

After the appropriate analyzer is chosen, the text is tokenized and processed, completing the workflow.

## Available language detection engines

Milvus offers a choice between two language detection engines:

- [whatlang](https://github.com/greyblake/whatlang-rs)

- [lingua](https://github.com/pemistahl/lingua)

The selection depends on the specific performance and accuracy requirements of your application.

<table>
   <tr>
     <th><p>Engine</p></th>
     <th><p>Speed</p></th>
     <th><p>Accuracy</p></th>
     <th><p>Output Format</p></th>
     <th><p>Best For</p></th>
   </tr>
   <tr>
     <td><p><code>whatlang</code></p></td>
     <td><p>Fast</p></td>
     <td><p>Good for most languages</p></td>
     <td><p>Language names (e.g., <code>"English"</code>,  <code>"Mandarin"</code>, <code>"Japanese"</code>)</p><p><strong>Reference:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Language column in supported languages table</a></p></td>
     <td><p>Real-time applications where speed is critical</p></td>
   </tr>
   <tr>
     <td><p><code>lingua</code></p></td>
     <td><p>Slower</p></td>
     <td><p>Higher precision, especially for short texts</p></td>
     <td><p>English language names (e.g., <code>"English"</code>, <code>"Chinese"</code>, <code>"Japanese"</code>)</p><p><strong>Reference:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Supported languages list</a></p></td>
     <td><p>Applications where accuracy is more important than speed</p></td>
   </tr>
</table>

A critical consideration is the engine's naming convention. While both engines return language names in English, they use different terms for some languages (e.g., `whatlang` returns `Mandarin`, while `lingua` returns `Chinese`). The analyzer's key must be an exact match to the name returned by the chosen detection engine.

## Configuration

To correctly use the `language_identifier` tokenizer, the following steps must be taken to define and apply its configuration.

### Step 1: Choose your languages and analyzers

The core of setting up the `language_identifier` is tailoring your analyzers to the specific languages you plan to support. The system works by matching the detected language with the correct analyzer, so this step is crucial for accurate text processing.

Below is a recommended mapping of languages to suitable Milvus analyzers. This table serves as a bridge between the output of the language detection engine and the best tool for the job.

<table>
   <tr>
     <th><p>Language (Detector Output)</p></th>
     <th><p>Recommended Analyzer</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>English</code></p></td>
     <td><p><code>type: english</code></p></td>
     <td><p>Standard English tokenization with stemming and stop-word filtering.</p></td>
   </tr>
   <tr>
     <td><p><code>Mandarin</code> (via whatlang) or <code>Chinese</code> (via lingua)</p></td>
     <td><p><code>tokenizer: jieba</code></p></td>
     <td><p>Chinese word segmentation for non-space-delimited text.</p></td>
   </tr>
   <tr>
     <td><p><code>Japanese</code></p></td>
     <td><p><code>tokenizer: icu</code></p></td>
     <td><p>A robust tokenizer for complex scripts, including Japanese.</p></td>
   </tr>
   <tr>
     <td><p><code>French</code></p></td>
     <td><p><code>type: standard</code>, <code>filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>A custom configuration that handles French accents and characters.</p></td>
   </tr>
</table>

<div class="alert note">

- **Matching is Key:** The name of your analyzer **must exactly match** the language output of the detection engine. For instance, if you're using `whatlang`, the key for Chinese text must be `Mandarin`.

- **Best practices:** The table above provides recommended configurations for a few common languages, but it is not an exhaustive list. For a more comprehensive guide on choosing analyzers, refer to [Choose the Right Analyzer for Your Use Case](choose-the-right-analyzer-for-your-use-case.md).

- **Detector output**: For a complete list of language names returned by the detection engines, refer to [Whatlang supported languages table](https://github.com/greyblake/whatlang-rs) and the [Lingua supported languages list](https://github.com/pemistahl/lingua-rs).

</div>

### Step 2: Define analyzer_params

To use the `language_identifier` tokenizer in Milvus, create a dictionary containing these key components:

**Required components:**

- `analyzers` config set – A dictionary containing all analyzer configurations, which must include:

    - `default` – The fallback analyzer used when language detection fails or no matching analyzer is found

    - **Language-specific analyzers** – Each defined as `<analyzer_name>: <analyzer_config>`, where:

        - `analyzer_name` matches your chosen detection engine's output (e.g., `"English"`, `"Japanese"`)

        - `analyzer_config` follows standard analyzer parameter format (see [Analyzer Overview](analyzer-overview.md#Analyzer-types))

**Optional components:**

- `identifier` – Specifies which language detection engine to use (`whatlang` or `lingua`). Defaults to `whatlang` if not specified

- `mapping` – Creates custom aliases for your analyzers, allowing you to use descriptive names instead of the detection engine's exact output format

The tokenizer works by first detecting the language of input text, then selecting the appropriate analyzer from your configuration. If detection fails or no matching analyzer exists, it automatically falls back to your `default` analyzer.

#### Recommended: Direct name matching

Your analyzer names should exactly match the output of your chosen language detection engine. This approach is simpler and avoids potential confusion.

For both `whatlang` and `lingua`, use the language names as shown in their respective documentation:

- [whatlang supported languages](https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md) (use the "**Language**" column)

- [lingua supported languages](https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported)

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
        "type": "language_identifier",  # Must be `language_identifier`
        "identifier": "whatlang",  # or `lingua`
        "analyzers": {  # A set of analyzer configs
            "default": {
                "tokenizer": "standard"  # fallback if language detection fails
            },
            "English": {  # Analyzer name that matches whatlang output
                "type": "english"
            },
            "Mandarin": {  # Analyzer name that matches whatlang output
                "tokenizer": "jieba"
            }
        }
    }
}
```

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
    put("type", "language_identifier");   // Must be `language_identifier`
    put("identifier", "whatlang");        // or `lingua`
    put("analyzers", new HashMap<String, Object>() {{  // A set of analyzer configs
        put("default", new HashMap<String, Object>() {{
            put("tokenizer", "standard"); // fallback if language detection fails
        }});
        put("English", new HashMap<String, Object>() {{  // Analyzer name that matches whatlang output
            put("type", "english");
        }});
        put("Mandarin", new HashMap<String, Object>() {{ // Analyzer name that matches whatlang output
            put("tokenizer", "jieba");
        }});
    }});
}});
```

```go
analyzerParams := map[string]any{
    "tokenizer": map[string]any{
        "type":       "language_identifier", // Must be `language_identifier`
        "identifier": "whatlang",            // or `lingua`
        "analyzers": map[string]any{         // A set of analyzer configs
            "default": map[string]any{
                "tokenizer": "standard", // fallback if language detection fails
            },
            "English": map[string]any{ // Analyzer name that matches whatlang output
                "type": "english",
            },
            "Mandarin": map[string]any{ // Analyzer name that matches whatlang output
                "tokenizer": "jieba",
            },
        },
    },
}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": {
        "type": "language_identifier",  // Must be `language_identifier`
        "identifier": "whatlang",       // or `lingua`
        "analyzers": {                  // A set of analyzer configs
            "default": {
                "tokenizer": "standard" // fallback if language detection fails
            },
            "English": {                // Analyzer name that matches whatlang output
                "type": "english"
            },
            "Mandarin": {               // Analyzer name that matches whatlang output
                "tokenizer": "jieba"
            }
        }
    }
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", {
        {"type", "language_identifier"}, // Must be `language_identifier`
        {"identifier", "whatlang"},      // or `lingua`
        {"analyzers", {                  // A set of analyzer configs
            {"default", {{"tokenizer", "standard"}}}, // fallback if language detection fails
            {"English", {{"type", "english"}}},       // Analyzer name that matches whatlang output
            {"Mandarin", {{"tokenizer", "jieba"}}}    // Analyzer name that matches whatlang output
        }}
    }}
};
```

```javascript
const analyzer_params = {
  tokenizer: {
    type: "language_identifier", // Must be `language_identifier`
    identifier: "whatlang",      // or `lingua`
    analyzers: {                 // A set of analyzer configs
      default: {
        tokenizer: "standard",   // fallback if language detection fails
      },
      English: {                 // Analyzer name that matches whatlang output
        type: "english",
      },
      Mandarin: {                // Analyzer name that matches whatlang output
        tokenizer: "jieba",
      },
    },
  },
};
```

```csharp
using System.Collections.Generic;

var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "language_identifier", // Must be `language_identifier`
        ["identifier"] = "whatlang",      // or `lingua`
        ["analyzers"] = new Dictionary<string, object> // A set of analyzer configs
        {
            ["default"] = new Dictionary<string, object>
            {
                ["tokenizer"] = "standard" // fallback if language detection fails
            },
            ["English"] = new Dictionary<string, object> // Analyzer name that matches whatlang output
            {
                ["type"] = "english"
            },
            ["Mandarin"] = new Dictionary<string, object> // Analyzer name that matches whatlang output
            {
                ["tokenizer"] = "jieba"
            }
        }
    }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": {
    "type": "language_identifier",
    "identifier": "whatlang",
    "analyzers": {
      "default": {
        "tokenizer": "standard"
      },
      "English": {
        "type": "english"
      },
      "Mandarin": {
        "tokenizer": "jieba"
      }
    }
  }
}'
```

#### Alternative approach: Custom names with mapping

If you prefer to use custom analyzer names or need to maintain compatibility with existing configurations, you can use the `mapping` parameter. This creates aliases for your analyzers—both the original detection engine names and your custom names will work.

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
        "type": "language_identifier",
        "identifier": "lingua",
        "analyzers": {
            "default": {
                "tokenizer": "standard"
            },
            "english_analyzer": {  # Custom analyzer name
                "type": "english"
            },
            "chinese_analyzer": {  # Custom analyzer name
                "tokenizer": "jieba"
            }
        },
        "mapping": {
            "English": "english_analyzer",   # Maps detection output to custom name
            "Chinese": "chinese_analyzer"
        }
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
    put("type", "language_identifier");
    put("identifier", "lingua");
    put("analyzers", new HashMap<String, Object>() {{
        put("default", new HashMap<String, Object>() {{
            put("tokenizer", "standard");
        }});
        put("english_analyzer", new HashMap<String, Object>() {{  // Custom analyzer name
            put("type", "english");
        }});
        put("chinese_analyzer", new HashMap<String, Object>() {{  // Custom analyzer name
            put("tokenizer", "jieba");
        }});
    }});
    put("mapping", new HashMap<String, Object>() {{  // Maps detection output to custom name
        put("English", "english_analyzer");
        put("Chinese", "chinese_analyzer");
    }});
}});
```

```go
analyzerParams := map[string]any{
    "tokenizer": map[string]any{
        "type":       "language_identifier",
        "identifier": "lingua",
        "analyzers": map[string]any{
            "default": map[string]any{
                "tokenizer": "standard",
            },
            "english_analyzer": map[string]any{ // Custom analyzer name
                "type": "english",
            },
            "chinese_analyzer": map[string]any{ // Custom analyzer name
                "tokenizer": "jieba",
            },
        },
        "mapping": map[string]any{ // Maps detection output to custom names
            "English": "english_analyzer",
            "Chinese": "chinese_analyzer",
        },
    },
}
```

```rust
use serde_json::json;

let analyzer_params = json!({
    "tokenizer": {
        "type": "language_identifier",
        "identifier": "lingua",
        "analyzers": {
            "default": {
                "tokenizer": "standard"
            },
            "english_analyzer": {  // Custom analyzer name
                "type": "english"
            },
            "chinese_analyzer": {  // Custom analyzer name
                "tokenizer": "jieba"
            }
        },
        "mapping": {
            "English": "english_analyzer",   // Maps detection output to custom name
            "Chinese": "chinese_analyzer"
        }
    }
});
```

```cpp
nlohmann::json analyzer_params = {
    {"tokenizer", {
        {"type", "language_identifier"},
        {"identifier", "lingua"},
        {"analyzers", {
            {"default", {{"tokenizer", "standard"}}},
            {"english_analyzer", {{"type", "english"}}},      // Custom analyzer name
            {"chinese_analyzer", {{"tokenizer", "jieba"}}}    // Custom analyzer name
        }},
        {"mapping", {                                          // Maps detection output to custom names
            {"English", "english_analyzer"},
            {"Chinese", "chinese_analyzer"}
        }}
    }}
};
```

```javascript
const analyzer_params = {
  tokenizer: {
    type: "language_identifier",
    identifier: "lingua",
    analyzers: {
      default: {
        tokenizer: "standard",
      },
      english_analyzer: { // Custom analyzer name
        type: "english",
      },
      chinese_analyzer: { // Custom analyzer name
        tokenizer: "jieba",
      },
    },
    mapping: {            // Maps detection output to custom names
      English: "english_analyzer",
      Chinese: "chinese_analyzer",
    },
  },
};
```

```csharp
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "language_identifier",
        ["identifier"] = "lingua",
        ["analyzers"] = new Dictionary<string, object>
        {
            ["default"] = new Dictionary<string, object>
            {
                ["tokenizer"] = "standard"
            },
            ["english_analyzer"] = new Dictionary<string, object> // Custom analyzer name
            {
                ["type"] = "english"
            },
            ["chinese_analyzer"] = new Dictionary<string, object> // Custom analyzer name
            {
                ["tokenizer"] = "jieba"
            }
        },
        ["mapping"] = new Dictionary<string, object> // Maps detection output to custom names
        {
            ["English"] = "english_analyzer",
            ["Chinese"] = "chinese_analyzer"
        }
    }
};
```

```bash
# restful
analyzerParams='{
  "tokenizer": {
    "type": "language_identifier",
    "identifier": "lingua",
    "analyzers": {
      "default": {
        "tokenizer": "standard"
      },
      "english_analyzer": {
        "type": "english"
      },
      "chinese_analyzer": {
        "tokenizer": "jieba"
      }
    },
    "mapping": {
      "English": "english_analyzer",
      "Chinese": "chinese_analyzer"
    }
  }
}'
```

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Here are some ready-to-use configurations for common scenarios. Each example includes both the configuration and verification code so you can test the setup immediately.

### English and Chinese detection

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

# Configuration
analyzer_params = {
    "tokenizer": {
        "type": "language_identifier",
        "identifier": "whatlang",
        "analyzers": {
            "default": {"tokenizer": "standard"},
            "English": {"type": "english"},
            "Mandarin": {"tokenizer": "jieba"}
        }
    }
}

# Test the configuration
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# English text
result_en = client.run_analyzer("The Milvus vector database is built for scale!", analyzer_params)
print("English:", result_en)

# Chinese text
result_cn = client.run_analyzer("Milvus 向量数据库专为大规模应用而设计", analyzer_params)
print("Chinese:", result_cn)
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

// Configuration
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
    put("type", "language_identifier");
    put("identifier", "whatlang");
    put("analyzers", new HashMap<String, Object>() {{
        put("default", new HashMap<String, Object>() {{
            put("tokenizer", "standard");
        }});
        put("English", new HashMap<String, Object>() {{
            put("type", "english");
        }});
        put("Mandarin", new HashMap<String, Object>() {{
            put("tokenizer", "jieba");
        }});
    }});
}});

// English text
List<String> english = new ArrayList<>();
english.add("The Milvus vector database is built for scale!");
RunAnalyzerResp enResp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(english)
        .analyzerParams(analyzerParams)
        .build());

// Chinese text
List<String> chinese = new ArrayList<>();
chinese.add("Milvus 向量数据库专为大规模应用而设计");
RunAnalyzerResp cnResp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(chinese)
        .analyzerParams(analyzerParams)
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

// Configuration
analyzerParams := map[string]any{
    "tokenizer": map[string]any{
        "type":       "language_identifier",
        "identifier": "whatlang",
        "analyzers": map[string]any{
            "default":  map[string]any{"tokenizer": "standard"},
            "English":  map[string]any{"type": "english"},
            "Mandarin": map[string]any{"tokenizer": "jieba"},
        },
    },
}

// English text
enResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption("The Milvus vector database is built for scale!").
        WithAnalyzerParams(analyzerParams))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
for _, tokens := range enResult {
    fmt.Println("English:", tokens.Tokens)
}

// Chinese text
cnResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption("Milvus 向量数据库专为大规模应用而设计").
        WithAnalyzerParams(analyzerParams))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
for _, tokens := range cnResult {
    fmt.Println("Chinese:", tokens.Tokens)
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

// Configuration
let analyzer_params = serde_json::json!({
    "tokenizer": {
        "type": "language_identifier",
        "identifier": "whatlang",
        "analyzers": {
            "default": {"tokenizer": "standard"},
            "English": {"type": "english"},
            "Mandarin": {"tokenizer": "jieba"}
        }
    }
});

// English text
let en_response = client.run_analyzer(RunAnalyzerRequest::builder()
    .texts(["The Milvus vector database is built for scale!"])
    .analyzer_params(analyzer_params.clone())
    .build()?).await?;

// Chinese text
let cn_response = client.run_analyzer(RunAnalyzerRequest::builder()
    .texts(["Milvus 向量数据库专为大规模应用而设计"])
    .analyzer_params(analyzer_params)
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

// Configuration
nlohmann::json analyzer_params = {
    {"tokenizer", {
        {"type", "language_identifier"},
        {"identifier", "whatlang"},
        {"analyzers", {
            {"default", {{"tokenizer", "standard"}}},
            {"English", {{"type", "english"}}},
            {"Mandarin", {{"tokenizer", "jieba"}}}
        }}
    }}
};

// English text
milvus::RunAnalyzerRequest en_request;
en_request.WithAnalyzerParams(analyzer_params);
en_request.AddText("The Milvus vector database is built for scale!");
milvus::RunAnalyzerResponse en_response;
status = client->RunAnalyzer(en_request, en_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Chinese text
milvus::RunAnalyzerRequest cn_request;
cn_request.WithAnalyzerParams(analyzer_params);
cn_request.AddText("Milvus 向量数据库专为大规模应用而设计");
milvus::RunAnalyzerResponse cn_response;
status = client->RunAnalyzer(cn_request, cn_response);
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

// Configuration
const analyzer_params = {
  tokenizer: {
    type: "language_identifier",
    identifier: "whatlang",
    analyzers: {
      default: { tokenizer: "standard" },
      English: { type: "english" },
      Mandarin: { tokenizer: "jieba" },
    },
  },
};

// English text
const en_result = await client.runAnalyzer({
  text: 'The Milvus vector database is built for scale!',
  analyzer_params,
});
console.log('English:', en_result.results.flatMap(r => r.tokens.map(t => t.token)));

// Chinese text
const cn_result = await client.runAnalyzer({
  text: 'Milvus 向量数据库专为大规模应用而设计',
  analyzer_params,
});
console.log('Chinese:', cn_result.results.flatMap(r => r.tokens.map(t => t.token)));
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

// Configuration
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "language_identifier",
        ["identifier"] = "whatlang",
        ["analyzers"] = new Dictionary<string, object>
        {
            ["default"] = new Dictionary<string, object> { ["tokenizer"] = "standard" },
            ["English"] = new Dictionary<string, object> { ["type"] = "english" },
            ["Mandarin"] = new Dictionary<string, object> { ["tokenizer"] = "jieba" }
        }
    }
};

// English text
await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { "The Milvus vector database is built for scale!" }
});

// Chinese text
await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { "Milvus 向量数据库专为大规模应用而设计" }
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "analyzerParams": "{\"tokenizer\":{\"type\":\"language_identifier\",\"identifier\":\"whatlang\",\"analyzers\":{\"default\":{\"tokenizer\":\"standard\"},\"English\":{\"type\":\"english\"},\"Mandarin\":{\"tokenizer\":\"jieba\"}}}}",
    "text": ["The Milvus vector database is built for scale!"]
  }'
```

### European languages with accent normalization

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

# Configuration for French, German, Spanish, etc.
analyzer_params = {
    "tokenizer": {
        "type": "language_identifier",
        "identifier": "lingua",
        "analyzers": {
            "default": {"tokenizer": "standard"},
            "English": {"type": "english"},
            "French": {
                "tokenizer": "standard",
                "filter": ["lowercase", "asciifolding"]
            }
        }
    }
}

# Test with accented text
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

result_fr = client.run_analyzer("Café français très délicieux", analyzer_params)
print("French:", result_fr)
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

// Configuration for French, German, Spanish, etc.
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
    put("type", "language_identifier");
    put("identifier", "lingua");
    put("analyzers", new HashMap<String, Object>() {{
        put("default", new HashMap<String, Object>() {{
            put("tokenizer", "standard");
        }});
        put("English", new HashMap<String, Object>() {{
            put("type", "english");
        }});
        put("French", new HashMap<String, Object>() {{
            put("tokenizer", "standard");
            put("filter", Arrays.asList("lowercase", "asciifolding"));
        }});
    }});
}});

// Test with accented text
List<String> texts = new ArrayList<>();
texts.add("Café français très délicieux");
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

ctx := context.Background()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

// Configuration for French, German, Spanish, etc.
analyzerParams := map[string]any{
    "tokenizer": map[string]any{
        "type":       "language_identifier",
        "identifier": "lingua",
        "analyzers": map[string]any{
            "default": map[string]any{"tokenizer": "standard"},
            "English": map[string]any{"type": "english"},
            "French": map[string]any{
                "tokenizer": "standard",
                "filter":    []any{"lowercase", "asciifolding"},
            },
        },
    },
}

// Test with accented text
result, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption("Café français très délicieux").
        WithAnalyzerParams(analyzerParams))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
for _, tokens := range result {
    fmt.Println("French:", tokens.Tokens)
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

// Configuration for French, German, Spanish, etc.
let analyzer_params = serde_json::json!({
    "tokenizer": {
        "type": "language_identifier",
        "identifier": "lingua",
        "analyzers": {
            "default": {"tokenizer": "standard"},
            "English": {"type": "english"},
            "French": {
                "tokenizer": "standard",
                "filter": ["lowercase", "asciifolding"]
            }
        }
    }
});

// Test with accented text
let response = client.run_analyzer(RunAnalyzerRequest::builder()
    .texts(["Café français très délicieux"])
    .analyzer_params(analyzer_params)
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

// Configuration for French, German, Spanish, etc.
nlohmann::json analyzer_params = {
    {"tokenizer", {
        {"type", "language_identifier"},
        {"identifier", "lingua"},
        {"analyzers", {
            {"default", {{"tokenizer", "standard"}}},
            {"English", {{"type", "english"}}},
            {"French", {
                {"tokenizer", "standard"},
                {"filter", {"lowercase", "asciifolding"}}
            }}
        }}
    }}
};

// Test with accented text
milvus::RunAnalyzerRequest request;
request.WithAnalyzerParams(analyzer_params);
request.AddText("Café français très délicieux");
milvus::RunAnalyzerResponse response;
status = client->RunAnalyzer(request, response);
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

// Configuration for French, German, Spanish, etc.
const analyzer_params = {
  tokenizer: {
    type: "language_identifier",
    identifier: "lingua",
    analyzers: {
      default: { tokenizer: "standard" },
      English: { type: "english" },
      French: {
        tokenizer: "standard",
        filter: ["lowercase", "asciifolding"],
      },
    },
  },
};

// Test with accented text
const fr_result = await client.runAnalyzer({
  text: 'Café français très délicieux',
  analyzer_params,
});
console.log('French:', fr_result.results.flatMap(r => r.tokens.map(t => t.token)));
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

// Configuration for French, German, Spanish, etc.
var analyzerParams = new Dictionary<string, object>
{
    ["tokenizer"] = new Dictionary<string, object>
    {
        ["type"] = "language_identifier",
        ["identifier"] = "lingua",
        ["analyzers"] = new Dictionary<string, object>
        {
            ["default"] = new Dictionary<string, object> { ["tokenizer"] = "standard" },
            ["English"] = new Dictionary<string, object> { ["type"] = "english" },
            ["French"] = new Dictionary<string, object>
            {
                ["tokenizer"] = "standard",
                ["filter"] = new[] { "lowercase", "asciifolding" }
            }
        }
    }
};

// Test with accented text
await client.RunAnalyzerAsync(new RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = new[] { "Café français très délicieux" }
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/common/run_analyzer" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "analyzerParams": "{\"tokenizer\":{\"type\":\"language_identifier\",\"identifier\":\"lingua\",\"analyzers\":{\"default\":{\"tokenizer\":\"standard\"},\"English\":{\"type\":\"english\"},\"French\":{\"tokenizer\":\"standard\",\"filter\":[\"lowercase\",\"asciifolding\"]}}}}",
    "text": ["Café français très délicieux"]
  }'
```

### Expected output

The European example above produces the following tokens in order. SDK response objects and printed formatting vary by language; the REST response contains these tokens at `data.results[].tokens[].token`. The token sequence for the English and Chinese detection example depends on which analyzer the detector selects for each input, so it is not reproduced here.

```plaintext
French: ['cafe', 'francais', 'tres', 'delicieux']
```

## Usage notes

- **Single-language per field:** It operates on a field as a single, homogenous unit of text. It is designed to handle different languages across different data records, such as one record containing an English sentence and the next containing a French sentence.

- **No mixed-language strings:** It is **not** designed to handle a single string that contains text from multiple languages. For example, a single `VARCHAR` field containing both an English sentence and a quoted Japanese phrase will be processed as a single language.

- **Dominant language processing:** In mixed-language scenarios, the detection engine will likely identify the dominant language, and the corresponding analyzer will be applied to the entire text. This will result in poor or no tokenization for the embedded foreign text.
