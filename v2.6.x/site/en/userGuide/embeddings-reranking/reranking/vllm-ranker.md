---
id: vllm-ranker.md
title: "vLLM Ranker"
summary: "The vLLM Ranker leverages the vLLM inference framework to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity."
beta: Milvus 2.6.x
---

# vLLM Ranker

The vLLM Ranker leverages the [vLLM](https://docs.vllm.ai/en/latest/index.html) inference framework to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity.

vLLM Ranker is particularly valuable for applications where precision and context are critical, such as:

- Technical documentation search requiring deep understanding of concepts

- Research databases where semantic relationships outweigh keyword matching

- Customer support systems that need to match user problems with relevant solutions

- E-commerce search that must understand product attributes and user intent

Compared to [TEI Ranker](tei-ranker.md), vLLM Ranker offers greater flexibility in model selection and customization, making it ideal for specialized or complex search applications where the additional configuration options provide significant benefits.

## Prerequisites

Before implementing vLLM Ranker in Milvus, ensure you have:

- A Milvus collection with a `VARCHAR` field containing the text to be reranked

- A running vLLM service with reranking capabilities. For detailed instructions on setting up a vLLM service, refer to the [official vLLM documentation](https://docs.vllm.ai/en/latest/getting_started/installation.html). To verify vLLM service availability:

    ```bash
    # Replace YOUR_VLLM_ENDPOINT_URL with the actual URL (e.g., http://<service-ip>:<port>/v1/rerank)
    # Replace 'BAAI/bge-reranker-base' if you deployed a different model
    
    curl -X 'POST' \
      'YOUR_VLLM_ENDPOINT_URL' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "model": "BAAI/bge-reranker-base",
      "query": "What is the capital of France?",
      "documents": [
        "The capital of Brazil is Brasilia.",
        "The capital of France is Paris.",
        "Horses and cows are both animals"
      ]
    }'
    ```

    A successful response should return the documents ranked by relevance scores, similar to the OpenAI rerank API response.

    Refer to the [vLLM OpenAI Compatible Server documentation](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api) for more server arguments and options.

## Create a vLLM ranker function

To use vLLM Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="http://localhost:19530"  # Replace with your Milvus server URI
)

# Create a vLLM Ranker function
vllm_ranker = Function(
    name="vllm_semantic_ranker",    # Choose a descriptive name
    input_field_names=["document"],  # Field containing text to rerank
    function_type=FunctionType.RERANK,  # Must be RERANK
    params={
        "reranker": "model",        # Specifies model-based reranking
        "provider": "vllm",         # Specifies vLLM service
        "queries": ["renewable energy developments"],  # Query text
        "endpoint": "http://localhost:8080",  # vLLM service address
        "maxBatch": 64,              # Optional: batch size
        "truncate_prompt_tokens": 256,  # Optional: Use last 256 tokens
    }
)
```

### vLLM ranker-specific parameters

The following parameters are specific to the vLLM ranker:

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
     <th><p>Value / Example</p></th>
   </tr>
   <tr>
     <td><p><code>truncate_prompt_tokens</code></p></td>
     <td><p>No</p></td>
     <td><p>If set to an integer <em>k</em>, will use only the last <em>k</em> tokens from the prompt (i.e., left truncation). Defaults to None (i.e., no truncation).</p></td>
     <td><p><code>256</code></p></td>
   </tr>
</table>

<div class="alert note">

For general parameters shared across all model rankers (e.g., `provider`, `queries`), refer to [Create a model ranker](model-ranker-overview.md#Create-a-model-ranker).

</div>

## Apply to standard vector search

To apply vLLM Ranker to a standard vector search:

```python
# Execute search with vLLM reranking
results = client.search(
    collection_name="your_collection",
    data=["AI Research Progress", "What is AI"],  # Search queries
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=vllm_ranker,                         # Apply vLLM reranking
    consistency_level="Bounded"
)
```

## Apply to hybrid search

vLLM Ranker can also be used with hybrid search to combine dense and sparse retrieval methods:

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
    ranker=vllm_ranker,                        # Apply vLLM reranking to combined results
    #  highlight-next-line
    limit=5,                                   # Final number of results
    output_fields=["document"]
)
```