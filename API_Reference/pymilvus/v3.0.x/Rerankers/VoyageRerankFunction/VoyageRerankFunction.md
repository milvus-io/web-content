# VoyageRerankFunction

**VoyageRerankFunction** is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying Voyage reranking model.

```python
pymilvus.model.reranker.VoyageRerankFunction
```

## Constructor

Constructs a VoyageRerankFunction for common use cases.

```python
VoyageRerankFunction(
    model_name: str = "rerank-2",
    api_key: Optional[str] = None
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Voyage reranker model to use for ranking. You can specify any of the available Voyage reranker model names, for example, `rerank-2`, `rerank-lite-1`, etc. If you leave this parameter unspecified, `rerank-2` will be used. For a list of available models, refer to [Voyage official documentation](https://docs.voyageai.com/docs/rerank).

- **api_key** (*string*)

    The API key for accessing the Voyage API. For information on how to create an API key, refer to [API Key and Python Client](https://docs.voyageai.com/docs/api-key-and-installation).

## Example

```python
from pymilvus.model.reranker import VoyageRerankFunction

# Define the rerank function
voyage_rf = VoyageRerankFunction(
    model_name="rerank-2",  # Specify the model name. Defaults to \`rerank-2\`.
    api_key=VOYAGE_API_KEY # Replace with your Voyage API key
)
```
