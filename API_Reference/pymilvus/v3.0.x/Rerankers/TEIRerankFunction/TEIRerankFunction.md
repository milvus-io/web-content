# TEIRerankFunction

**TEIRerankFunction** is a class in [milvus_model](https://github.com/milvus-io/milvus-model) that takes a query and document as input and directly returns a similarity score instead of embeddings. This functionality uses the underlying Text Embeddings Inference (TEI) reranking model.

```python
pymilvus.model.reranker.TEIRerankFunction
```

## Constructor

Constructs a TEIRerankFunction for common use cases.

```python
TEIRerankFunction(
    api_url: str
)
```

**PARAMETERS:**

- **api_url** (*string*)

    **[REQUIRED]**

    The URL of the Text Embeddings Inference (TEI) reranking service to use for ranking.

    The class appends `/rerank` to the specified URL to form the reranking endpoint.

## Example

```python
from pymilvus.model.reranker import TEIRerankFunction

# Define the rerank function
tei_rf = TEIRerankFunction(
    api_url="http://localhost:8080", # Replace with the URL of your TEI reranking service
)
```
