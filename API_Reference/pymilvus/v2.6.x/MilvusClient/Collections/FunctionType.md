# FunctionType

This is an enumeration that provides the following constants.

```python
class FunctionType(IntEnum):
    UNKNOWN = 0
    BM25 = 1
    TEXTEMBEDDING = 2
    RERANK = 3
    MINHASH = 4
```

**Constants:**

- **BM25** (1)

    Sets the function type to **BM25**. This indicates that Milvus will utilize the BM25 algorithm to generate sparse embeddings for a designated `VARCHAR` field.

- **TEXTEMBEDDING** (2)

    Sets the function type to **TEXTEMBEDDING**. This indicates that Milvus will transform raw text data into vector embeddings by automatically calling external model providers.

- **RERANK** (3)

    Sets the function type to **RERANK**. This indicates that Milvus will use a ranker to rerank candidates for improved search performance.

## Example

```python
from pymilvus import MilvusClient, Function, FunctionType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a BM25 function that generates sparse embeddings from a text field
bm25_function = Function(
    name="bm25",
    function_type=FunctionType.BM25,
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
)
```
