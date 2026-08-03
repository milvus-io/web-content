---
id: dashscope-ranker.md
title: "DashScope Ranker"
summary: "This topic describes how to configure and use DashScope reranking models, such as Qwen rerank models, in Milvus."
beta: Milvus 2.6.x
---

# DashScope Ranker

The DashScope Ranker lets Milvus call Alibaba Cloud DashScope reranking models to reorder search results by semantic relevance.

## Prerequisites

Before using the DashScope Ranker, ensure that you have:

- A Milvus collection with a `VARCHAR` field that contains the text to rerank.

- A valid DashScope API key.

- Access to a DashScope reranking model, such as `gte-rerank-v2`.

For available rerank models and regional endpoints, refer to the [Alibaba Cloud Model Studio Text Rerank API](https://www.alibabacloud.com/help/en/model-studio/text-rerank-api).

## Configure credentials

Milvus must know your DashScope API key before it can request reranking from DashScope. You can configure the API key in `milvus.yaml` or through an environment variable.

### Option 1: Configuration file

Store your API key in `milvus.yaml` and point the DashScope rerank provider to the credential label.

```yaml
# milvus.yaml
credential:
  dashscope_apikey:
    apikey: <YOUR_DASHSCOPE_API_KEY>

function:
  rerank:
    model:
      providers:
        ali:
          credential: dashscope_apikey
          # url: https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank
```

### Option 2: Environment variable

If no matching credential is configured in `milvus.yaml`, Milvus can read the DashScope API key from the following environment variable:

<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>MILVUS_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>DashScope API key used by the Milvus service to call Alibaba Cloud DashScope.</p></td>
   </tr>
</table>

## Create a DashScope ranker function

To use the DashScope Ranker, create a Function object that specifies the DashScope reranking model and query text. Use `provider: "ali"` for DashScope reranking.

```python
from pymilvus import Function, FunctionType

dashscope_ranker = Function(
    name="dashscope_semantic_ranker",
    input_field_names=["document"],
    function_type=FunctionType.RERANK,
    params={
        "reranker": "model",
        "provider": "ali",
        "model_name": "gte-rerank-v2",
        "queries": ["renewable energy developments"],
        "max_client_batch_size": 128,
        "credential": "dashscope_apikey",
    },
)
```

### DashScope ranker-specific parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
     <th><p>Value / Example</p></th>
   </tr>
   <tr>
     <td><p><code>reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Must be set to <code>"model"</code> to enable model reranking.</p></td>
     <td><p><code>"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The model service provider to use for reranking. For DashScope, use <code>"ali"</code>.</p></td>
     <td><p><code>"ali"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The DashScope reranking model to use.</p></td>
     <td><p><code>"gte-rerank-v2"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>Yes</p></td>
     <td><p>List of query strings used by the rerank model to calculate relevance scores. The number of query strings must match the number of queries in the search request.</p></td>
     <td><p><code>["renewable energy developments"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Maximum number of documents to send to the model service per request.</p></td>
     <td><p><code>128</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>No</p></td>
     <td><p>The label of a credential defined in the top-level <code>credential:</code> section of <code>milvus.yaml</code>.</p></td>
     <td><p><code>"dashscope_apikey"</code></p></td>
   </tr>
</table>

<div class="alert note">

For general parameters shared across all model rankers, such as `provider` and `queries`, refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply DashScope Ranker to a standard vector search, pass the ranker Function to `search()`.

```python
results = client.search(
    collection_name="your_collection",
    data=[your_query_vector],
    anns_field="dense_vector",
    limit=5,
    output_fields=["document"],
    ranker=dashscope_ranker,
    consistency_level="Bounded",
)
```
