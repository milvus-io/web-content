---
id: embed-with-model2vec.md
order: 14
summary: Milvus integrates with Model2Vec's models via the Model2VecEmbeddingFunction class.
title: Model2Vec
---

# Model2Vec
[Model2Vec](https://github.com/MinishLab/model2vec) is a lightweight and high-performance embedding technique that transforms Sentence Transformer models into compact, static models. It reduces model size by up to 50x and speeds up inference by up to 500x, with minimal performance loss. Model2Vec is ideal when you have resource-constrained devices.

Milvus integrates with Model2Vec's models via the __Model2VecEmbeddingFunction__ class. This class provides methods for encoding documents and queries using the pretrained Model2Vec models and returning the embeddings as dense vectors compatible with Milvus indexing.

It supports both loading models from the Hugging Face Hub and uploading local Model2Vec models, offering flexibility for deployment in various environments.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the __Model2VecEmbeddingFunction__:

```python
from pymilvus import model

model2vec_ef = model.dense.Model2VecEmbeddingFunction(
    model_source='minishlab/potion-base-8M', # or local directory
)
```

__Parameters__:

- __model_source__ (_string_)

    Specifies the source of the Model2Vec model to be used for generating embeddings. It supports two methods of loading models:  

  1. **Loading from Hugging Face Hub (Recommended):**  
     - Provide the model name as a string (e.g., `"minishlab/potion-base-8M"`).
     - Model options are listed as follows:
       -   `minishlab/potion-base-8M` (Default)  
       - `minishlab/potion-base-4M`
       - `minishlab/potion-base-2M`  
       - `minishlab/potion-base-32M`  
       - `minishlab/potion-retrieval-32M`  

  2. **Loading Locally:**  
     - Provide the local file path where the Model2Vec model is stored (e.g., `"/path/to/local/model"`).  
  




To create embeddings for documents, use the __encode_documents()__ method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = model2vec_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", model2vec_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 0.02220882,  0.11436888, -0.15094341,  0.08149259,  0.20425692,
       -0.15727402, -0.25320682, -0.00669029,  0.03157463,  0.08974048,
       -0.00148778, -0.01803541,  0.00230828, -0.0137875 , -0.19242321,
...
       -7.29782460e-03, -2.15345751e-02, -4.13905866e-02,  3.70773636e-02,
        5.45082428e-02,  1.36436718e-02,  1.38598625e-02,  3.91175086e-03],
      dtype=float32)]
Dim: 256 (256,)

```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = model2vec_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim", model2vec_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-1.87109038e-02, -2.81724217e-03, -1.67356253e-01, -5.30372337e-02,
        1.08304240e-01, -1.09269567e-01, -2.53464818e-01, -1.77880954e-02,
        3.05427872e-02,  1.68244764e-01, -7.25950347e-03, -2.52178032e-02,
...
        8.60440824e-03,  2.12906860e-03,  1.50156394e-02, -1.29304864e-02,
       -3.66544276e-02,  5.01735881e-03, -1.53137008e-02,  9.57900891e-04],
      dtype=float32)]
Dim 256 (256,)
```
