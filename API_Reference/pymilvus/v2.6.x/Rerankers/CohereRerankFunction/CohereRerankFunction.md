# CohereRerankFunction

**CohereRerankFunction** is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying Cohere reranking model.

```python
pymilvus.model.reranker.CohereRerankFunction
```

## Constructor

Constructs a CohereRerankFunction for common use cases.

```python
CohereRerankFunction(
    model_name: str = "rerank-english-v3.0",
    api_key: Optional[str] = None,
    return_documents: bool = True,
    **kwargs,
)
```

**PARAMETERS:**

- **model_name** (*string*)

    The name of the model to use. You can specify any of the available Cohere reranker model names, for example, `rerank-english-v3.0`, `rerank-multilingual-v3.0`, etc. If you leave this parameter unspecified, `rerank-english-v3.0` will be used. For a list of available models, refer to [Rerank](https://docs.cohere.com/docs/rerank-2).

- **api_key** (*string*)

    The API key for accessing the Cohere API. For information on how to create an API key, refer to [Cohere dashboard](https://dashboard.cohere.com/api-keys).

- **return_documents** (*bool*)

    Whether to return the matched document text in each result. The value defaults to **True**.

- **&ast;&ast;kwargs**

    Allows additional keyword arguments to be passed to the rerank operation.

## Example

```python
from pymilvus.model.reranker import CohereRerankFunction

# Define the rerank function
cohere_rf = CohereRerankFunction(
    model_name="rerank-english-v3.0",  # Specify the model name. Defaults to \`rerank-english-v3.0\`.
    api_key=COHERE_API_KEY # Replace with your Cohere API key
)
```
