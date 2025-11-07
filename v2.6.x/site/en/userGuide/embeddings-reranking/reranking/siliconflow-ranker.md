---
id: siliconflow-ranker.md
title: "SiliconFlow Ranker"
summary: "The SiliconFlow Ranker leverages SiliconFlow's comprehensive reranking models to enhance search relevance through semantic reranking. It provides flexible document chunking capabilities and supports a wide range of specialized reranking models from various providers."
beta: Milvus 2.6.x
---

# SiliconFlow Ranker

The SiliconFlow Ranker leverages [SiliconFlow's](https://www.siliconflow.com/) comprehensive reranking models to enhance search relevance through semantic reranking. It provides flexible document chunking capabilities and supports a wide range of specialized reranking models from various providers.

SiliconFlow Ranker is particularly valuable for applications requiring:

- Advanced document chunking with configurable overlap for handling long documents

- Access to diverse reranking models including BAAI/bge-reranker series and other specialized models

- Flexible chunk-based scoring where the highest-scoring chunk represents the document score

- Cost-effective reranking with support for both standard and pro model variants

## Prerequisites

Before implementing SiliconFlow Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A valid SiliconFlow API key with access to reranking models. Sign up at [SiliconFlow's platform](https://www.siliconflow.com/) to obtain your API credentials. You can either:

    - Set the `SILICONFLOW_API_KEY` environment variable, or

    - Specify the API key directly in the ranker configuration

## Create a SiliconFlow ranker function

To use SiliconFlow Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="http://localhost:19530"  # Replace with your Milvus server URI
)

# Configure SiliconFlow Ranker
siliconflow_ranker = Function(
    name="siliconflow_semantic_ranker",     # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "siliconflow",          # Specifies SiliconFlow as the service provider
        "model_name": "BAAI/bge-reranker-v2-m3", # SiliconFlow reranking model to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "max_chunks_per_doc": 5,            # Optional: max chunks per document for supported models
        "overlap_tokens": 50,               # Optional: token overlap between chunks for supported models
        # "credential": "your-siliconflow-api-key" # Optional: if not set, uses SILICONFLOW_API_KEY env var
    }
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

CreateCollectionReq.Function ranker = CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name("siliconflow_semantic_ranker")
                       .inputFieldNames(Collections.singletonList("document"))
                       .param("reranker", "model")
                       .param("provider", "siliconflow")
                       .param("model_name", "BAAI/bge-reranker-v2-m3")
                       .param("queries", "[\"renewable energy developments\"]")
                       .param("endpoint", "http://localhost:8080")
                       .param("max_client_batch_size", "32")
                       .param("max_chunks_per_doc", "5")
                       .param("overlap_tokens", "50")
                       .build();
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

### SiliconFlow ranker-specific parameters

The following parameters are specific to the SiliconFlow ranker:

<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Required?</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Value / Example</strong></p></th>
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
     <td><p>The model service provider to use for reranking.</p></td>
     <td><p><code>"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The SiliconFlow reranking model to use from supported models on SiliconFlow platform.</p><p>For a list of rerank models available, refer to <a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">SiliconFlow documentation</a>.</p></td>
     <td><p><code>"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>Yes</p></td>
     <td><p>List of query strings used by the rerank model to calculate relevance scores. The number of query strings must match exactly the number of queries in your search operation (even when using query vectors instead of text), otherwise an error will be reported.</p></td>
     <td><p><em>["search query"]</em></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Since model services may not process all data at once, this sets the batch size for accessing the model service in multiple requests.</p></td>
     <td><p><code>128</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>max_chunks_per_doc</code></p></td>
     <td><p>No</p></td>
     <td><p>Maximum number of chunks generated from within a document. Long documents are divided into multiple chunks for calculation, and the highest score among the chunks is taken as the document's score. Only supported by specific models: <code>BAAI/bge-reranker-v2-m3</code>, <code>Pro/BAAI/bge-reranker-v2-m3</code>, and <code>netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code>5</code>, <code>10</code></p></td>
   </tr>
   <tr>
     <td><p><code>overlap_tokens</code></p></td>
     <td><p>No</p></td>
     <td><p>Number of token overlaps between adjacent chunks when documents are chunked. This ensures continuity across chunk boundaries for better semantic understanding. Only supported by specific models: <code>BAAI/bge-reranker-v2-m3</code>, <code>Pro/BAAI/bge-reranker-v2-m3</code>, and <code>netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code>50</code></p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>No</p></td>
     <td><p>Authentication credential for accessing SiliconFlow API services. If not specified, the system will look for the <code>SILICONFLOW_API_KEY</code> environment variable.</p></td>
     <td><p><em>"your-siliconflow-api-key"</em></p></td>
   </tr>
</table>

**Model-specific feature support**: The `max_chunks_per_doc` and `overlap_tokens` parameters are only supported by specific models. When using other models, these parameters will be ignored.

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply SiliconFlow Ranker to a standard vector search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Execute search with SiliconFlow reranking
results = client.search(
    collection_name="your_collection",
    data=[your_query_vector],  # Replace with your query vector
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=siliconflow_ranker,                  # Apply SiliconFlow reranking
    consistency_level="Bounded"
)
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;

SearchReq searchReq = SearchReq.builder()
        .collectionName("your_collection")
        .data(Arrays.asList(new EmbeddedText("AI Research Progress"), new EmbeddedText("What is AI")))
        .annsField("vector_field")
        .limit(10)
        .outputFields(Collections.singletonList("document"))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
SearchResp searchResp = client.search(searchReq);
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

## Apply to hybrid search

SiliconFlow Ranker can also be used with hybrid search to combine dense and sparse retrieval methods:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import AnnSearchRequest

# Configure dense vector search
dense_search = AnnSearchRequest(
    data=[your_query_vector_1], # Replace with your query vector
    anns_field="dense_vector",
    param={},
    limit=5
)

# Configure sparse vector search  
sparse_search = AnnSearchRequest(
    data=[your_query_vector_2], # Replace with your query vector
    anns_field="sparse_vector", 
    param={},
    limit=5
)

# Execute hybrid search with SiliconFlow reranking
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=siliconflow_ranker,                 # Apply SiliconFlow reranking to combined results
    limit=5,                                   # Final number of results
    output_fields=["document"]
)
```

```java
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.data.FloatVec;
        
List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("dense_vector")
        .vectors(Arrays.asList(new FloatVec(embedding1), new FloatVec(embedding2)))
        .limit(5)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("sparse_vector")
        .data(Arrays.asList(new EmbeddedText("AI Research Progress"), new EmbeddedText("What is AI")))
        .limit(5)
        .build());

HybridSearchReq hybridSearchReq = HybridSearchReq.builder()
                .collectionName("your_collection")
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(5)
                .outputFields(Collections.singletonList("document"))
                .build();
SearchResp searchResp = client.hybridSearch(hybridSearchReq);
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```