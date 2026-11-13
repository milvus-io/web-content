# JinaEmbeddingFunction

JinaEmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using Jina AI embedding models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.JinaEmbeddingFunction
```

## Constructor

Constructs a JinaEmbeddingFunction for common use cases.

```python
JinaEmbeddingFunction(
    model_name: str = "jina-embeddings-v3",
    api_key: Optional[str] = None,
    task: str = "retrieval.passage",
    dimensions: Optional[int] = None,
    late_chunking: Optional[bool] = False,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Jina AI embedding model to use for encoding. You can specify any of the available Jina AI embedding model names, for example, `jina-embeddings-v3`, `jina-embeddings-v2-base-en`, etc. If you leave this parameter unspecified, `jina-embeddings-v3` will be used. For a list of available models, refer to [Jina Embeddings](https://jina.ai/embeddings/).

- **api_key** (*string*)

    The API key for accessing the Jina AI API.

- **task** (*string*)

    The type of task the model is used for. The value defaults to `retrieval.passage`. Possible values are `retrieval.passage`, `retrieval.query`, `separation`, `classification`, and `text-matching`.

- **dimensions** (*int*)

    The number of dimensions the resulting output embeddings should have.

- **late_chunking** (*bool*)

    Whether to use late chunking. The value defaults to `False`.

- **kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [Embedding API](https://jina.ai/embeddings/).

## Example

```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name="jina-embeddings-v3", # Specify the model name
    api_key="YOUR_JINAAI_API_KEY" # Provide your Jina AI API key
)
```
