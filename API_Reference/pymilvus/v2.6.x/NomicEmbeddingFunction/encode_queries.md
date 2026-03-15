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

    This exception will be raised when `api_key` is not provided and the `NOMIC_API_KEY` environment variable is also not set.

## Examples

```python
from pymilvus.model.dense import NomicEmbeddingFunction

ef = NomicEmbeddingFunction(
    model_name="nomic-embed-text-v1.5", # Defaults to `mistral-embed`
    api_key="NOMIC_API_KEY" # Provide your Nomic API key
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", ef.dim, query_embeddings[0].shape)

# Embeddings: [array([ 3.24096680e-02,  7.35473600e-02, -1.63940430e-01, -4.45556640e-02,
#         7.83081050e-02,  2.64587400e-02,  1.35898590e-03, -1.59606930e-02,
#        -3.33557130e-02,  1.05056760e-02, -2.35290530e-02,  2.23388670e-02,
#         ...
#         7.67211900e-02,  4.54406740e-02,  9.70459000e-02,  4.00161740e-03,
#        -3.12805180e-02, -7.05566400e-02,  5.04760740e-02,  5.22766100e-02,
#        -3.87878400e-02, -3.03649900e-03,  5.90515140e-03, -1.95007320e-02])]
# Dim 768 (768,)
```
