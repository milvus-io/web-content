---
id: embed-with-gemini.md
order: 2
summary: Milvus integrates with OpenAI's models via the GeminiEmbeddingFunction class.
title: Gemini
---

# Gemini

Milvus integrates with Gemini's models via the __GeminiEmbeddingFunction__ class. This class provides methods for encoding documents and queries using the pretrained Gemini models and returning the embeddings as dense vectors compatible with Milvus indexing. To utilize this functionality, obtain an API key from [Gemini](https://ai.google.dev/gemini-api/docs/api-key) by creating an account on their platform.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the __GeminiEmbeddingFunction__:

```python
from pymilvus import model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name='gemini-embedding-exp-03-07', # Specify the model name
    api_key='YOUR_API_KEY', # Provide your OpenAI API key
)
```

__Parameters__:

- __model_name__ (_string_)

    The name of the Gemini model to use for encoding. Valid options are __gemini-embedding-exp-03-07__(default), __models/embedding-001__, and __models/text-embedding-004__.

- __api_key__ (_string_)

    The API key for accessing the Gemini API.

- __config__ (_types.EmbedContentConfig_)
    Optional configuration for the embedding model. 
  - The __output_dimensionality__ can be specified to the number of resulting output embeddings.
  - The __task_type__ can be specified to generate optimized embeddings for specific tasks, saving you time and cost and improving performance. Only supported in __gemini-embedding-exp-03-07__ model.
  
| Model Name | Dimensions               |
|------------|--------------------------|
| gemini-embedding-exp-03-07 | 3072(_default_),1536,768 |
| models/embedding-001 | 768                      |
| models/text-embedding-004 | 768                      |

| Task Type | Description |
|-----------|-------------|
| SEMANTIC_SIMILARITY | Used to generate embeddings that are optimized to assess text similarity. |
| CLASSIFICATION | Used to generate embeddings that are optimized to classify texts according to preset labels. |
| CLUSTERING | Used to generate embeddings that are optimized to cluster texts based on their similarities. |
| RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING, and FACT_VERIFICATION | Used to generate embeddings that are optimized for document search or information retrieval. |
| CODE_RETRIEVAL_QUERY | Used to retrieve a code block based on a natural language query, such as sort an array or reverse a linked list. Embeddings of the code blocks are computed using RETRIEVAL_DOCUMENT. |

To create embeddings for documents, use the __encode_documents()__ method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = gemini_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", gemini_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-0.00894029,  0.00573813,  0.013351  , ..., -0.00042766,
       -0.00603091, -0.00341043], shape=(3072,)), array([ 0.00222347,  0.03725113,  0.01152256, ...,  0.01047272,
       -0.01701597,  0.00565377], shape=(3072,)), array([ 0.00661134,  0.00232328, -0.01342973, ..., -0.00514429,
       -0.02374139, -0.00701721], shape=(3072,))]
Dim: 3072 (3072,)
```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = gemini_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim", gemini_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([-0.02066572,  0.02459551,  0.00707774, ...,  0.00259341,
       -0.01797572, -0.00626168], shape=(3072,)), array([ 0.00674969,  0.03023903,  0.01230692, ...,  0.00160009,
       -0.01710967,  0.00972728], shape=(3072,))]
Dim 3072 (3072,)
```
