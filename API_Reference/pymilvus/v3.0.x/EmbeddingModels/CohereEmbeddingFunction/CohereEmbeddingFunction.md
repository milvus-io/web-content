# CohereEmbeddingFunction

CohereEmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using Cohere embedding models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.CohereEmbeddingFunction
```

## Constructor

Constructs a CohereEmbeddingFunction for common use cases.

```python
CohereEmbeddingFunction(
    model_name: str = "embed-english-light-v3.0",
    api_key: Optional[str] = None,
    input_type: str = "search_document",
    embedding_types: Optional[List[str]] = None,
    truncate: Optional[str] = None,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Cohere embedding model to use for encoding. You can specify any of the available Cohere embedding model names, for example, `embed-english-v3.0`, `embed-multilingual-v3.0`, etc. If you leave this parameter unspecified, `embed-english-light-v3.0` will be used. For a list of available models, refer to [Embed](https://docs.cohere.com/docs/models#embed).

- **api_key** (*string*)

    The API key for accessing the Cohere API.

- **input_type** (*string*)

    The type of input passed to the model. Required for embedding models v3 and higher.

    - `"search_document"`: Used for embeddings stored in a vector database for search use-cases.

    - `"search_query"`: Used for embeddings of search queries run against a vector DB to find relevant documents.

    - `"classification"`: Used for embeddings passed through a text classifier.

    - `"clustering"`: Used for the embeddings run through a clustering algorithm.

- **embedding_types** (*List[str]*)

    The type of embeddings you want to get back. Not required and default is None, which returns the Embed Floats response type. Currently, you can only specify a single value for this parameter. Possible values:

    - `"float"`: Use this when you want to get back the default float embeddings. Valid for all models.

    - `"binary"`: Use this when you want to get back signed binary embeddings. Valid for only v3 models.

    - `"ubinary"`: Use this when you want to get back unsigned binary embeddings. Valid for only v3 models.

- **truncate** (*string*)

    One of `NONE`|`START`|`END` to specify how the API will handle inputs longer than the maximum token length.

    Passing `START` will discard the start of the input. `END` will discard the end of the input. In both cases, input is discarded until the remaining input is exactly the maximum input token length for the model.

    If `NONE` is selected, when the input exceeds the maximum input token length an error will be returned.

    Default: `END`

- **kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [Embed](https://docs.cohere.com/reference/embed).

## Examples

```python
from pymilvus.model.dense import CohereEmbeddingFunction

cohere_ef = CohereEmbeddingFunction(
    model_name="embed-english-light-v3.0",
    api_key="YOUR_COHERE_API_KEY",
    input_type="search_document",
    embedding_types=["float"]
)
```
