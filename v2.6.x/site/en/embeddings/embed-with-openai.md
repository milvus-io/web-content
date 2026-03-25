---
id: embed-with-openai.md
order: 2
summary: Milvus integrates with OpenAI's models via the OpenAIEmbeddingFunction class.
title: OpenAI
---

# OpenAI

Milvus integrates with OpenAI's models via the __OpenAIEmbeddingFunction__ class. This class provides methods for encoding documents and queries using the pretrained OpenAI models and returning the embeddings as dense vectors compatible with Milvus indexing. To utilize this functionality, obtain an API key from [OpenAI](https://openai.com/api/) by creating an account on their platform.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the __OpenAIEmbeddingFunction__:

```python
from pymilvus import model

openai_ef = model.dense.OpenAIEmbeddingFunction(
    model_name='text-embedding-3-large', # Specify the model name
    api_key='YOUR_API_KEY', # Provide your OpenAI API key
    dimensions=512 # Set the embedding dimensionality
)
```

__Parameters__:

- __model_name__ (_string_)

    The name of the OpenAI model to use for encoding. Valid options are __text-embedding-3-small__, __text-embedding-3-large__, and __text-embedding-ada-002__ (default).

- __api_key__ (_string_)

    The API key for accessing the OpenAI API.

- __dimensions__ (_int_)

    The number of dimensions the resulting output embeddings should have. Only supported in __text-embedding-3__ and later models.

To create embeddings for documents, use the __encode_documents()__ method:

```python
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = openai_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", openai_ef.dim, docs_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 1.76741909e-02, -2.04964578e-02, -1.09788161e-02, -5.27223349e-02,
        4.23139781e-02, -6.64533582e-03,  4.21088142e-03,  1.04644023e-01,
        5.10009527e-02,  5.32827862e-02, -3.26061808e-02, -3.66494283e-02,
...
       -8.93232748e-02,  6.68255147e-03,  3.55093405e-02, -5.09071983e-02,
        3.74144339e-03,  4.72541340e-02,  2.11916920e-02,  1.00753829e-02,
       -5.76633997e-02,  9.68257990e-03,  4.62721288e-02, -4.33261096e-02])]
Dim: 512 (512,)
```

To create embeddings for queries, use the __encode_queries()__ method:

```python
queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = openai_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim", openai_ef.dim, query_embeddings[0].shape)
```

The expected output is similar to the following:

```python
Embeddings: [array([ 0.00530251, -0.01907905, -0.01672608, -0.05030033,  0.01635982,
       -0.03169853, -0.0033602 ,  0.09047844,  0.00030747,  0.11853652,
       -0.02870182, -0.01526102,  0.05505067,  0.00993909, -0.07165466,
...
       -9.78106782e-02, -2.22669560e-02,  1.21873049e-02, -4.83198799e-02,
        5.32377362e-02, -1.90469325e-02,  5.62430918e-02,  1.02650477e-02,
       -6.21757433e-02,  7.88027793e-02,  4.91846527e-04, -1.51633881e-02])]
Dim 512 (512,)
```
