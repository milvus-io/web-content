---
id: tei-ranker.md
title: "TEI Ranker"
summary: "The TEI Ranker leverages the Text Embedding Inference (TEI) service from Hugging Face to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity."
beta: Milvus 2.6.x
---

# TEI Ranker

The TEI Ranker leverages the [Text Embedding Inference (TEI)](tei-ranker.md) service from Hugging Face to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity.

Compared to [vLLM Ranker](vllm-ranker.md), TEI Ranker offers straightforward integration with Hugging Face's ecosystem and pre-trained reranking models, making it ideal for applications where ease of deployment and maintenance are priorities.

## Prerequisites

Before implementing vLLM Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A running TEI service with reranking capabilities. For detailed instructions on setting up a TEI service, refer to the [official TEI documentation](https://huggingface.co/docs/text-embeddings-inference/en/quick_tour).

## Create a TEI ranker function

To use TEI Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

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
        "maxBatch": 32,                    # Optional: batch size for processing (default: 32)
        "truncate": True,                # Optional: Truncate the inputs that are longer than the maximum supported size
        "truncation_direction": "Right",    # Optional: Direction to truncate the inputs
    }
)
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
     <td><p><code>truncate</code></p></td>
     <td><p>No</p></td>
     <td><p>Whether to truncate inputs exceeding max sequence length. If <code>False</code>, long inputs raise errors.</p></td>
     <td><p><code>True</code> or <code>False</code></p></td>
   </tr>
   <tr>
     <td><p><code>truncation_direction</code></p></td>
     <td><p>No</p></td>
     <td><p>Direction to truncate from when input is too long:</p>
<ul>
<li><p><code>"Right"</code> (default):  Tokens are removed from the end of the sequence until the maximum supported size is matched.</p></li>
<li><p><code>"Left"</code>: Tokens are removed from the beginning of the sequence.</p></li>
</ul></td>
     <td><p><code>"Right"</code> or <code>"Left"</code></p></td>
   </tr>
</table>

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply TEI Ranker to a standard vector search:

```python
# Execute search with vLLM reranking
results = client.search(
    collection_name="your_collection",
    data=["AI Research Progress", "What is AI"],  # Search queries
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=tei_ranker,                         # Apply tei reranking
    consistency_level="Bounded"
)
```

## Apply to hybrid search

TEI Ranker can also be used with hybrid search to combine dense and sparse retrieval methods:

```python
from pymilvus import AnnSearchRequest

# Configure dense vector search
dense_search = AnnSearchRequest(
    data=["AI Research Progress", "What is AI"],
    anns_field="dense_vector",
    param={},
    limit=5
)

# Configure sparse vector search  
sparse_search = AnnSearchRequest(
    data=["AI Research Progress", "What is AI"],
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