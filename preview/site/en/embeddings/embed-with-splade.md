---
id: embed-with-splade.md
order: 6
summary: This article describes how to use the SpladeEmbeddingFunction to encode documents and queries using the SPLADE model.
title: SPLADE
---

# SPLADE

[SPLADE](https://arxiv.org/abs/2109.10086) embedding is a model that offers highly sparse representations for documents and queries, inheriting desirable properties from bag-of-words (BOW) models such as exact term matching and efficiency.

Milvus integrates with the SPLADE model via the __SpladeEmbeddingFunction__ class. This class provides methods for encoding documents and queries and returning the embeddings as sparse vectors compatible with Milvus indexing.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

To instantiate the __SpladeEmbeddingFunction__, use the command:

```python
from pymilvus import model

splade_ef = model.sparse.SpladeEmbeddingFunction(
    model_name="naver/splade-cocondenser-selfdistil", 
    device="cpu"
)
```

__Parameters__:

- __model_name__ (_string_)

    The name of the SPLADE model to use for encoding. Valid options are __naver/splade-cocondenser-ensembledistil__ (default), __naver/splade_v2_max__, __naver/splade_v2_distil__, and __naver/splade-cocondenser-selfdistil__. For more information, refer to [Play with models](https://github.com/naver/splade?tab=readme-ov-file#playing-with-the-model).

- __device__ (_string_)

    The device to use, with __cpu__ for the CPU and __cuda:n__ for the nth GPU device.

To create embeddings for documents, use the __encode_documents()__ method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = splade_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", splade_ef.dim, list(docs_embeddings)[0].shape)
```

The expected output is similar to the following:

```python
Embeddings:   (0, 2001) 0.6392706036567688
  (0, 2034) 0.024093208834528923
  (0, 2082) 0.3230178654193878
...
  (2, 23602)    0.5671860575675964
  (2, 26757)    0.5770265460014343
  (2, 28639)    3.1990697383880615
Sparse dim: 30522 (1, 30522)
```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = splade_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", splade_ef.dim, list(query_embeddings)[0].shape)
```

The expected output is similar to the following:

```python
Embeddings:   (0, 2001)        0.6353746056556702
  (0, 2194)        0.015553371049463749
  (0, 2301)        0.2756537199020386
...
  (1, 18522)        0.1282549500465393
  (1, 23602)        0.13133203983306885
  (1, 28639)        2.8150033950805664
Sparse dim: 30522 (1, 30522)
```
