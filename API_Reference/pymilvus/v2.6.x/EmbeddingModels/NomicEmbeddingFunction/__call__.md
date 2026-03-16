# \_\_call\_\_()

This operation in [NomicEmbeddingFunction](NomicEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of NomicEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created

ef = NomicEmbeddingFunction()

# __call__ method will be called
ef(
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

*None*

## Examples

```python
from pymilvus.model.dense import NomicEmbeddingFunction

ef = NomicEmbeddingFunction(
    model_name="nomic-embed-text-v1.5", # Defaults to `mistral-embed`
    api_key="NOMIC_API_KEY" # Provide your Nomic API key
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

ef(docs)

# [array([ 5.59997560e-02,  7.23266600e-02, -1.51977540e-01, -4.53491200e-02,
#         6.49414060e-02,  4.33654800e-02,  2.26593020e-02, -3.51867680e-02,
#         3.49998470e-03,  1.75571440e-03, -4.30297850e-03,  1.81274410e-02,
#         ...
#        -1.64337160e-02, -3.85437000e-02,  6.14318850e-02, -2.82745360e-02,
#        -7.25708000e-02, -4.15563580e-04, -7.63320900e-03,  1.88446040e-02,
#        -5.78002930e-02,  1.69830320e-02, -8.91876200e-03, -2.37731930e-02])]
```
