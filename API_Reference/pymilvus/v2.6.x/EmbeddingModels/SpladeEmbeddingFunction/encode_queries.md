# encode_queries()

This operation takes in a list of query strings and encodes each query into a vector embedding.

## Request syntax

```python
encode_queries(
    queries: List[str], 
) -> csr_array
```

**PARAMETERS:**

- **queries** (*List[str]*)

    A list of string values, where each string represents a query that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*csr_array*

**RETURNS:**

Compressed sparse row matrices representing the query embeddings.

**Exceptions:**

- **ImportError**

    This exception will be raised when the transformers library is not installed.

## Examples

```python
from pymilvus import model

splade_ef = model.sparse.SpladeEmbeddingFunction(
    model_name="naver/splade-cocondenser-selfdistil", 
    device="cpu"
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = splade_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", splade_ef.dim, list(query_embeddings)[0].shape)

# Embeddings:   (0, 2001)   0.6353746056556702
#   (0, 2194)   0.015553371049463749
#   (0, 2301)   0.2756537199020386
# ...
#   (1, 18522)  0.1282549500465393
#   (1, 23602)  0.13133203983306885
#   (1, 28639)  2.8150033950805664
# Sparse dim: 30522 (1, 30522)
```
