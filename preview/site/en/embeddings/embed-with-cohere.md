---
id: embed-with-cohere.md
order: 9
summary: This article describes how to use the CohereEmbeddingFunction to encode documents and queries using the Cohere embedding model.
title: Embed Cohere
---

# Cohere

Cohere's embedding models are used to generate text embeddings, which are lists of floating-point numbers that capture semantic information about the text. These embeddings can be used for tasks like text classification and semantic search.

Milvus integrates with Cohere's embedding models using the `CohereEmbeddingFunction` class. This class handles the computation of embeddings and returns them in a format compatible with Milvus for indexing and searching.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the `CohereEmbeddingFunction`:

```python
cohere_ef = CohereEmbeddingFunction(
    model_name="embed-english-light-v3.0",
    api_key="YOUR_COHERE_API_KEY",
    input_type="search_document",
    embedding_types=["float"]
)
```

__Parameters__:

- `model_name` (*string*)
  
  The name of the Cohere embedding model to use for encoding. You can specify any of the available Cohere embedding model names, for example, `embed-english-v3.0`, `embed-multilingual-v3.0`, etc. If you leave this parameter unspecified, `embed-english-light-v3.0` will be used. For a list of available models, refer to [Embed](https://docs.cohere.com/docs/models#embed).

- `api_key` (*string*)
  
  The API key for accessing the Cohere API.

- `input_type` (*string*)

  The type of input passed to the model. Required for embedding models v3 and higher.

  - `"search_document"`: Used for embeddings stored in a vector database for search use-cases.
  - `"search_query"`: Used for embeddings of search queries run against a vector DB to find relevant documents.
  - `"classification"`: Used for embeddings passed through a text classifier.
  - `"clustering"`: Used for the embeddings run through a clustering algorithm.

- `embedding_types` (*List[str]*)

  The type of embeddings you want to get back. Not required and default is None, which returns the Embed Floats response type. Currently, you can only specify a single value for this parameter. Possible values:

  - `"float"`: Use this when you want to get back the default float embeddings. Valid for all models.
  - `"binary"`: Use this when you want to get back signed binary embeddings. Valid for only v3 models.
  - `"ubinary"`: Use this when you want to get back unsigned binary embeddings. Valid for only v3 models.

To create embeddings for documents, use the `encode_documents()` method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = cohere_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", cohere_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 3.43322754e-02,  1.16252899e-03, -5.25207520e-02,  1.32846832e-03,
       -6.80541992e-02,  6.10961914e-02, -7.06176758e-02,  1.48925781e-01,
        1.54174805e-01,  1.98516846e-02,  2.43835449e-02,  3.55224609e-02,
        1.82952881e-02,  7.57446289e-02, -2.40783691e-02,  4.40063477e-02,
...
        0.06359863, -0.01971436, -0.02253723,  0.00354195,  0.00222015,
        0.00184727,  0.03408813, -0.00777817,  0.04919434,  0.01519775,
       -0.02862549,  0.04760742, -0.07891846,  0.0124054 ], dtype=float32)]
Dim: 384 (384,)
```

To create embeddings for queries, use the `encode_queries()` method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = cohere_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", cohere_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-1.33361816e-02,  9.79423523e-04, -7.28759766e-02, -1.93786621e-02,
       -9.71679688e-02,  4.34875488e-02, -9.81445312e-02,  1.16882324e-01,
        5.89904785e-02, -4.19921875e-02,  4.95910645e-02,  5.83496094e-02,
        3.47595215e-02, -5.87463379e-03, -7.30514526e-03,  2.92816162e-02,
...
        0.00749969, -0.01192474,  0.02719116,  0.03347778,  0.07696533,
        0.01409149,  0.00964355, -0.01681519, -0.0073204 ,  0.00043154,
       -0.04577637,  0.03591919, -0.02807617, -0.04812622], dtype=float32)]
Dim 384 (384,)
```
