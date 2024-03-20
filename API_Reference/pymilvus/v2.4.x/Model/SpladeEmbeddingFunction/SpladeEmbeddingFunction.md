# SpladeEmbeddingFunction

__SpladeEmbeddingFunction__ is a class in pymilvus that handles encoding text into embeddings using SPLADE models to support embedding retrieval in Milvus.

```python
pymilvus.model.sparse.SpladeEmbeddingFunction
```

## Constructor

Constructs a SpladeEmbeddingFunction for common use cases.

```python
SpladeEmbeddingFunction(
    model_name: str = "naver/splade-cocondenser-ensembledistil",
    batch_size: int = 32,
    query_instruction: str = "",
    doc_instruction: str = "",
    device: Optional[str] = "cpu",
    k_tokens_query: Optional[int] = None,
    k_tokens_document: Optional[int] = None,
    **kwargs,
)
```

__PARAMETERS:__

- __model_name__ (_string_) -

    The name of the SPLADE model to use for encoding. Valid options are __naver/splade-cocondenser-ensembledistil__ (default), __naver/splade_v2_max__, __naver/splade_v2_distil__, and __naver/splade-cocondenser-selfdistil__. For more information, refer to [Play with models](https://github.com/naver/splade?tab=readme-ov-file#playing-with-the-model).

- __batch_size__ (_int_) -

    The batch size used for the computation.

- __query_instruction__ (_string_) -

    The query to use for encoding.

- __doc_instruction__ (_string_) -

    The document to use for encoding.

- __device__ (_string_) -

    The device to use, with __cpu__ for the CPU and __cuda:n__ for the nth GPU device.

- __k_tokens_query__ (_int_) -

    The number of top tokens to use for query encodings. If not specified, it will use all non-zero tokens.

- __k_tokens_document__ (_int_) -

    The number of top tokens to use for document encodings. If not specified, it will use all non-zero tokens.

- __**kwargs__

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [AutoModelForMaskedLM](https://huggingface.co/docs/transformers/model_doc/auto#transformers.AutoModelForMaskedLM).

## Examples

```python
from pymilvus import model

splade_ef = model.sparse.SpladeEmbeddingFunction(
    model_name="naver/splade-cocondenser-selfdistil", 
    device="cpu"
)
```

