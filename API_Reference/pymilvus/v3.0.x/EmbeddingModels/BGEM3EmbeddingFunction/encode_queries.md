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

A dictionary containing the query embeddings.

When initializing [BGEM3EmbeddingFunction](BGEM3EmbeddingFunction.md), if **return_dense**, **return_sparse**, and **return_colbert_vecs** are set to **True**, the returned dictionary will contain the keys **dense**, **sparse**, and **colbert_vecs**, with the corresponding dense embeddings, sparse word embeddings, and ColBERT vectors.

**Exceptions:**

- **ImportError**

    This exception will be raised when the FlagEmbedding module is not installed.

## Examples

```python
from pymilvus import model

bge_m3_ef = model.hybrid.BGEM3EmbeddingFunction(
    model_name='BAAI/bge-m3', # Specify t`he model name
    device='cpu', # Specify the device to use, e.g., 'cpu' or 'cuda:0'
    use_fp16=False # Whether to use fp16. `False` for `device='cpu'`.
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = bge_m3_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension of dense embeddings
print("Dense query dim:", bge_m3_ef.dim["dense"], query_embeddings["dense"][0].shape)
# Since the sparse embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse query dim:", bge_m3_ef.dim["sparse"], list(query_embeddings["sparse"])[0].shape)

# Embeddings: {'dense': [array([-0.02024024, -0.01514386,  0.02380808, ...,  0.00234648,
#        -0.00264978, -0.04317448], dtype=float32), array([ 0.00648045, -0.0081542 , -0.02717067, ..., -0.00380103,
#         0.04200587, -0.01274772], dtype=float32)], 'sparse': <2x250002 sparse array of type '<class 'numpy.float32'>'
#   with 14 stored elements in Compressed Sparse Row format>}
# Dense query dim: 1024 (1024,)
# Sparse query dim: 250002 (1, 250002)
```
