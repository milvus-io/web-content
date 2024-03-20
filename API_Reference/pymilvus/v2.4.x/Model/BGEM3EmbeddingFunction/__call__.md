# __call__()

This operation in [BGEM3EmbeddingFunction](./BGEM3EmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The ____call__()__ method of BGEM3EmbeddingFunction shares the same functionality as [encode_documents()](./encode_documents) and [encode_queries()](./encode_queries.md).

## Request syntax

```python
# Instance created
bge_m3_ef = BGEM3EmbeddingFunction()

# __call__ method will be called
bge_m3_ef(
    texts: List[str]
) -> Dict
```

__PARAMETERS:__

- __texts__ (_List[str]_)

    A list of string values, where each string represents text that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

__RETURN TYPE:__

_Dict_

__RETURNS:__

A dictionary containing the document embeddings.

When initializing [BGEM3EmbeddingFunction](./BGEM3EmbeddingFunction.md), if __return_dense__, __return_sparse__, and __return_colbert_vecs__ are set to __True__, the returned dictionary will contain the keys __dense__, __sparse__, and __colbert_vecs__, with the corresponding dense embeddings, sparse word embeddings, and ColBERT vectors.

__Exceptions:__

- __ImportError__

    This exception will be raised when the FlagEmbedding module is not installed.

## Examples

```python
from pymilvus import model

# Create a BGEM3EmbeddingFunction instance
bge_m3_ef = model.hybrid.BGEM3EmbeddingFunction(
    model_name='BAAI/bge-m3', # Specify t`he model name
    device='cpu', # Specify the device to use, e.g., 'cpu' or 'cuda:0'
    use_fp16=False # Whether to use fp16. `False` for `device='cpu'`.
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

# bge_m3_ef.__call__ will be called
bge_m3_ef(docs)

# {'dense': [array([-0.02505937, -0.00142193,  0.04015467, ..., -0.02094924,
#           0.02623661,  0.00324098], dtype=float32),
#   array([ 0.00118463,  0.00649292, -0.00735763, ..., -0.01446293,
#           0.04243685, -0.01794822], dtype=float32),
#   array([ 0.00415287, -0.0101492 ,  0.0009811 , ..., -0.02559666,
#           0.08084674,  0.00141647], dtype=float32)],
#  'sparse': <3x250002 sparse array of type '<class 'numpy.float32'>'
#   with 43 stored elements in Compressed Sparse Row format>}
```
