# encode_documents()

This operation takes in documents and encodes them into vector embeddings.

## Request syntax

```python
encode_documents(
    documents: List[str], 
) -> List[np.array]
```

**PARAMETERS:**

- **documents** (*List[str]*)

    A list of string values, where each string represents a document that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

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

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = voyage_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", voyage_ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([ 0.03130895,  0.00234866, -0.03993684, ..., -0.01473105,
#         0.03551823, -0.00862956]), array([ 0.0414308 , -0.00795113, -0.03615218, ..., -0.02307944,
#         0.03417618, -0.01015649]), array([ 0.05001092,  0.00222745, -0.02103342, ..., -0.02351113,
#         0.06017989,  0.00644311])]
# Dim: 1024 (1024,)
```
