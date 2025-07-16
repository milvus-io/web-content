---
id: lindera-tokenizer.md
title: "Lindera"
summary: "The lindera tokenizer performs dictionary-based morphological analysis. It is a good choice for languages—such as Japanese, Korean, and Chinese—whose words are not separated by spaces."
beta: Milvus 2.5.11+
---

# Lindera

The `lindera` tokenizer performs dictionary-based morphological analysis. It is a good choice for languages—such as Japanese, Korean, and Chinese—whose words are not separated by spaces.

<div class="alert note">

The `lindera` tokenizer preserves punctuation marks as separate tokens in the output. For example, `"こんにちは！"` becomes `["こんにちは", "！"]`. To remove these standalone punctuation tokens, use the [`removepunct`](removepunct-filter.md) filter.

</div>

## Prerequisites

To use the `lindera` tokenizer, you need to use a specially compiled Milvus version. All dictionaries must be explicitly enabled during compilation to be used.

To enable specific dictionaries, include them in the compilation command:

```
make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
```

The complete list of available dictionaries is: `lindera-ipadic`, `lindera-ipadic-neologd`, `lindera-unidic`, `lindera-ko-dic`, `lindera-cc-cedict`.

For example, to enable all dictionaries:

```
make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
```

## Configuration

To configure an analyzer using the `lindera` tokenizer, set `tokenizer.type` to `lindera` and choose a dictionary with `dict_kind`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
</div>

```python
analyzer_params = {
    "tokenizer": {
      "type": "lindera",
      "dict_kind": "ipadic"
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer",
                new HashMap<String, Object>() {{
                    put("type", "lindera");
                    put("dict_kind", "ipadic");
                }});
```

```go
analyzerParams = map[string]any{"tokenizer": map[string]any{"type": "lindera", "dict_kind": "ipadic"}}
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>type</code></p></td>
     <td><p>The type of tokenizer. This is fixed to <code>"lindera"</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>dict_kind</code></p></td>
     <td><p>A dictionary used to define vocabulary. Possible values:</p>
<ul>
<li><p><code>ko-dic</code>: Korean - Korean morphological dictionary (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></li>
<li><p><code>ipadic</code>: Japanese - Standard morphological dictionary (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></li>

<li><p><code>ipadic-neologd</code>: Japanese with neologism dictionary (extended) - Includes new words and proper nouns (<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>)</p></li>
<li><p><code>unidic</code>: Japanese UniDic (extended) - Academic standard dictionary with detailed linguistic information (<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>)</p></li>
<li><p><code>cc-cedict</code>: Mandarin Chinese (traditional/simplified) - Community-maintained Chinese-English dictionary (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p>
<p><strong>Note:</strong> All dictionaries must be enabled during Milvus compilation to be available for use.</p></li>
</ul></td>
   </tr>
</table>

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
</div>

```python
analyzer_params = {
    "tokenizer": {
      "type": "lindera",
      "dict_kind": "ipadic"
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer",
                new HashMap<String, Object>() {{
                    put("type", "lindera");
                    put("dict_kind", "ipadic");
                }});
```

```go
analyzerParams = map[string]any{"tokenizer": map[string]any{"type": "lindera", "dict_kind": "ipadic"}}
```

### Verification using `run_analyzer` | Milvus 2.5.11+

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
</div>

```python
from pymilvus import (
    MilvusClient,
)

client = MilvusClient(uri="http://localhost:19530")

# Sample text to analyze
sample_text = "東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で"

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
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

List<String> texts = new ArrayList<>();
texts.add("東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で");

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List<RunAnalyzerResp.AnalyzerResult> results = resp.getResults();
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
texts := []string{"東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で"}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(string(bs))

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

### Expected output

```plaintext
{tokens: ['東京', 'スカイ', 'ツリー', 'の', '最寄り駅', 'は', 'とう', 'きょう', 'スカイ', 'ツリー', '駅', 'で']} 
```