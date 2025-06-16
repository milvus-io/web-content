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

    This exception will be raised when the Voyage module is not installed.

## Examples

```python
from pymilvus.model.dense import VoyageEmbeddingFunction

voyage_ef = VoyageEmbeddingFunction(
    model_name="voyage-lite-02-instruct", # Defaults to `voyage-2`
    api_key='YOUR_API_KEY' # Replace with your own Voyage API key
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = voyage_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", voyage_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([ 0.01733501, -0.0230672 , -0.05208827, ..., -0.00957995,
#         0.04493361,  0.01485138]), array([ 0.05937521, -0.00729363, -0.02184347, ..., -0.02107683,
#         0.05706626,  0.0263358 ])]
# Dim 1024 (1024,)
```
