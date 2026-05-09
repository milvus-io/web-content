---
id: embed-with-nomic.md
order: 12
summary: This article describes how to use the NomicEmbeddingFunction to encode documents and queries using the Nomic embedding model.
title: Nomic
---

# Nomic

[Nomic](https://atlas.nomic.ai/) models are a series of advanced text and image embedding solutions developed by Nomic AI, designed to convert various forms of data into dense numerical vectors that capture their semantic meaning.

Milvus integrates with Nomic's embedding models via the NomicEmbeddingFunction class. This class provides methods for encoding documents and queries using the Nomic embedding models and returning the embeddings as dense vectors compatible with Milvus indexing. To utilize this functionality, obtain an API key from [Nomic Atlas](https://atlas.nomic.ai/).

To use this feature, install the necessary dependencies:

```python
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the NomicEmbeddingFunction:

```python
# Before accessing the Nomic Atlas API, configure your Nomic API token
import nomic
nomic.login('YOUR_NOMIC_API_KEY')

# Import Nomic embedding function
from pymilvus.model.dense import NomicEmbeddingFunction

ef = NomicEmbeddingFunction(
    model_name="nomic-embed-text-v1.5", # Defaults to `mistral-embed`
)
```

**Parameters**:

- `model_name` (*string*)
  
  The name of the Nomic embedding model to use for encoding. The value defaults to `nomic-embed-text-v1.5`. For more information, refer to [Nomic official documentation](https://docs.nomic.ai/atlas/models/image-embedding).

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
Embeddings: [array([ 5.59997560e-02, 7.23266600e-02, -1.51977540e-01, -4.53491200e-02,
        6.49414060e-02, 4.33654800e-02, 2.26593020e-02, -3.51867680e-02,
        3.49998470e-03, 1.75571440e-03, -4.30297850e-03, 1.81274410e-02,
        ...
       -1.64337160e-02, -3.85437000e-02, 6.14318850e-02, -2.82745360e-02,
       -7.25708000e-02, -4.15563580e-04, -7.63320900e-03, 1.88446040e-02,
       -5.78002930e-02, 1.69830320e-02, -8.91876200e-03, -2.37731930e-02])]
Dim: 768 (768,)
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
Embeddings: [array([ 3.24096680e-02, 7.35473600e-02, -1.63940430e-01, -4.45556640e-02,
        7.83081050e-02, 2.64587400e-02, 1.35898590e-03, -1.59606930e-02,
       -3.33557130e-02, 1.05056760e-02, -2.35290530e-02, 2.23388670e-02,
        ...
        7.67211900e-02, 4.54406740e-02, 9.70459000e-02, 4.00161740e-03,
       -3.12805180e-02, -7.05566400e-02, 5.04760740e-02, 5.22766100e-02,
       -3.87878400e-02, -3.03649900e-03, 5.90515140e-03, -1.95007320e-02])]
Dim 768 (768,)
```
