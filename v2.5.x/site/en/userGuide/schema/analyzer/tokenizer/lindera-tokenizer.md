---
id: lindera-tokenizer.md
title: "Lindera"
summary: "The lindera tokenizer performs dictionary-based morphological analysis. It is a good choice for languages—such as Japanese, Korean, and Chinese—whose words are not separated by spaces."
---

# Lindera

The `lindera` tokenizer performs dictionary-based morphological analysis. It is a good choice for languages—such as Japanese, Korean, and Chinese—whose words are not separated by spaces.

## Configuration

To configure an analyzer using the `lindera` tokenizer, set `tokenizer.type` to `lindera` and choose a dictionary with `dict_kind`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#plaintext">plaintext</a>
</div>

```python
analyzer_params = {
    "tokenizer": {
      "type": "lindera"，
      "dict_kind": "ipadic"
    }
}
```

```plaintext
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer",
                new HashMap<String, Object>() {{
                    put("type", "lindera");
                    put("dict_kind", "ipadic");
                }});
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
     <td><p><code>dict</code></p></td>
     <td><p>A list of dictionaries used to define vocabulary. Possible values:</p>
<ul>
<li><p><code>ipadic</code>: Japanese</p></li>
<li><p><code>ko-dic</code>: Korean</p></li>
<li><p><code>cc-cedict</code>: Mandarin Chinese (traditional/simpl.)</p></li>
</ul></td>
   </tr>
</table>

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#plaintext">plaintext</a>
</div>

```python
analyzer_params = {
    "tokenizer": {
      "type": "lindera",
      "dict_kind": "ipadic"
    }
}
```

```plaintext
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer",
                new HashMap<String, Object>() {{
                    put("type", "lindera");
                    put("dict_kind", "ipadic");
                }});
```

### Verification using `run_analyzer`

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
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

### Expected output

```plaintext
{tokens: ['東京', 'スカイ', 'ツリー', 'の', '最寄り駅', 'は', 'とう', 'きょう', 'スカイ', 'ツリー', '駅', 'で']} 
```