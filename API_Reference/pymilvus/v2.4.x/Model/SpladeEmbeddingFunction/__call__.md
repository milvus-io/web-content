# __call__()

This operation in [SpladeEmbeddingFunction](./SpladeEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

Unlike [encode_documents()](./encode_documents) or [encode_queries()](./encode_queries), which enable you to prepend __doc_instruction__ or __query_instruction__ and utilize __k_tokens_document__ or __k_tokens_query__ for result pruning, the __call__(.md) method directly returns embeddings without offering the option to prepend instructions or prune results.

## Request syntax

```python
# Instance created
splade_ef = SpladeEmbeddingFunction()

# __call__ method will be called
splade_ef(
    texts: List[str]
) -> csr_array
```

__PARAMETERS:__

- __texts__ (_List[str]_)

    A list of string values, where each string represents text that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

__RETURN TYPE:__

_csr_array_

__RETURNS:__

Compressed sparse row matrices representing the document embeddings.

__Exceptions:__

- __ImportError__

    This exception will be raised when the transformers library is not installed.

## Examples

```python
from pymilvus import model

splade_ef = model.sparse.SpladeEmbeddingFunction(
    model_name="naver/splade-cocondenser-selfdistil", 
    device="cpu"
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

splade_ef(docs)

# <3x30522 sparse array of type '<class 'numpy.float32'>'
#   with 298 stored elements in Compressed Sparse Row format>
```
