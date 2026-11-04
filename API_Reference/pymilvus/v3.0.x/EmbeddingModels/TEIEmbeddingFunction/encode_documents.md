# encode_documents()

This operation takes in documents and encodes them into vector embeddings.

## Request Syntax

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

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = tei_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", tei_ef.dim, docs_embeddings[0].shape)
```
