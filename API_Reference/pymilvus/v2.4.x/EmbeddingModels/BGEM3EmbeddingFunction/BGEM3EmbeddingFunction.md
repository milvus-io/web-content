# BGEM3EmbeddingFunction

**BGEM3EmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using the BGE M3 model to support embedding retrieval in Milvus.

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

**PARAMETERS:**

- **model_name** (*string*) -

    The name of the model to use for encoding. The value defaults to **BAAI/bge-m3**.

- **batch_size** (*int*) -

    The batch size used for the computation.

- **device** (*string*) -

    The device to use, with **cpu** for the CPU and **cuda:n** for the nth GPU device.

- **normalize_embeddings** (*bool*) -

    Whether to normalize embedding vectors to unit length.

- **use_fp16** (*bool*) -

    Whether to utilize 16-bit floating-point precision (fp16). Specify **False** when **device** is **cpu**.

- **return_dense** (*bool*) -

    Whether to return dense embedding vectors. 

- **return_sparse** (*bool*) -

    Whether to return sparse embedding vectors.

- **return_colbert_vecs** (*bool*) -

    Whether to return ColBERT-style contextualized embedding vectors.

- ****kwargs**

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

