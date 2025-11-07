---
id: tei-ranker.md
title: "TEI Ranker"
summary: "The TEI Ranker leverages the Text Embedding Inference (TEI) service from Hugging Face to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity."
beta: Milvus 2.6.x
---

# TEI Ranker

The TEI Ranker leverages the [Text Embedding Inference (TEI)](https://huggingface.co/docs/text-embeddings-inference/index) service from Hugging Face to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity.

## Prerequisites

Before implementing TEI Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A running TEI service with reranking capabilities. For detailed instructions on setting up a TEI service, refer to the [official TEI documentation](https://huggingface.co/docs/text-embeddings-inference/en/quick_tour).

## Create a TEI ranker function

To use TEI Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

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

# Configure TEI Ranker
tei_ranker = Function(
    name="tei_semantic_ranker",            # Unique identifier for your ranker
    input_field_names=["document"],        # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,     # Must be RERANK for reranking functions
    params={
        "reranker": "model",               # Enables model-based reranking
        "provider": "tei",                 # Specifies TEI as the service provider
        "queries": ["renewable energy developments"],  # Query text for relevance evaluation
        "endpoint": "http://localhost:8080",  # Your TEI service URL
        "max_client_batch_size": 32,                    # Optional: batch size for processing (default: 32)
        "truncate": True,                # Optional: Truncate the inputs that are longer than the maximum supported size
        "truncation_direction": "Right",    # Optional: Direction to truncate the inputs
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
        .name("vllm_semantic_ranker")
        .inputFieldNames(Collections.singletonList(NAME_FIELD))
        .param("reranker", "model")
        .param("provider", "tei")
        .param("queries", "[\"renewable energy developments\"]")
        .param("endpoint", "http://localhost:8080")
        .param("max_client_batch_size", "32")
        .param("truncate", "true")
        .param("truncation_direction", "Right")
        .build();
searchWithRanker(scientists, ranker);
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

### TEI ranker-specific parameters

The following parameters are specific to the TEI ranker:

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
     <td><p>The model service provider to use for reranking.</p></td>
     <td><p><code>"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>Yes</p></td>
     <td><p>List of query strings used by the rerank model to calculate relevance scores. The number of query strings must match exactly the number of queries in your search operation (even when using query vectors instead of text), otherwise an error will be reported.</p></td>
     <td><p><em>["search query"]</em></p></td>
   </tr>
   <tr>
     <td><p><code>endpoint</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Your TEI service URL.</p></td>
     <td><p><code>"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Since model services may not process all data at once, this sets the batch size for accessing the model service in multiple requests.</p></td>
     <td><p><code>32</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>truncate</code></p></td>
     <td><p>No</p></td>
     <td><p>Whether to truncate inputs exceeding max sequence length. If <code>False</code>, long inputs raise errors.</p></td>
     <td><p><code>True</code> or <code>False</code></p></td>
   </tr>
   <tr>
     <td><p><code>truncation_direction</code></p></td>
     <td><p>No</p></td>
     <td><p>Direction to truncate from when input is too long:</p><ul><li><p><code>"Right"</code> (default):  Tokens are removed from the end of the sequence until the maximum supported size is matched.</p></li><li><p><code>"Left"</code>: Tokens are removed from the beginning of the sequence.</p></li></ul></td>
     <td><p><code>"Right"</code> or <code>"Left"</code></p></td>
   </tr>
</table>

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply TEI Ranker to a standard vector search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Execute search with vLLM reranking
results = client.search(
    collection_name="your_collection",
    data=[your_query_vector],  # Replace with your query vector
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=tei_ranker,                         # Apply tei reranking
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

TEI Ranker can also be used with hybrid search to combine dense and sparse retrieval methods:

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

# Execute hybrid search with vLLM reranking
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=tei_ranker,                        # Apply tei reranking to combined results
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

