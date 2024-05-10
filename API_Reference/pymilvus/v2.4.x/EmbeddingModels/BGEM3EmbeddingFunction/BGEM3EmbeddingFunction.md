# BGEM3EmbeddingFunction

__BGEM3EmbeddingFunction__ is a class in pymilvus that handles encoding text into embeddings using the BGE M3 model to support embedding retrieval in Milvus.

```python
pymilvus.model.hybrid.BGEM3EmbeddingFunction
```

## Constructor

Constructs a BGEM3EmbeddingFunction for common use cases.

```python
BGEM3EmbeddingFunction(
    model_name: str = "BAAI/bge-m3",
    batch_size: int = 16,
    device: str = "",
    normalize_embeddings: bool = True,
    use_fp16: bool = True,
    return_dense: bool = True,
    return_sparse: bool = True,
    return_colbert_vecs: bool = False,
    **kwargs,
)
```

__PARAMETERS:__

- __model_name__ (_string_) -

    The name of the model to use for encoding. The value defaults to __BAAI/bge-m3__.

- __batch_size__ (_int_) -

    The batch size used for the computation.

- __device__ (_string_) -

    The device to use, with __cpu__ for the CPU and __cuda:n__ for the nth GPU device.

- __normalize_embeddings__ (_bool_) -

    Whether to normalize embedding vectors to unit length.

- __use_fp16__ (_bool_) -

    Whether to utilize 16-bit floating-point precision (fp16). Specify __False__ when __device__ is __cpu__.

- __return_dense__ (_bool_) -

    Whether to return dense embedding vectors. 

- __return_sparse__ (_bool_) -

    Whether to return sparse embedding vectors.

- __return_colbert_vecs__ (_bool_) -

    Whether to return ColBERT-style contextualized embedding vectors.

- __**kwargs__

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [bge_m3](https://github.com/FlagOpen/FlagEmbedding/blob/master/FlagEmbedding/bge_m3.py).

## Examples

```python
from pymilvus import model

bge_m3_ef = model.hybrid.BGEM3EmbeddingFunction(
    model_name='BAAI/bge-m3', # Specify t`he model name
    device='cpu', # Specify the device to use, e.g., 'cpu' or 'cuda:0'
    use_fp16=False # Whether to use fp16. `False` for `device='cpu'`.
)
```

