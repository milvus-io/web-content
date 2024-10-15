# InstructorEmbeddingFunction

InstructorEmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using the Instructor embedding model to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.InstructorEmbeddingFunction
```

## Constructor

Constructs a MistralAIEmbeddingFunction for common use cases.

```python
InstructorEmbeddingFunction(
    model_name: str = "hkunlp/instructor-xl",
    batch_size: int = 32,
    query_instruction: str = "Represent the question for retrieval:",
    doc_instruction: str = "Represent the document for retrieval:",
    device: str = "cpu",
    normalize_embeddings: bool = True,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the Mistral AI embedding model to use for encoding. The value defaults to `hkunlp/instructor-xl`. For more information, refer to [Model List](https://github.com/xlang-ai/instructor-embedding?tab=readme-ov-file#model-list).

- **batch_size** (*int*)

    The batch size used for the computation. It determines the number of sentences processed together in each batch.

- **query_instruction** (*string*)

    Task-specific instruction that guides the model on how to generate an embedding for a query or question.

- **doc_instruction** (*string*)

    Task-specific instruction that guides the model to generate an embedding for a document.

- **device** (*string*)

    Specifies the torch.device to use for the computation. If not specified, the function uses the default device.

- **normalize_embeddings** (*bool*)

    If set to `True`, the returned vectors will have a length of 1, indicating that they are normalized. In this case, similarity search would use the faster dot-product (`util.dot_score`), instead of cosine similarity.

- **kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [instructor-embedding](https://github.com/xlang-ai/instructor-embedding?tab=readme-ov-file#the-encode-function).

## Examples

```python
from pymilvus.model.dense import InstructorEmbeddingFunction

ef = InstructorEmbeddingFunction(
    model_name="hkunlp/instructor-xl", # Defaults to `hkunlp/instructor-xl`
    query_instruction="Represent the question for retrieval:",
    doc_instruction="Represent the document for retrieval:"
)
```
