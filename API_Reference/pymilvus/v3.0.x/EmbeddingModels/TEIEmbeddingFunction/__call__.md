# \_\_call\_\_()

This operation in [TEIEmbeddingFunction](TEIEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of TEIEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request Syntax

```python
# Instance created

tei_ef = TEIEmbeddingFunction()

# __call__ method will be called
tei_ef(
    texts: List[str]
) -> List[np.array]
```

**PARAMETERS:**

- **texts** (*List[str]*)

    A list of string values, where each string represents text that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

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

tei_ef(docs)
```
