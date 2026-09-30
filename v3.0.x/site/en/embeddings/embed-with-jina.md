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
    model_name="jina-embeddings-v3", # Defaults to `jina-embeddings-v3`
    api_key=JINAAI_API_KEY, # Provide your Jina AI API key
    task="retrieval.passage", # Specify the task
    dimensions=1024, # Defaults to 1024
)
```

__Parameters__:

- `model_name` (*string*)
  
  The name of the Jina AI embedding model to use for encoding. You can specify any of the available Jina AI embedding model names, for example, `jina-embeddings-v3`, `jina-embeddings-v2-base-en`, etc. If you leave this parameter unspecified, `jina-embeddings-v3` will be used. For a list of available models, refer to [Jina Embeddings](https://jina.ai/embeddings).

- `api_key` (*string*)
  
  The API key for accessing the Jina AI API.

- `task` (*string*)

  The type of input passed to the model. Required for embedding models v3 and higher.

  - `"retrieval.passage"`: Used to encode large documents in retrieval tasks at indexing time.
  - `"retrieval.query"`: Used to encode user queries or questions in retrieval tasks.
  - `"classification"`: Used to encode text for text classification tasks.
  - `"text-matching"`: Used to encode text for similarity matching, such as measuring similarity between two sentences.
  - `"clustering"`: Used for clustering or reranking tasks.

- `dimensions` (*int*)

  The number of dimensions the resulting output embeddings should have. Defaults to 1024. Only supported for embedding models v3 and higher. 

- `late_chunking` (*bool*)

  This parameter controls whether to use the new chunking method [Jina AI introduced last month](https://arxiv.org/abs/2409.04701) for encoding a batch of sentences. Defaults to `False`. When set to `True`, Jina AI API will concatenate all sentences in the input field and feed them as a single string to the model. Internally, the model embeds this long concatenated string and then performs late chunking, returning a list of embeddings that matches the size of the input list. 

To create embeddings for documents, use the `encode_documents()` method. This method is designed for documents embeddings in asymmetric retrieval tasks, such as indexing documents for search or recommendation tasks. This method uses `retrieval.passage` as the task.

```python:

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
Embeddings: [array([9.80641991e-02, -8.51697400e-02,  7.36531913e-02,  1.42558888e-02,
       -2.23589484e-02,  1.68494112e-03, -3.50753777e-02, -3.11530549e-02,
       -3.26012149e-02,  5.04568312e-03,  3.69836427e-02,  3.48948985e-02,
        8.19722563e-03,  5.88679723e-02, -6.71099266e-03, -1.82369724e-02,
...
        2.48654783e-02,  3.43279652e-02, -1.66154150e-02, -9.90478322e-03,
       -2.96043139e-03, -8.57473817e-03, -7.39028037e-04,  6.25024503e-03,
       -1.08831357e-02, -4.00776342e-02,  3.25369164e-02, -1.42691191e-03])]
Dim: 1024 (1024,)
```

To create embeddings for queries, use the `encode_queries()` method. This method is designed for query embeddings in asymmetric retrieval tasks, such as search queries or questions. This method uses `retrieval.query` as the task.

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = jina_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", jina_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([8.79201014e-03,  1.47551354e-02,  4.02722731e-02, -2.52991207e-02,
        1.12719582e-02,  3.75947170e-02,  3.97946090e-02, -7.36681819e-02,
       -2.17952449e-02, -1.16298944e-02, -6.83426252e-03, -5.12507409e-02,
        5.26071340e-02,  6.75181448e-02,  3.92445624e-02, -1.40817231e-02,
...
        8.81703943e-03,  4.24629413e-02, -2.32944116e-02, -2.05193572e-02,
       -3.22035812e-02,  2.81896023e-03,  3.85326855e-02,  3.64372656e-02,
       -1.65050142e-02, -4.26847413e-02,  2.02664156e-02, -1.72684863e-02])]
Dim 1024 (1024,)
```

To create embeddings of inputs for similarity matching (such as STS or symmetric retrieval tasks), text classification, clustering, or reranking tasks, use the appropriate `task` parameter value when instantiating the `JinaEmbeddingFunction` class.


```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name="jina-embeddings-v3", # Defaults to `jina-embeddings-v3`
    api_key=JINA_API_KEY, # Provide your Jina AI API key
    task="text-matching",
    dimensions=1024, # Defaults to 1024
)

texts = [
    "Follow the white rabbit.",  # English
    "Sigue al conejo blanco.",  # Spanish
    "Suis le lapin blanc.",  # French
    "跟着白兔走。",  # Chinese
    "اتبع الأرنب الأبيض.",  # Arabic
    "Folge dem weißen Kaninchen.",  # German
]

embeddings = jina_ef(texts)

# Compute similarities
print(embeddings[0] @ embeddings[1].T)
```
