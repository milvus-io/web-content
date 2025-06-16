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

- **ValueError**

    This exception will be raised when you specify multiple embedding types or use the `int8` or `uint8` data type for CohereEmbeddingFunction initialization.

## Examples

```python
from pymilvus.model.dense import CohereEmbeddingFunction

cohere_ef = CohereEmbeddingFunction(
    model_name="embed-english-light-v3.0",
    api_key=COHERE_API_KEY,
    input_type="search_document",
    embedding_types=["float"]
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = cohere_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", cohere_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([-1.33361816e-02,  9.79423523e-04, -7.28759766e-02, -1.93786621e-02,
#        -9.71679688e-02,  4.34875488e-02, -9.81445312e-02,  1.16882324e-01,
#         5.89904785e-02, -4.19921875e-02,  4.95910645e-02,  5.83496094e-02,
#         3.47595215e-02, -5.87463379e-03, -7.30514526e-03,  2.92816162e-02,
# ...
#         0.00749969, -0.01192474,  0.02719116,  0.03347778,  0.07696533,
#         0.01409149,  0.00964355, -0.01681519, -0.0073204 ,  0.00043154,
#        -0.04577637,  0.03591919, -0.02807617, -0.04812622], dtype=float32)]
# Dim 384 (384,)
```
