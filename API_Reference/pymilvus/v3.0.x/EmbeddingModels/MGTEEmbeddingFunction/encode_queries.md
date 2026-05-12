# encode_queries()

This operation takes in a list of query strings and encodes each query into a vector embedding.

## Request syntax

```python
encode_queries(
    queries: List[str], 
) -> Dict
```

**PARAMETERS:**

- **queries** (*List[str]*)

    A list of string values, where each string represents a query that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

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

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print(ef.dim)

# Embeddings: {'dense': [tensor([ 6.5883e-03, -7.9415e-03, -3.3669e-02, -2.6450e-02,  1.4345e-02,
#          1.9612e-02, -8.1679e-02,  5.6361e-02,  6.9020e-02,  1.9827e-02,
#         -9.2933e-03, -1.9995e-02, -1.0055e-01, -5.4053e-02, -8.5991e-02,
#          8.3004e-02,  1.0870e-01,  1.1565e-01,  2.1268e-02, -1.3782e-02,
#         ...
#          3.2847e-02, -2.3751e-02,  3.4475e-02,  5.3623e-02, -3.3894e-02,
#          7.9408e-02,  8.2720e-03, -2.3459e-02], device='mps:0')], 'sparse': <Compressed Sparse Row sparse array of dtype 'float64'
#         with 13 stored elements and shape (2, 250002)>}

# {'dense': 768, 'sparse': 250002}
```
