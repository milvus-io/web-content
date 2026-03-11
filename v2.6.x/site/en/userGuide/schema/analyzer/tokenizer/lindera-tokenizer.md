---
id: lindera-tokenizer.md
title: "Lindera"
summary: "The lindera tokenizer performs dictionary-based morphological analysis. It is designed for Japanese and Korean—languages where words are not separated by spaces and grammatical markers (particles) attach directly to words."
---

# Lindera

The `lindera` tokenizer performs dictionary-based morphological analysis. It is designed for Japanese and Korean—languages where words are not separated by spaces and grammatical markers (particles) attach directly to words.

<div class="alert note">

**For Chinese text**: While `lindera` supports Chinese via the `cc-cedict` dictionary, we recommend using the [`jieba`](jieba-tokenizer.md) tokenizer instead. Jieba is specifically designed for Chinese word segmentation and provides better results.

</div>

## Overview

Japanese and Korean are agglutinative languages: grammatical markers called particles attach directly to nouns, forming numerous combinations. For example:

<table>
   <tr>
     <th><p>Language</p></th>
     <th><p>Root word</p></th>
     <th><ul><li>Particle</li></ul></th>
     <th><p>= Combined form</p></th>
     <th><p>Meaning</p></th>
   </tr>
   <tr>
     <td><p>Korean</p></td>
     <td><p>서울 (Seoul)</p></td>
     <td><p>에서</p></td>
     <td><p>서울에서</p></td>
     <td><p>in Seoul</p></td>
   </tr>
   <tr>
     <td><p>Japanese</p></td>
     <td><p>東京 (Tokyo)</p></td>
     <td><p>に</p></td>
     <td><p>東京に</p></td>
     <td><p>to Tokyo</p></td>
   </tr>
</table>

The `lindera` tokenizer:

1. **Segments text** into individual morphemes (words and particles)

1. **Tags each token** with part-of-speech (POS) information from the dictionary

1. **Applies filters** to remove unwanted tokens (e.g., particles, punctuation)

This two-stage process—segmentation followed by POS-based filtering—enables precise control over which tokens are indexed for search.

## Prerequisites

<div class="alert note">

**Milvus 2.6+ users**: You can skip this section. All dictionaries are pre-compiled and included in the official release.

</div>

For Milvus 2.5.x, you need to compile Milvus with specific dictionaries enabled. All dictionaries must be explicitly included during compilation.

To enable specific dictionaries, include them in the compilation command:

```bash
make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
```

The complete list of available dictionaries:

<table>
   <tr>
     <th><p><strong>Dictionary</strong></p></th>
     <th><p><strong>Language</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>lindera-ko-dic</p></td>
     <td><p>Korean</p></td>
     <td><p>Korean morphological dictionary (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic</p></td>
     <td><p>Japanese</p></td>
     <td><p>Standard morphological dictionary (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic-neologd</p></td>
     <td><p>Japanese</p></td>
     <td><p>Extended dictionary with new words and proper nouns (<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-unidic</p></td>
     <td><p>Japanese</p></td>
     <td><p>Academic standard dictionary (<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-cc-cedict</p></td>
     <td><p>Chinese</p></td>
     <td><p>Community-maintained Chinese-English dictionary (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p></td>
   </tr>
</table>

For example, to enable all dictionaries:

```bash
make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
```

## Configuration

To configure an analyzer using the `lindera` tokenizer, set `tokenizer.type` to `lindera`, choose a dictionary with `dict_kind`, and optionally apply filters.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": {
        "type": "lindera",
        "dict_kind": "ko-dic",
        "filter": [
            {
                "kind": "korean_stop_tags",
                "tags": ["SP", "SSC", "SSO", "SC", "SE", "SF", "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ", "JX", "JC", "UNK", "EP", "ETM"]
            }
        ]
    }
}
```

```java
Map<String, Object> analyzerParams = new HashMap<>();                                 
  analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
      put("type", "lindera");                                                           
      put("dict_kind", "ko-dic");                                 
      put("filter", Arrays.asList(
          new HashMap<String, Object>() {{
              put("kind", "korean_stop_tags");
              put("tags", Arrays.asList(
                  "SP", "SSC", "SSO", "SC", "SE", "SF",
                  "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ",
                  "JX", "JC", "UNK", "EP", "ETM"
              ));
          }}
      ));
  }});
```

```go
analyzerParams := map[string]interface{}{                                             
      "tokenizer": map[string]interface{}{     
          "type":      "lindera",                                                       
          "dict_kind": "ko-dic",                                  
          "filter": []interface{}{                                                      
              map[string]interface{}{                             
                  "kind": "korean_stop_tags",
                  "tags": []string{
                      "SP", "SSC", "SSO", "SC", "SE", "SF",
                      "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ",
                      "JX", "JC", "UNK", "EP", "ETM",
                  },
              },
          },
      },
  }
```

```javascript
const analyzer_params = {
    "tokenizer": {
        "type": "lindera",
        "dict_kind": "ko-dic",
        "filter": [
            {
                "kind": "korean_stop_tags",
                "tags": ["SP", "SSC", "SSO", "SC", "SE", "SF", "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ", "JX", "JC", "UNK", "EP", "ETM"]
            }
        ]
    }
};
```

```bash
# restful
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
     <td><p>A dictionary used to define vocabulary. Possible values:</p><ul><li><p><code>ko-dic</code>: Korean - Korean morphological dictionary (<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>)</p></li><li><p><code>ipadic</code>: Japanese - Standard morphological dictionary (<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>)</p></li><li><p><code>ipadic-neologd</code>: Japanese with neologism dictionary (extended) - Includes new words and proper nouns (<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>)</p></li><li><p><code>unidic</code>: Japanese UniDic (extended) - Academic standard dictionary with detailed linguistic information (<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>)</p></li><li><p><code>cc-cedict</code>: Mandarin Chinese (traditional/simplified) - Community-maintained Chinese-English dictionary (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>filter</code></p></td>
     <td><p>A list of tokenizer-level filters to apply after segmentation. Each filter is an object with:</p><ul><li><p><code>kind</code>: The filter type. Supported values:</p><ul><li><p><code>korean_stop_tags</code>: Remove tokens matching specified Korean POS tags.</p></li><li><p><code>japanese_stop_tags</code>: Remove tokens matching specified Japanese POS tags.</p></li></ul></li><li><p><code>tags</code>: A list of POS tags to filter out. The available tags depend on the <code>kind</code>:</p><ul><li><p>For <code>korean_stop_tags</code>: Use exact tag codes (e.g., <code>JKS</code>, <code>JKO</code>, <code>SF</code>). Korean tags require exact matching. For the complete list based on the Sejong tagset, see the <a href="https://docs.rs/lindera/latest/src/lindera/token_filter/korean_stop_tags.rs.html">Lindera Korean stop tags source</a>.</p></li><li><p>For <code>japanese_stop_tags</code>: Use exact tag codes (e.g., <code>助詞,格助詞</code>, <code>助詞,係助詞</code>, <code>助動詞</code>). Japanese tags require exact matching. For the complete list (IPADIC), see <a href="https://github.com/taku910/mecab/blob/master/mecab-ipadic/pos-id.def">Japanese POS tags reference</a>.</p></li></ul></li></ul></td>
   </tr>
</table>

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Korean example

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

analyzer_params = {
    "tokenizer": {
        "type": "lindera",
        "dict_kind": "ko-dic",
        "filter": [
            {
                "kind": "korean_stop_tags",
                "tags": ["SP", "SSC", "SSO", "SC", "SE", "SF", "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ", "JX", "JC", "UNK", "EP", "ETM"]
            }
        ]
    }
}

# Sample Korean text: "서울에서 맛있는 음식을 먹었습니다" (I ate delicious food in Seoul)
sample_text = "서울에서 맛있는 음식을 먹었습니다"

result = client.run_analyzer(sample_text, analyzer_params)
print("Analyzer output:", result)
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

Map<String, Object> analyzerParams = new HashMap<>();                                                                          
analyzerParams.put("tokenizer", new HashMap<String, Object>() {{
  put("type", "lindera");                                                                                                    
  put("dict_kind", "ko-dic");                                 
  put("filter", Arrays.asList(
      new HashMap<String, Object>() {{
          put("kind", "korean_stop_tags");
          put("tags", Arrays.asList(
              "SP", "SSC", "SSO", "SC", "SE", "SF",
              "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ",
              "JX", "JC", "UNK", "EP", "ETM"
          ));
      }}
  ));
}});

List<String> texts = new ArrayList<>();
texts.add("서울에서 맛있는 음식을 먹었습니다");

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

analyzerParams := map[string]interface{}{
  "tokenizer": map[string]interface{}{
      "type":      "lindera",
      "dict_kind": "ko-dic",
      "filter": []interface{}{
          map[string]interface{}{
              "kind": "korean_stop_tags",
              "tags": []string{
                  "SP", "SSC", "SSO", "SC", "SE", "SF",
                  "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ",
                  "JX", "JC", "UNK", "EP", "ETM",
              },
          },
      },
  },
}

bs, _ := json.Marshal(analyzerParams)
texts := []string{"서울에서 맛있는 음식을 먹었습니다"}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(string(bs))

result, err := client.RunAnalyzer(ctx, option)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  uri: "http://localhost:19530",
});

const analyzer_params = {
  tokenizer: {
    type: "lindera",
    dict_kind: "ko-dic",
    filter: [
      {
        kind: "korean_stop_tags",
        tags: [
          "SP",
          "SSC",
          "SSO",
          "SC",
          "SE",
          "SF",
          "JKS",
          "JKC",
          "JKG",
          "JKO",
          "JKB",
          "JKV",
          "JKQ",
          "JX",
          "JC",
          "UNK",
          "EP",
          "ETM",
        ],
      },
    ],
  },
};

const sample_text = "서울에서 맛있는 음식을 먹었습니다";

const result = await client.run_analyzer(sample_text, analyzer_params);
console.log("Analyzer output:", result);

```

```bash
# restful
```

**Expected output**:

```plaintext
['서울', '맛있', '음식', '먹', '습니다']
```

Without `korean_stop_tags`, the output would include particles like `에서` (in), `는` (topic marker), and `을` (object marker), which are typically not useful for search.

### Japanese example

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

analyzer_params = {
    "tokenizer": {
        "type": "lindera",
        "dict_kind": "ipadic",
        "filter": [
            {
                "kind": "japanese_stop_tags",
                "tags": ["接続詞", "助詞,格助詞", "助詞,格助詞,一般", "助詞,格助詞,引用", "助詞,格助詞,連語", "助詞,係助詞", "助詞,終助詞", "助詞,接続助詞", "助詞,特殊", "助詞,副助詞", "助詞,副助詞／並立助詞／終助詞", "助詞,連体化", "助詞,副詞化", "助詞,並立助詞", "助動詞", "記号,一般", "記号,読点", "記号,句点", "記号,空白", "記号,括弧閉", "記号,括弧開", "その他,間投", "フィラー", "非言語音"]
            }
        ]
    }
}

# Sample Japanese text: "東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です"
sample_text = "東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です"

result = client.run_analyzer(sample_text, analyzer_params)
print("Analyzer output:", result)
```

```java
// java
```

```go
// go
```

```javascript

import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  uri: "http://localhost:19530",
});

const analyzer_params = {
    "tokenizer": {
        "type": "lindera",
        "dict_kind": "ipadic",
        "filter": [
            {
                "kind": "japanese_stop_tags",
                "tags": ["接続詞", "助詞,格助詞", "助詞,格助詞,一般", "助詞,格助詞,引用", "助詞,格助詞,連語", "助詞,係助詞", "助詞,終助詞", "助詞,接続助詞", "助詞,特殊", "助詞,副助詞", "助詞,副助詞／並立助詞／終助詞", "助詞,連体化", "助詞,副詞化", "助詞,並立助詞", "助動詞", "記号,一般", "記号,読点", "記号,句点", "記号,空白", "記号,括弧閉", "記号,括弧開", "その他,間投", "フィラー", "非言語音"]
            }
        ]
    }
}

// Sample Japanese text: "東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です"
const sample_text = "東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です"

const result = await client.run_analyzer(sample_text, analyzer_params);
console.log("Analyzer output:", result);
```

```bash
# restful
```

**Expected output:**

```plaintext
['東京', 'スカイ', 'ツリー', '最寄り駅', 'とう', 'きょう', 'スカイ', 'ツリー', '駅']
```

Without `japanese_stop_tags`, the output would include particles like `の` (possessive), `は` (topic marker), and `です` (copula).