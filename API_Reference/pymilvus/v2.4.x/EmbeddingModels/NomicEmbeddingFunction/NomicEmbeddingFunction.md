# NomicEmbeddingFunction

NomicEmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using Nomic embedding models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.NomicEmbeddingFunction
```

## Constructor

Constructs a NomicEmbeddingFunction for common use cases.

```python
NomicEmbeddingFunction(
    model_name: str = "nomic-embed-text-v1.5",
    task_type: str = "search_document",
    dimensions: int = 768,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Nomic embedding model to use for encoding. The value defaults to `nomic-embed-text-v1.5`. For more information, refer to [Nomic official documentation](https://docs.nomic.ai/atlas/models/image-embedding).

- **task_type** (*string*)

    The type of task the model is being used for.

- **dimensions** (*int*)

    The dimensionality of the output embeddings.

- **kwargs**

    - **long_text_mode** (*string*)

        How to handle texts longer than the model can accept. One of `mean` or `truncate`.

## Examples

```python
from pymilvus.model.dense import NomicEmbeddingFunction

ef = NomicEmbeddingFunction(
    model_name="nomic-embed-text-v1.5", # Defaults to `mistral-embed`
)
```
