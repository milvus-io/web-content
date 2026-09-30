---
id: standard-tokenizer.md
title: "Standard Tokenizer"
summary: "The standard tokenizer in Milvus groups consecutive Unicode letters and numeric characters into tokens, splitting at other characters."
---

# Standard Tokenizer

The `standard` tokenizer in Milvus groups consecutive Unicode letters and numeric characters into tokens, splitting at other characters.

## Tokenization rules

The `standard` tokenizer keeps consecutive characters that belong to the following sets in the same token:

- **ASCII characters:** letters `A-Z` and `a-z`, and digits `0-9`.
- **Non-ASCII characters:** characters with the Unicode `Alphabetic` property or one of the numeric general categories `Nd`, `Nl`, or `No`.

| Unicode property or category | Meaning | Examples of characters retained in tokens |
| --- | --- | --- |
| `Alphabetic` | Letters across writing systems, including Chinese characters and Japanese kana, and some combining marks | `中文测试`, `カタカナ` |
| `Nd` (`Decimal_Number`) | Decimal digits | `٣` |
| `Nl` (`Letter_Number`) | Letter-like numeric characters | `Ⅷ` |
| `No` (`Other_Number`) | Other numeric characters, such as circled numbers, superscripts, and fractions | `①²¾` |

Characters outside these sets separate tokens and are discarded. These include whitespace, punctuation, underscores (`_`), hyphens (`-`), apostrophes (`'`), and symbols such as `+`, `$`, and `😀`. Consecutive separators do not produce empty tokens.

Character classification follows Rust's [`char::is_alphanumeric()`](https://doc.rust-lang.org/std/primitive.char.html#method.is_alphanumeric). For property definitions, see [Unicode Standard Annex #44](https://www.unicode.org/reports/tr44/). The complete Unicode 17.0 character lists are available in [`DerivedCoreProperties.txt`](https://www.unicode.org/Public/17.0.0/ucd/DerivedCoreProperties.txt) for `Alphabetic` and [`DerivedGeneralCategory.txt`](https://www.unicode.org/Public/17.0.0/ucd/extracted/DerivedGeneralCategory.txt) for `Nd`, `Nl`, and `No`. Character membership depends on the Unicode data used by the deployed version.

The following examples use `{"tokenizer": "standard"}` with no filters. The tokenizer preserves letter case and does not segment continuous Chinese text into individual words.

| Input | Output tokens |
| --- | --- |
| `foo_bar-can't😀123` | `["foo", "bar", "can", "t", "123"]` |
| `中文测试` | `["中文测试"]` |
| `version①.¾` | `["version①", "¾"]` |
| `Hello,World!` | `["Hello", "World"]` |

## Configuration

To configure an analyzer using the `standard` tokenizer, set `tokenizer` to `standard` in `analyzer_params`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "standard",
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
```

```javascript
const analyzer_params = {
    "tokenizer": "standard",
};
```

```go
analyzerParams = map[string]any{"tokenizer": "standard"}
```

```bash
# restful
analyzerParams='{
  "tokenizer": "standard"
}'
```

The `standard` tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `standard` tokenizer and `lowercase` filter:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["lowercase"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```javascript
const analyzer_params = {
    "tokenizer": "standard",
    "filter": ["lowercase"]
};
```

```go
analyzerParams = map[string]any{"tokenizer": "standard", "filter": []any{"lowercase"}}
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

<div class="alert note">

For simpler setup, you may choose to use the [`standard`](standard-analyzer.md) [analyzer](standard-analyzer.md), which combines the `standard` tokenizer with the [`lowercase`](lowercase-filter.md)[ filter](lowercase-filter.md).

</div>

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

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
    "tokenizer": "standard",
    "filter": ["lowercase"]
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

```javascript
// javascript
```

```go
analyzerParams = map[string]any{"tokenizer": "standard", "filter": []any{"lowercase"}}
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
sample_text = "The Milvus vector database is built for scale!"

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
texts.add("The Milvus vector database is built for scale!");

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
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
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
```

```bash
# restful
```

### Expected output

```plaintext
['the', 'milvus', 'vector', 'database', 'is', 'built', 'for', 'scale']
```

