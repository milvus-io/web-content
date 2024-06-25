# encode_queries()

This operation takes in a list of query strings and encodes each query into a vector embedding.

When using **BM25EmbeddingFunction**, note that **encoding_queries()** and **encoding_documents()** operations cannot be interchanged mathematically. Therefore, there is no implemented **__call__()** available.

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

A [scipy.sparse.csr_array](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.csr_array.html) data structure, which is a sparse matrix format commonly used for query embedding representations.

**Exceptions:**

- **ValueError**

    This exception will be raised when an unsupported operation is attempted on the embedding object.

## Examples

```python
from pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

bm25_ef = BM25EmbeddingFunction(analyzer)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

# Fit the model on the queries to get the statstics of the queries.
bm25_ef.fit(queries)

query_embeddings = bm25_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", bm25_ef.dim, list(query_embeddings)[0].shape)

# Embeddings:   (0, 0)  0.5108256237659907
#   (0, 1)  0.5108256237659907
#   (0, 2)  0.5108256237659907
#   (1, 6)  0.5108256237659907
#   (1, 7)  0.11554389108992644
#   (1, 14) 0.5108256237659907
# Sparse dim: 21 (1, 21)
```
