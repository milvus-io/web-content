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

- **ValueError**

    This exception will be raised when you specify multiple embedding types or use the `int8` or `uint8` data type for CohereEmbeddingFunction initialization.

## Examples

```python
from pymilvus.model.dense import CohereEmbeddingFunction

cohere_ef = CohereEmbeddingFunction(
    model_name="embed-english-light-v3.0",
    api_key="YOUR_COHERE_API_KEY",
    input_type="search_document",
    embedding_types=["float"]
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = cohere_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", cohere_ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([ 3.43322754e-02,  1.16252899e-03, -5.25207520e-02,  1.32846832e-03,
#        -6.80541992e-02,  6.10961914e-02, -7.06176758e-02,  1.48925781e-01,
#         1.54174805e-01,  1.98516846e-02,  2.43835449e-02,  3.55224609e-02,
#         1.82952881e-02,  7.57446289e-02, -2.40783691e-02,  4.40063477e-02,
# ...
#         0.06359863, -0.01971436, -0.02253723,  0.00354195,  0.00222015,
#         0.00184727,  0.03408813, -0.00777817,  0.04919434,  0.01519775,
#        -0.02862549,  0.04760742, -0.07891846,  0.0124054 ], dtype=float32)]
# Dim: 384 (384,)
```
