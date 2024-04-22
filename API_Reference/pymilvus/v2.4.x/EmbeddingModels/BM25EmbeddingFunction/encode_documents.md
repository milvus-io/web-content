# encode_documents()

This operation takes in documents and encodes them into vector embeddings.

When using **BM25EmbeddingFunction**, note that **encoding_queries()** and **encoding_documents()** operations cannot be interchanged mathematically. Therefore, there is no implemented **__call__()** available.

## Request syntax

```python
encode_documents(
    documents: List[str], 
) -> csr_array
```

**PARAMETERS:**

- **documents** (*List[str]*)

    A list of string values, where each string represents a document that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*csr_array*

**RETURNS:**

A [scipy.sparse.csr_array](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.csr_array.html) data structure, which is a sparse matrix format commonly used for document embedding representations.

**EXCEPTIONS:**

- **ValueError**

    This exception will be raised when an unsupported operation is attempted on the embedding object.

## Examples

```python
from pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

bm25_ef = BM25EmbeddingFunction(analyzer)

# Fit the model on the corpus to get the statstics of the docs.
bm25_ef.fit(docs)

# Create embeddings for the documents
docs_embeddings = bm25_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.
print("Sparse dim:", bm25_ef.dim, list(docs_embeddings)[0].shape)

# Embeddings:   (0, 0)  1.0208816705336425
#   (0, 1)  1.0208816705336425
#   (0, 3)  1.0208816705336425
#   (0, 5)  1.0208816705336425
#   (1, 0)  0.9606986899563318
#   (1, 1)  0.9606986899563318
#   (1, 6)  0.9606986899563318
#   (1, 7)  0.9606986899563318
#   (1, 10) 0.9606986899563318
#   (1, 12) 0.9606986899563318
#   (2, 7)  0.9072164948453608
#   (2, 15) 0.9072164948453608
#   (2, 16) 0.9072164948453608
#   (2, 17) 0.9072164948453608
#   (2, 19) 0.9072164948453608
#   (2, 20) 0.9072164948453608
#   (3, 0)  1.0891089108910892
#   (3, 1)  1.0891089108910892
#   (3, 5)  1.0891089108910892
#   (4, 7)  0.9606986899563318
#   (4, 15) 0.9606986899563318
#   (4, 16) 0.9606986899563318
#   (4, 17) 0.9606986899563318
#   (4, 20) 0.9606986899563318
# Sparse dim: 21 (1, 21)
```
