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

- **ImportError**

    This exception will be raised when the model2vec module is not installed.

## Examples

```python
from pymilvus import model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name="gemini-embedding-exp-03-07",
    api_key="YOUR_API_KEY",
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = gemini_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim:", gemini_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([-0.02066572,  0.02459551,  0.00707774, ...,  0.00259341,
#        -0.01797572, -0.00626168], shape=(3072,)), array([ 0.00674969,  0.03023903,  0.01230692, ...,  0.00160009,
#        -0.01710967,  0.00972728], shape=(3072,))]
# Dim 3072 (3072,)
```

