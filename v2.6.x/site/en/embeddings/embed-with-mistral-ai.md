---
id: embed-with-mistral-ai.md
order: 11
summary: This article describes how to use the MistralAIEmbeddingFunction to encode documents and queries using the Mistral AI embedding model.
title: Mistral AI
---

# Mistral AI

[Mistral AI](https://mistral.ai/)'s embedding models are text embedding models designed to convert textual inputs into dense numerical vectors, effectively capturing the underlying meaning of the text. These models are highly optimized for tasks such as semantic search, natural language understanding, and context-aware applications, making them suitable for a wide range of AI-powered solutions.

Milvus integrates with Mistral AI's embedding models via the MistralAIEmbeddingFunction class. This class provides methods for encoding documents and queries using the Mistral AI embedding models and returning the embeddings as dense vectors compatible with Milvus indexing. To utilize this functionality, obtain an API key from [Mistral AI](https://console.mistral.ai/).

To use this feature, install the necessary dependencies:

```python
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the MistralAIEmbeddingFunction:

```python
from pymilvus.model.dense import MistralAIEmbeddingFunction

ef = MistralAIEmbeddingFunction(
    model_name="mistral-embed", # Defaults to `mistral-embed`
    api_key="MISTRAL_API_KEY" # Provide your Mistral AI API key
)
```

**Parameters**:

- `model_name` (*string*)
  
  The name of the Mistral AI embedding model to use for encoding. The value defaults to `mistral-embed`. For more information, refer to [Embeddings](https://docs.mistral.ai/capabilities/embeddings/).

- `api_key` (*string*)
  
  The API key for accessing the Mistral AI API.

To create embeddings for documents, use the `encode_documents()` method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-0.06051636, 0.03207397, 0.04684448, ..., -0.01618958,
       0.02442932, -0.01302338]), array([-0.04675293, 0.06512451, 0.04290771, ..., -0.01454926,
       0.0014801 , 0.00686646]), array([-0.05978394, 0.08728027, 0.02217102, ..., -0.00681305,
       0.03634644, -0.01802063])]
Dim: 1024 (1024,)
```

To create embeddings for queries, use the `encode_queries()` method:

```python
queries = ["When was artificial intelligence founded",
           "Where was Alan Turing born?"]

query_embeddings = ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-0.04916382, 0.04568481, 0.03594971, ..., -0.02653503,
       0.02804565, 0.00600815]), array([-0.05938721, 0.07098389, 0.01773071, ..., -0.01708984,
       0.03582764, 0.00366592])]
Dim 1024 (1024,)
```
