---
id: embed-with-mgte.md
order: 13
summary: This article describes how to use the MGTEEmbeddingFunction to encode documents and queries using the mGTE embedding model.
title: mGTE
---

# mGTE

mGTE is a multilingual text representation model and reranking model for text retrieval tasks.

Milvus integrates with the mGTE embedding model via the MGTEEmbeddingFunction class. This class provides methods for encoding documents and queries using the mGTE embedding model and returning the embeddings as dense and sparse vectors compatible with Milvus indexing.

To use this feature, install the necessary dependencies:

```python
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the MGTEEmbeddingFunction:

```python
from pymilvus.model.hybrid import MGTEEmbeddingFunction

ef = MGTEEmbeddingFunction(
    model_name="Alibaba-NLP/gte-multilingual-base", # Defaults to `Alibaba-NLP/gte-multilingual-base`
)
```

**Parameters**:

- `model_name` (*string*)
  
  The name of the mGTE embedding model to use for encoding. The value defaults to `Alibaba-NLP/gte-multilingual-base`.

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
# Print dimension of embeddings
print(ef.dim)
```

The expected output is similar to the following:

```python
Embeddings: {'dense': [tensor([-4.9149e-03, 1.6553e-02, -9.5524e-03, -2.1800e-02, 1.2075e-02,
        1.8500e-02, -3.0632e-02, 5.5909e-02, 8.7365e-02, 1.8763e-02,
        2.1708e-03, -2.7530e-02, -1.1523e-01, 6.5810e-03, -6.4674e-02,
        6.7966e-02, 1.3005e-01, 1.1942e-01, -1.2174e-02, -4.0426e-02,
        ...
        2.0129e-02, -2.3657e-02, 2.2626e-02, 2.1858e-02, -1.9181e-02,
        6.0706e-02, -2.0558e-02, -4.2050e-02], device='mps:0')], 
 'sparse': <Compressed Sparse Row sparse array of dtype 'float64'
 with 41 stored elements and shape (3, 250002)>}

{'dense': 768, 'sparse': 250002}
```

To create embeddings for queries, use the `encode_queries()` method:

```python
queries = ["When was artificial intelligence founded",
           "Where was Alan Turing born?"]

query_embeddings = ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print(ef.dim)
```

The expected output is similar to the following:

```python
Embeddings: {'dense': [tensor([ 6.5883e-03, -7.9415e-03, -3.3669e-02, -2.6450e-02, 1.4345e-02,
        1.9612e-02, -8.1679e-02, 5.6361e-02, 6.9020e-02, 1.9827e-02,
       -9.2933e-03, -1.9995e-02, -1.0055e-01, -5.4053e-02, -8.5991e-02,
        8.3004e-02, 1.0870e-01, 1.1565e-01, 2.1268e-02, -1.3782e-02,
        ...
        3.2847e-02, -2.3751e-02, 3.4475e-02, 5.3623e-02, -3.3894e-02,
        7.9408e-02, 8.2720e-03, -2.3459e-02], device='mps:0')], 
 'sparse': <Compressed Sparse Row sparse array of dtype 'float64'
 with 13 stored elements and shape (2, 250002)>}

{'dense': 768, 'sparse': 250002}
```
