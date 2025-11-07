---
id: voyage-ai-ranker.md
title: "Voyage AI Ranker"
summary: "The Voyage AI Ranker leverages Voyage AI's specialized rerankers to enhance search relevance through semantic reranking. It provides high-performance reranking capabilities optimized for retrieval-augmented generation (RAG) and search applications."
beta: Milvus 2.6.x
---

# Voyage AI Ranker

The Voyage AI Ranker leverages [Voyage AI's](https://www.voyageai.com/) specialized rerankers to enhance search relevance through semantic reranking. It provides high-performance reranking capabilities optimized for retrieval-augmented generation (RAG) and search applications.

Voyage AI Ranker is particularly valuable for applications requiring:

- Advanced semantic understanding with models specifically trained for reranking tasks

- High-performance processing with optimized inference for production workloads

- Flexible truncation controls for handling diverse document lengths

- Fine-tuned performance across different model variants (rerank-2, rerank-lite, etc.)

## Prerequisites

Before implementing Voyage AI Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A valid Voyage AI API key with access to rerankers. Sign up at [Voyage AI's platform](https://www.voyageai.com/) to obtain your API credentials. You can either:

    - Set the `VOYAGE_API_KEY` environment variable, or

    - Specify the API key directly in the ranker configuration

## Create a Voyage AI ranker function

To use Voyage AI Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

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

# Configure Voyage AI Ranker
voyageai_ranker = Function(
    name="voyageai_semantic_ranker",        # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "voyageai",             # Specifies Voyage AI as the service provider
        "model_name": "rerank-2.5",           # Voyage AI reranker to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "truncation": True,                 # Optional: enable input truncation (default: True)
        # "credential": "your-voyage-api-key" # Optional: if not set, uses VOYAGE_API_KEY env var
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
                       .name("voyageai_semantic_ranker")
                       .inputFieldNames(Collections.singletonList("document"))
                       .param("reranker", "model")
                       .param("provider", "voyageai")
                       .param("model_name", "rerank-2.5")
                       .param("queries", "[\"renewable energy developments\"]")
                       .param("endpoint", "http://localhost:8080")
                       .param("max_client_batch_size", "128")
                       .param("truncation", "true")
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

### Voyage AI ranker-specific parameters

The following parameters are specific to the Voyage AI ranker:

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
     <td><p><code>"voyageai"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The Voyage AI reranker to use from supported models on Voyage AI platform.</p><p>For a list of rerankers available, refer to <a href="https://docs.voyageai.com/docs/reranker">Voyage AI</a><a href="https://docs.voyageai.com/docs/reranker"> documentation</a>.</p></td>
     <td><p><code>"rerank-2.5"</code></p></td>
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
     <td><p><code>truncation</code></p></td>
     <td><p>No</p></td>
     <td><p>Whether to truncate the input to satisfy the "context length limit" on the query and the documents.</p><ul><li><p>If <code>True</code>, the query and documents will be truncated to fit within the context length limit, before processed by the reranker model.</p></li><li><p>If <code>False</code>, an error will be raised when the query exceeds 8,000 tokens for <code>rerank-2.5</code> and <code>rerank-2.5-lite</code>; 4,000 tokens for <code>rerank-2</code>; 2,000 tokens <code>rerank-2-lite</code> and <code>rerank-1</code>; and 1,000 tokens for <code>rerank-lite-1</code>, or the sum of the number of tokens in the query and the number of tokens in any single document exceeds 16,000 for <code>rerank-2</code>; 8,000 for <code>rerank-2-lite</code> and <code>rerank-1</code>; and 4,000 for <code>rerank-lite-1</code>.</p></li></ul></td>
     <td><p><code>True</code> (default) or <code>False</code></p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>No</p></td>
     <td><p>Authentication credential for accessing Voyage AI API services. If not specified, the system will look for the <code>VOYAGE_API_KEY</code> environment variable.</p></td>
     <td><p><em>"your-voyage-api-key"</em></p></td>
   </tr>
</table>

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply Voyage AI Ranker to a standard vector search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Execute search with Voyage AI reranker
results = client.search(
    collection_name="your_collection",
    data=[your_query_vector],  # Replace with your query vector
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=voyageai_ranker,                     # Apply Voyage AI reranker
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

Voyage AI Ranker can also be used with hybrid search to combine dense and sparse retrieval methods:

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

# Execute hybrid search with Voyage AI reranker
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=voyageai_ranker,                    # Apply Voyage AI reranker to combined results
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

