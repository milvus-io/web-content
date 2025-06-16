# \_\_call\_\_()

This operation in [JinaEmbeddingFunction](JinaEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of JinaEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created

jina_ef = JinaEmbeddingFunction()

# __call__ method will be called
jina_ef(
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

jina_ef(docs)

# [array([-4.88487840e-01, -4.28095880e-01,  4.90086500e-01, -1.63274320e-01,
#          3.43437800e-01,  3.21476880e-01,  2.83173790e-02, -3.10403670e-01,
#          4.76985040e-01, -1.77410420e-01, -3.84803180e-01, -2.19224200e-01,
# ...
#          1.09233186e-01, -6.33286400e-01,  4.29109450e-01,  2.58604170e-01,
#         -9.05579500e-01,  2.96900120e-02,  4.06175500e-01,  6.30184400e-01,
#         -2.04462400e-01,  7.14229800e-01, -1.66823000e-01,  8.72551440e-01,
#          5.53560140e-01,  8.92506300e-01, -2.39408610e-01, -4.22413560e-01,
#         -3.19551350e-01,  5.59153850e-01,  2.44338100e-01, -8.60452100e-01])]
```
