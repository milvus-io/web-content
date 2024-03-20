# OpenAIEmbeddingFunction

__OpenAIEmbeddingFunction__ is a class in pymilvus that handles encoding text into embeddings using OpenAI models to support embedding retrieval in Milvus.

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

__PARAMETERS:__

- __model_name__ (_string_) -

    The name of the OpenAI model to use for encoding. Valid options are __text-embedding-3-small__, __text-embedding-3-large__, and __text-embedding-ada-002__ (default).

- __api_key__ (_string_) -

    The API key for accessing the OpenAI API. If you leave it unspecified, the code will check environment variables for the API key as a fallback.

- __base_url__ (_string_) -

    The base URL of the OpenAI API endpoint to use for encoding text into embeddings. The value defaults to __None__, which uses the public OpenAI API server at the default endpoint.

- __dimensions__ (_int_) -

    The number of dimensions the resulting output embeddings should have. Only supported in __text-embedding-3__ and later models.

- __**kwargs__

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [Client](https://github.com/openai/openai-python/blob/main/src/openai/_client.py).

## Examples

```python
from pymilvus import model

openai_ef = model.dense.OpenAIEmbeddingFunction(
    model_name='text-embedding-3-large', _# Specify the model name_
    dimensions=512 _# Set the embedding dimensionality according to MRL feature._
)
```

