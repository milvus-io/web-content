# SpladeEmbeddingFunction

**SpladeEmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using SPLADE models to support embedding retrieval in Milvus.

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

**PARAMETERS:**

- **model_name** (*string*) -

    The name of the SPLADE model to use for encoding. Valid options are **naver/splade-cocondenser-ensembledistil** (default), **naver/splade_v2_max**, **naver/splade_v2_distil**, and **naver/splade-cocondenser-selfdistil**. For more information, refer to [Play with models](https://github.com/naver/splade?tab=readme-ov-file#playing-with-the-model).

- **batch_size** (*int*) -

    The batch size used for the computation.

- **query_instruction** (*string*) -

    The query to use for encoding.

- **doc_instruction** (*string*) -

    The document to use for encoding.

- **device** (*string*) -

    The device to use, with **cpu** for the CPU and **cuda:n** for the nth GPU device.

- **k_tokens_query** (*int*) -

    The number of top tokens to use for query encodings. If not specified, it will use all non-zero tokens.

- **k_tokens_document** (*int*) -

    The number of top tokens to use for document encodings. If not specified, it will use all non-zero tokens.

- ****kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [AutoModelForMaskedLM](https://huggingface.co/docs/transformers/model_doc/auto#transformers.AutoModelForMaskedLM).

## Examples

```python
from pymilvus import model

splade_ef = model.sparse.SpladeEmbeddingFunction(
    model_name="naver/splade-cocondenser-selfdistil", 
    device="cpu"
)
```
