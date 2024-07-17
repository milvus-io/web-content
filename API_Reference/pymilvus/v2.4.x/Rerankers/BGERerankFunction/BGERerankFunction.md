# BGERerankFunction

**BGERerankFunction** is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying BGE reranking model.

```python
pymilvus.model.reranker.BGERerankFunction
```

## Constructor

Constructs a BGERerankFunction for common use cases.

```python
BGERerankFunction(
    model_name: str = "BAAI/bge-reranker-v2-m3",
    use_fp16: bool = True,
    batch_size: int = 32,
    normalize: bool = True,
    device: Optional[str] = None,
)
```

**PARAMETERS:**

- **model_name** (*string*) -

    The name of the model to use. You can specify any of the available BGE reranker model names, for example, `BAAI/bge-reranker-base`, `BAAI/bge-reranker-large`, etc. If you leave this parameter unspecified, `BAAI/bge-reranker-v2-m3` will be used. For a list of available models, refer to [Model List](https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/llm_reranker#model-list).

- **use_fp16** (*bool*) -

    Whether to utilize 16-bit floating-point precision (fp16). The value is `false` when `device` is `cpu`.

- **batch_size** (*int*) -

    The batch size used for the computation.

- **normalize** (*bool*)

    Whether to normalize the reranking scores.

- **device** (*string*) -

    Optional. The device to use for running the model. If not specified, the model will be run on the CPU. You can specify `cpu` for the CPU and `cuda:n` for the nth GPU device.

## Examples

```python
from pymilvus.model.reranker import BGERerankFunction

# Define the rerank function
bge_rf = BGERerankFunction(
    model_name="BAAI/bge-reranker-v2-m3",  # Specify the model name. Defaults to `BAAI/bge-reranker-v2-m3`.
    device="cpu" # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```
