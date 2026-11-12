# VoyageEmbeddingFunction

**VoyageEmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using Voyage models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.VoyageEmbeddingFunction
```

## Constructor

Constructs an VoyageEmbeddingFunction for common use cases.

```python
VoyageEmbeddingFunction(
    model_name: str = "voyage-3-large",
    api_key: Optional[str] = None,
    embedding_type: Optional[str] = None,
    truncate: Optional[bool] = None,
    dimension: Optional[int] = None,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Voyage model to use for encoding. You can specify any of the available Voyage model names, for example, `voyage-3-large`, `voyage-code-3`, `voyage-2`, etc. If you leave this parameter unspecified, `voyage-3-large` will be used. For a list of available models, refer to [Voyage official documentation](https://docs.voyageai.com/docs/embeddings).

- **api_key** (*string*)

    The API key for accessing the Voyage API. For information on how to create an API key, refer to [API Key and Python Client](https://docs.voyageai.com/docs/api-key-and-installation).

- **embedding_type** (*string*)

    The type of embeddings to return. One of `float`, `binary`, or `ubinary`. The value defaults to `None`, which returns the default `float` embeddings.

- **truncate** (*bool*)

    Whether to truncate the input texts if they exceed the maximum token length of the model. The value defaults to `None`.

- **dimension** (*int*)

    The dimension of the output embeddings. The value defaults to `None`, which uses the default dimension of the selected model.

- **kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [Python API](https://docs.voyageai.com/docs/embeddings#python-api).

## Example

```python
from pymilvus.model.dense import VoyageEmbeddingFunction

voyage_ef = VoyageEmbeddingFunction(
    model_name="voyage-3-large", # Specify the model name
    api_key='YOUR_API_KEY' # Replace with your own Voyage API key
)
```
