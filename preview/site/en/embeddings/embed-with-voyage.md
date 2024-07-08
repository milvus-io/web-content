---
id: embed-with-voyage.md
order: 7
summary: This article describes how to use the VoyageEmbeddingFunction to encode documents and queries using the Voyage model.
title: Embed Voyage
---

# Voyage

Milvus integrates with Voyage's models via the VoyageEmbeddingFunction class. This class provides methods for encoding documents and queries using the Voyage models and returning the embeddings as dense vectors compatible with Milvus indexing. To utilize this functionality, obtain an API key from [Voyage](https://docs.voyageai.com/docs/api-key-and-installation) by creating an account on their platform.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the `VoyageEmbeddingFunction`:

```python
from pymilvus.model.dense import VoyageEmbeddingFunction

voyage_ef = VoyageEmbeddingFunction(
    model_name="voyage-lite-02-instruct", # Defaults to `voyage-2`
    api_key=VOYAGE_API_KEY # Provide your Voyage API key
)
```

__Parameters__:

- `model_name` (string)
  The name of the Voyage model to use for encoding. You can specify any of the available Voyage model names, for example, `voyage-law-2`, `voyage-code-2`, etc. If you leave this parameter unspecified, `voyage-2` will be used. For a list of available models, refer to [Voyage official documentation](https://docs.voyageai.com/docs/embeddings).
- `api_key` (string)
  The API key for accessing the Voyage API. For information on how to create an API key, refer to [API Key and Python Client](https://docs.voyageai.com/docs/api-key-and-installation).

To create embeddings for documents, use the `encode_documents()` method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = voyage_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", voyage_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 0.02582654, -0.00907086, -0.04604037, ..., -0.01227521,
        0.04420955, -0.00038829]), array([ 0.03844212, -0.01597065, -0.03728884, ..., -0.02118733,
        0.03349845,  0.0065346 ]), array([ 0.05143557, -0.01096631, -0.02690451, ..., -0.02416254,
        0.07658645,  0.03064499])]
Dim: 1024 (1024,)
```

To create embeddings for queries, use the `encode_queries()` method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = voyage_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", voyage_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 0.01733501, -0.0230672 , -0.05208827, ..., -0.00957995,
        0.04493361,  0.01485138]), array([ 0.05937521, -0.00729363, -0.02184347, ..., -0.02107683,
        0.05706626,  0.0263358 ])]
Dim 1024 (1024,)
```