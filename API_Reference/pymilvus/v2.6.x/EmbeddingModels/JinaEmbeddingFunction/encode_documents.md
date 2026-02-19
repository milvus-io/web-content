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

- **RuntimeError**

    This exception will be raised when the response from the Jina API does not contain the `data` key.

## Examples

```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name="jina-embeddings-v2-base-en", # Defaults to `jina-embeddings-v2-base-en`
    api_key="YOUR_JINAAI_API_KEY" # Provide your Jina AI API key
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = jina_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", jina_ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([-4.88487840e-01, -4.28095880e-01,  4.90086500e-01, -1.63274320e-01,
#         3.43437800e-01,  3.21476880e-01,  2.83173790e-02, -3.10403670e-01,
#         4.76985040e-01, -1.77410420e-01, -3.84803180e-01, -2.19224200e-01,
#        -2.52898000e-01,  6.62411900e-02, -8.58173100e-01,  1.05221800e+00,
# ...
#        -2.04462400e-01,  7.14229800e-01, -1.66823000e-01,  8.72551440e-01,
#         5.53560140e-01,  8.92506300e-01, -2.39408610e-01, -4.22413560e-01,
#        -3.19551350e-01,  5.59153850e-01,  2.44338100e-01, -8.60452100e-01])]
# Dim: 768 (768,)
```
