# \_\_call\_\_()

This operation in [MGTEEmbeddingFunction](MGTEEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of MGTEEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created

ef = MGTEEmbeddingFunction()

# __call__ method will be called
ef(
    texts: List[str]
) -> Dict
```

**PARAMETERS:**

- **texts** (*List[str]*)

    A list of string values, where each string represents text that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*Dict*

**RETURNS:**

A dictionary that contains the encoded embeddings, both dense and sparse.

**Exceptions:**

*None*

## Examples

```python
from pymilvus.model.hybrid import MGTEEmbeddingFunction

ef = MGTEEmbeddingFunction()

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

ef(docs)

# {'dense': [tensor([-4.9149e-03,  1.6553e-02, -9.5524e-03, -2.1800e-02,  1.2075e-02,
#          1.8500e-02, -3.0632e-02,  5.5909e-02,  8.7365e-02,  1.8763e-02,
#          2.1708e-03, -2.7530e-02, -1.1523e-01,  6.5810e-03, -6.4674e-02,
#          6.7966e-02,  1.3005e-01,  1.1942e-01, -1.2174e-02, -4.0426e-02,
#          ...
#          2.0129e-02, -2.3657e-02,  2.2626e-02,  2.1858e-02, -1.9181e-02,
#          6.0706e-02, -2.0558e-02, -4.2050e-02], device='mps:0')], 'sparse': <Compressed Sparse Row sparse array of dtype 'float64'
#         with 41 stored elements and shape (3, 250002)>}
```
