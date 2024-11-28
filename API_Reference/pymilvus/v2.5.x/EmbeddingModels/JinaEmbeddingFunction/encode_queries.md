# encode_queries()

This operation takes in a list of query strings and encodes each query into a vector embedding.

## Request syntax

```python
encode_queries(
    queries: List[str], 
) -> List[np.array]
```

**PARAMETERS:**

- **queries** (*List[str]*)

    A list of string values, where each string represents a query that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*List[np.array]*

**RETURNS:**

A list where each element is a NumPy array.

**Exceptions:**

- **RuntimeError**

    This exception will be raised when the response from the Jina API does not contain the `data` key.

## Examples

```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name="jina-embeddings-v2-base-en", # Defaults to `jina-embeddings-v2-base-en`
    api_key="YOUR_JINAAI_API_KEY" # Provide your Jina AI API key
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = jina_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", jina_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([-5.99164660e-01, -3.49827350e-01,  8.22405160e-01, -1.18632730e-01,
#         5.78107540e-01,  1.09789170e-01,  2.91604200e-01, -3.29306450e-01,
#         2.93779640e-01, -2.17880800e-01, -6.84535440e-01, -3.79752000e-01,
#        -3.47541800e-01,  9.20846100e-02, -6.13804400e-01,  6.31312800e-01,
# ...
#        -1.84993740e-02,  9.38629150e-01,  2.74858470e-02,  1.09396360e+00,
#         3.96270750e-01,  7.44445800e-01, -1.95404050e-01, -6.08383200e-01,
#        -3.75076300e-01,  3.87512200e-01,  8.11889650e-01, -3.76407620e-01])]
# Dim 768 (768,)
```
