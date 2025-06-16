# \_\_call\_\_()

This operation in [VoyageEmbeddingFunction](VoyageEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of VoyageEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created

voyage_ef = VoyageEmbeddingFunction()

# __call__ method will be called
voyage_ef(
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

voyage_ef(docs)

# [array([ 0.02582654, -0.00907086, -0.04604037, ..., -0.01227521,
#          0.04420955, -0.00038829]),
#  array([ 0.03844212, -0.01597065, -0.03728884, ..., -0.02118733,
#          0.03349845,  0.0065346 ]),
#  array([ 0.05143557, -0.01096631, -0.02690451, ..., -0.02416254,
#          0.07658645,  0.03064499])]
```
