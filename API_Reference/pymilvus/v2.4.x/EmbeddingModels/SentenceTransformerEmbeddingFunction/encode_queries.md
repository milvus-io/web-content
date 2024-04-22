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

    This exception will be raised when the necessary sentence-transformers module is not installed.

## Examples

```python
from pymilvus import model

sentence_transformer_ef = model.dense.SentenceTransformerEmbeddingFunction(
    model_name='all-MiniLM-L6-v2', # Specify the model name
    device='cpu' # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = sentence_transformer_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim:", sentence_transformer_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([-2.52114702e-02, -5.29330298e-02,  1.14570223e-02,  1.95571519e-02,
#        -2.46500354e-02, -2.66519729e-02, -8.48201662e-03,  2.82961670e-02,
#        -3.65092754e-02,  7.50745758e-02,  4.28900979e-02,  7.18822703e-02,
# ...
#        -6.76431581e-02, -6.45996556e-02, -4.67132553e-02,  4.78532910e-02,
#        -2.31596199e-03,  4.13446948e-02,  1.06935494e-01, -1.08258888e-01],
#       dtype=float32)]
# Dim: 384 (384,)
```
