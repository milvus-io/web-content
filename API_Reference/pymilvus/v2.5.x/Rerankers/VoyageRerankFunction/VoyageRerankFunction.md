# VoyageRerankFunction

**VoyageRerankFunction** is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying Voyage reranking model.

```python
pymilvus.model.reranker.VoyageRerankFunction
```

## Constructor

Constructs a VoyageRerankFunction for common use cases.

```python
VoyageRerankFunction(
    model_name: str = "rerank-lite-1",
    api_key: Optional[str] = None
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Voyage model to use for encoding. You can specify any of the available Voyage model names, for example, `voyage-law-2`, `voyage-code-2`, etc. If you leave this parameter unspecified, `voyage-2` will be used. For a list of available models, refer to [Voyage official documentation](https://docs.voyageai.com/docs/embeddings).

- **api_key** (*string*)

    The API key for accessing the Voyage API. For information on how to create an API key, refer to [API Key and Python Client](https://docs.voyageai.com/docs/api-key-and-installation).

## Examples

```python
from pymilvus.model.reranker import VoyageRerankFunction

# Define the rerank function
voyage_rf = VoyageRerankFunction(
    model_name="rerank-lite-1",  # Specify the model name. Defaults to `rerank-lite-1`.
    api_key=VOYAGE_API_KEY # Replace with your Voyage API key
)
```
