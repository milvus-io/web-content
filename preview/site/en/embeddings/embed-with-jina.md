---
id: embed-with-jina.md
order: 8
summary: This article describes how to use the JinaEmbeddingFunction to encode documents and queries using the Jina AI embedding model.
title: Jina AI - Embed
---

# Jina AI

Jina AI's embedding models are high-performance text embedding models that can translate textual inputs into numerical representations, capturing the semantics of the text. These models excel in applications like dense retrieval, semantic textual similarity, and multilingual understanding.

Milvus integrates with Jina AI's embedding models via the `JinaEmbeddingFunction` class. This class provides methods for encoding documents and queries using the Jina AI embedding models and returning the embeddings as dense vectors compatible with Milvus indexing. To utilize this functionality, obtain an API key from [Jina AI](https://jina.ai/embeddings/).

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the `JinaEmbeddingFunction`:

```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name="jina-embeddings-v2-base-en", # Defaults to `jina-embeddings-v2-base-en`
    api_key=JINAAI_API_KEY # Provide your Jina AI API key
)
```

__Parameters__:

- `model_name` (*string*)
  
  The name of the Jina AI embedding model to use for encoding. You can specify any of the available Jina AI embedding model names, for example, `jina-embeddings-v2-base-en`, `jina-embeddings-v2-small-en`, etc. If you leave this parameter unspecified, `jina-embeddings-v2-base-en` will be used. For a list of available models, refer to [Jina Embeddings](https://jina.ai/embeddings).

- `api_key` (*string*)
  
  The API key for accessing the Jina AI API.

To create embeddings for documents, use the `encode_documents()` method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = jina_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", jina_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-4.88487840e-01, -4.28095880e-01,  4.90086500e-01, -1.63274320e-01,
        3.43437800e-01,  3.21476880e-01,  2.83173790e-02, -3.10403670e-01,
        4.76985040e-01, -1.77410420e-01, -3.84803180e-01, -2.19224200e-01,
       -2.52898000e-01,  6.62411900e-02, -8.58173100e-01,  1.05221800e+00,
...
       -2.04462400e-01,  7.14229800e-01, -1.66823000e-01,  8.72551440e-01,
        5.53560140e-01,  8.92506300e-01, -2.39408610e-01, -4.22413560e-01,
       -3.19551350e-01,  5.59153850e-01,  2.44338100e-01, -8.60452100e-01])]
Dim: 768 (768,)
```

To create embeddings for queries, use the `encode_queries()` method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = jina_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", jina_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-5.99164660e-01, -3.49827350e-01,  8.22405160e-01, -1.18632730e-01,
        5.78107540e-01,  1.09789170e-01,  2.91604200e-01, -3.29306450e-01,
        2.93779640e-01, -2.17880800e-01, -6.84535440e-01, -3.79752000e-01,
       -3.47541800e-01,  9.20846100e-02, -6.13804400e-01,  6.31312800e-01,
...
       -1.84993740e-02,  9.38629150e-01,  2.74858470e-02,  1.09396360e+00,
        3.96270750e-01,  7.44445800e-01, -1.95404050e-01, -6.08383200e-01,
       -3.75076300e-01,  3.87512200e-01,  8.11889650e-01, -3.76407620e-01])]
Dim 768 (768,)
```
