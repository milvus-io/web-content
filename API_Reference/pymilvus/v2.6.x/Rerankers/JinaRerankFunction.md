# JinaRerankFunction

JinaRerankFunction is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying Jina AI reranking model.

```python
pymilvus.model.reranker.JinaRerankFunction
```

## Constructor

Constructs a JinaRerankFunction for common use cases.

```python
JinaRerankFunction(
    model_name: str = "jina-reranker-v2-base-multilingual",
    api_key: Optional[str] = None
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Jina AI reranker model to use for encoding. If you leave this parameter unspecified, `jina-reranker-v2-base-multilingual` will be used. For a list of available models, refer to [Jina AI Rerankers](https://jina.ai/reranker/).

- **api_key** (*string*)

    The API key for accessing the Jina AI API.

## Examples

```python
from pymilvus.model.reranker import JinaRerankFunction

jina_rf = JinaRerankFunction(
    model_name="jina-reranker-v2-base-multilingual", # Defaults to `jina-reranker-v2-base-multilingual`
    api_key="YOUR_JINAAI_API_KEY"
)
```
