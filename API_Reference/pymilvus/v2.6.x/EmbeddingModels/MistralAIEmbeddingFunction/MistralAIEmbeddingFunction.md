# MistralAIEmbeddingFunction

MistralAIEmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using Mistral AI embedding models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.MistralAIEmbeddingFunction
```

## Constructor

Constructs a MistralAIEmbeddingFunction for common use cases.

```python
MistralAIEmbeddingFunction(
    api_key: str,
    model_name: str = "mistral-embed",
    **kwargs
)
```

**PARAMETERS:**

- **api_key** (*string*)

    The API key for accessing the Mistral AI API.

- **model_name** (*string*)

    The name of the Mistral AI embedding model to use for encoding. The value defaults to `mistral-embed`. For more information, refer to [Embeddings](https://docs.mistral.ai/capabilities/embeddings/).

- **kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [Embedding API](https://docs.mistral.ai/api/#tag/embeddings/operation/embeddings_v1_embeddings_post).

## Examples

```python
from pymilvus.model.dense import MistralAIEmbeddingFunction

ef = MistralAIEmbeddingFunction(
    model_name="mistral-embed", # Defaults to `mistral-embed`
    api_key="MISTRAL_API_KEY" # Provide your Mistral AI API key
)
```
