# TEIEmbeddingFunction

**TEIEmbeddingFunction** is a class in [pymilvus](https://github.com/milvus-io/pymilvus) that handles encoding text into embeddings using a Text Embeddings Inference (TEI) service to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.TEIEmbeddingFunction
```

## Constructor

Constructs a TEIEmbeddingFunction for common use cases.

```python
TEIEmbeddingFunction(
    api_url: str,
    dimensions: Optional[int] = None
)
```

**PARAMETERS:**

- **api_url** (*string*) -

    **[REQUIRED]**

    The URL of the Text Embeddings Inference (TEI) service to use for encoding.

    The class appends `/v1/embeddings` to the specified URL to form the encoding endpoint.

- **dimensions** (*int*) -

    The number of dimensions the resulting output embeddings should have.

    The value defaults to **None**, in which case the class determines the dimension by sending a test request to the TEI service.

## Example

```python
from pymilvus.model.dense import TEIEmbeddingFunction

tei_ef = TEIEmbeddingFunction(
    api_url="http://localhost:8080", # Replace with the URL of your TEI service
)
```
