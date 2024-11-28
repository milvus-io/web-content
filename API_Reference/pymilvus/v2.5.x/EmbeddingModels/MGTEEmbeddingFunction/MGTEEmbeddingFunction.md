# MGTEEmbeddingFunction

MGTEEmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using MGTE embedding models to support embedding retrieval in Milvus.

```python
pymilvus.model.hybrid.MGTEEmbeddingFunction
```

## Constructor

Constructs a MGTEEmbeddingFunction for common use cases.

```python
MGTEEmbeddingFunction(
    model_name: str = "Alibaba-NLP/gte-multilingual-base",
    batch_size: int = 16,
    device: str = "",
    normalize_embeddings: bool = True,
    dimensions: Optional[int] = None,
    use_fp16: bool = False,
    return_dense: bool = True,
    return_sparse: bool = True,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the GTE embedding model to use for encoding. The value defaults to `Alibaba-NLP/gte-multilingual-base`. For more information, refer to [Models](https://huggingface.co/Alibaba-NLP).

- **batch_size** (*int*)

    The batch size to use for encoding.

- **device** (*string*)

    The device to use for the model.

- **normalize_embeddings** (*bool*)

    Whether to normalize the dense embeddings.

- **dimensions** (*int*)

    The number of dimensions for the dense embeddings. If not provided, it will use the model's default hidden size.

- **use_fp16** (*bool*)

    Whether to use 16-bit floating point precision.

- **return_dense** (*bool*)

    Whether to return dense embeddings.

- **return_sparse** (*bool*)

    Whether to return sparse embeddings.

- **kwargs**

    Allows additional keyword arguments to be passed to the model initialization.

## Examples

```python
from pymilvus.model.hybrid import MGTEEmbeddingFunction

ef = MGTEEmbeddingFunction(
    model_name="Alibaba-NLP/gte-multilingual-base",
)
```
