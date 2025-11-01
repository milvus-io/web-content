# CrossEncoderRerankFunction

**CrossEncoderRerankFunction** is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying Cross-Encoder reranking model.

```python
pymilvus.model.reranker.CrossEncoderRerankFunction
```

## Constructor

Constructs a CrossEncoderRerankFunction for common use cases.

```python
CrossEncoderRerankFunction(
    model_name: str = "",
    device: str = "",
    batch_size: int = 32,
    activation_fct: Any = None,
    **kwargs,
)
```

**Parameters**:

- **model_name** (*string*)

    The name of the model to use. You can specify any of the available Cross-Encoder model names, for example, `cross-encoder/ms-marco-TinyBERT-L-2-v2`, `cross-encoder/ms-marco-MiniLM-L-2-v2`, etc. If you leave this parameter unspecified, an empty string will be used. For a list of available models, refer to [Pretrained Cross-Encoders](https://www.sbert.net/docs/pretrained_cross-encoders.html).

- **device** (*string*)

    The device to use for running the model. You can specify `cpu` for the CPU and `cuda:n` for the nth GPU device.

- **batch_size** (*int*)

    The batch size for the computation.

- **activation_fct**

    The activation function applied on top of logits output of model.

- ****kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [cross_encoder](https://www.sbert.net/docs/package_reference/cross_encoder.html#cross-encoder).

## Examples

```python
from pymilvus.model.reranker import CrossEncoderRerankFunction

# Define the rerank function
ce_rf = CrossEncoderRerankFunction(
    model_name="cross-encoder/ms-marco-MiniLM-L-6-v2",  # Specify the model name. Defaults to an emtpy string.
    device="cpu" # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```
