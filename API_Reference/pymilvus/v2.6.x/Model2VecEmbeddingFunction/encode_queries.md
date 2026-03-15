# encode_queries()

This operation takes in a list of query strings and encodes each query into a vector embedding.

## Request syntax

```python
encode_queries(
    queries: List[str], 
) -> List[np.array]
```

**PARAMETERS:**

- **queries** (*List[str]*)

    A list of string values, where each string represents a query that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*List[np.array]*

**RETURNS:**

A list where each element is a NumPy array.

**Exceptions:**

- **ImportError**

    This exception will be raised when the model2vec module is not installed.

## Examples

```python
from pymilvus import model

model2vec_ef = Model2VecEmbeddingFunction(
    model_source="minishlab/potion-base-8M" # Specify the model source (loads from Hugging Face or local path)
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = model2vec_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim:", model2vec_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([-1.87109038e-02, -2.81724217e-03, -1.67356253e-01, -5.30372337e-02,
#        1.08304240e-01, -1.09269567e-01, -2.53464818e-01, -1.77880954e-02,
#        3.05427872e-02,  1.68244764e-01, -7.25950347e-03, -2.52178032e-02,
#       -1.22040585e-01, -4.19903360e-02, -1.28572553e-01,  6.58077672e-02,
# ...
#       -2.45161876e-02,  4.75575700e-02,  1.03392657e-02,  5.65353176e-03,
#        8.60440824e-03,  2.12906860e-03,  1.50156394e-02, -1.29304864e-02,
#       -3.66544276e-02,  5.01735881e-03, -1.53137008e-02,  9.57900891e-04],
#      dtype=float32)]
# Dim: 256 (256,)
```

