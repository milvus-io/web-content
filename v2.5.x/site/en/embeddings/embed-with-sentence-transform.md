---
id: embed-with-sentence-transform.md
order: 3
summary: This article demonstrates how to use Sentence Transformers in Milvus to encode documents and queries into dense vectors.
title: Sentence Transformers
---

# Sentence Transformers

Milvus integrates with [Sentence Transformer](https://www.sbert.net/docs/pretrained_models.html#model-overview) pre-trained models via the __SentenceTransformerEmbeddingFunction__ class. This class provides methods for encoding documents and queries using the pretrained Sentence Transformer models and returning the embeddings as dense vectors compatible with Milvus indexing.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the __SentenceTransformerEmbeddingFunction__:

```python
from pymilvus import model

sentence_transformer_ef = model.dense.SentenceTransformerEmbeddingFunction(
    model_name='all-MiniLM-L6-v2', # Specify the model name
    device='cpu' # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```

__Parameters__:

- __model_name__ (_string_)

    The name of the Sentence Transformer model to use for encoding. The value defaults to __all-MiniLM-L6-v2__. You can use any of Sentence Transformers' pre-trained models. For a list of available models, refer to [Pretrained models](https://www.sbert.net/docs/pretrained_models.html).

- __device__ (_string_)

    The device to use, with __cpu__ for the CPU and __cuda:n__ for the nth GPU device.

To create embeddings for documents, use the __encode_documents()__ method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = sentence_transformer_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", sentence_transformer_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-3.09392996e-02, -1.80662833e-02,  1.34775648e-02,  2.77156215e-02,
       -4.86349640e-03, -3.12581174e-02, -3.55921760e-02,  5.76934684e-03,
        2.80773244e-03,  1.35783911e-01,  3.59678417e-02,  6.17732145e-02,
...
       -4.61330153e-02, -4.85207550e-02,  3.13997865e-02,  7.82178566e-02,
       -4.75336798e-02,  5.21207601e-02,  9.04406682e-02, -5.36676683e-02],
      dtype=float32)]
Dim: 384 (384,)
```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = sentence_transformer_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim:", sentence_transformer_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-2.52114702e-02, -5.29330298e-02,  1.14570223e-02,  1.95571519e-02,
       -2.46500354e-02, -2.66519729e-02, -8.48201662e-03,  2.82961670e-02,
       -3.65092754e-02,  7.50745758e-02,  4.28900979e-02,  7.18822703e-02,
...
       -6.76431581e-02, -6.45996556e-02, -4.67132553e-02,  4.78532910e-02,
       -2.31596199e-03,  4.13446948e-02,  1.06935494e-01, -1.08258888e-01],
      dtype=float32)]
Dim: 384 (384,)
```

