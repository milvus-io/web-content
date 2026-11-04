# encode_queries()

This operation takes in queries and encodes them into vector embeddings.

## Request Syntax

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

**EXCEPTIONS:**

- **RuntimeError**

    This exception will be raised when the response from the TEI service does not contain the `data` key.

**EXCEPTIONS:**

- **ValueError**

    This exception will be raised when an unsupported operation is attempted on the embedding object.

## Example

```python
from pymilvus.model.dense import TEIEmbeddingFunction

tei_ef = TEIEmbeddingFunction(
    api_url="http://localhost:8080", # Replace with the URL of your TEI service
)

queries = [
    "What event in 1956 marked the official birth of artificial intelligence as a discipline?",
]

query_embeddings = tei_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim:", tei_ef.dim, query_embeddings[0].shape)
```
