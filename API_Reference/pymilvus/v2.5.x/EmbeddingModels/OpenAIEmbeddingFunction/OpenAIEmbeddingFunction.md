# OpenAIEmbeddingFunction

**OpenAIEmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using OpenAI models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.OpenAIEmbeddingFunction
```

## Constructor

Constructs an OpenAIEmbeddingFunction for common use cases.

```python
OpenAIEmbeddingFunction(
    model_name: str = "text-embedding-ada-002", 
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
    dimensions: Optional[int] = None,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*) -

    The name of the OpenAI model to use for encoding. Valid options are **text-embedding-3-small**, **text-embedding-3-large**, and **text-embedding-ada-002** (default).

- **api_key** (*string*) -

    The API key for accessing the OpenAI API. If you leave it unspecified, the code will check environment variables for the API key as a fallback.

- **base_url** (*string*) -

    The base URL of the OpenAI API endpoint to use for encoding text into embeddings. The value defaults to **None**, which uses the public OpenAI API server at the default endpoint.

- **dimensions** (*int*) -

    The number of dimensions the resulting output embeddings should have. Only supported in **text-embedding-3** and later models.

- ****kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [Client](https://github.com/openai/openai-python/blob/main/src/openai/_client.py).

## Examples

```python
from pymilvus import model

openai_ef = model.dense.OpenAIEmbeddingFunction(
    model_name='text-embedding-3-large', # Specify the model name
    dimensions=512 # Set the embedding dimensionality according to MRL feature.
)
```

