---
id: embed-with-bgm-m3.md
order: 4
summary: BGE-M3 is named for its capabilities in Multi-Linguality, Multi-Functionality, and Multi-Granularity.
title: BGE M3
---

# BGE M3

[BGE-M3](https://arxiv.org/abs/2402.03216) is named for its capabilities in Multi-Linguality, Multi-Functionality, and Multi-Granularity. Capable of supporting over 100 languages, BGE-M3 sets new benchmarks in multi-lingual and cross-lingual retrieval tasks. Its unique ability to perform dense retrieval, multi-vector retrieval, and sparse retrieval within a single framework makes it an ideal choice for a wide range of information retrieval (IR) applications.

Milvus integrates with the BGE M3 model using the __BGEM3EmbeddingFunction__ class. This class handles the computation of embeddings and returns them in a format compatible with Milvus for indexing and searching. To use this feature, FlagEmbedding must be installed.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the __BGEM3EmbeddingFunction__:

```python
from pymilvus.model.hybrid import BGEM3EmbeddingFunction

bge_m3_ef = BGEM3EmbeddingFunction(
    model_name='BAAI/bge-m3', # Specify the model name
    device='cpu', # Specify the device to use, e.g., 'cpu' or 'cuda:0'
    use_fp16=False # Specify whether to use fp16. Set to `False` if `device` is `cpu`.
)
```

__Parameters__:

- __model_name__ (_string_)

    The name of the model to use for encoding. The value defaults to __BAAI/bge-m3__.

- __device__ (_string_)

    The device to use, with __cpu__ for the CPU and __cuda:n__ for the nth GPU device.

- __use_fp16__ (_bool_)

    Whether to utilize 16-bit floating-point precision (fp16). Specify __False__ when __device__ is __cpu__.

To create embeddings for documents, use the __encode_documents()__ method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = bge_m3_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension of dense embeddings
print("Dense document dim:", bge_m3_ef.dim["dense"], docs_embeddings["dense"][0].shape)
# Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse document dim:", bge_m3_ef.dim["sparse"], list(docs_embeddings["sparse"])[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: {'dense': [array([-0.02505937, -0.00142193,  0.04015467, ..., -0.02094924,
        0.02623661,  0.00324098], dtype=float32), array([ 0.00118463,  0.00649292, -0.00735763, ..., -0.01446293,
        0.04243685, -0.01794822], dtype=float32), array([ 0.00415287, -0.0101492 ,  0.0009811 , ..., -0.02559666,
        0.08084674,  0.00141647], dtype=float32)], 'sparse': <3x250002 sparse array of type '<class 'numpy.float32'>'
        with 43 stored elements in Compressed Sparse Row format>}
Dense document dim: 1024 (1024,)
Sparse document dim: 250002 (1, 250002)
```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = bge_m3_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension of dense embeddings
print("Dense query dim:", bge_m3_ef.dim["dense"], query_embeddings["dense"][0].shape)
# Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse query dim:", bge_m3_ef.dim["sparse"], list(query_embeddings["sparse"])[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: {'dense': [array([-0.02024024, -0.01514386,  0.02380808, ...,  0.00234648,
       -0.00264978, -0.04317448], dtype=float32), array([ 0.00648045, -0.0081542 , -0.02717067, ..., -0.00380103,
        0.04200587, -0.01274772], dtype=float32)], 'sparse': <2x250002 sparse array of type '<class 'numpy.float32'>'
        with 14 stored elements in Compressed Sparse Row format>}
Dense query dim: 1024 (1024,)
Sparse query dim: 250002 (1, 250002)
```
