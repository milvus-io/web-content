# \_\_call\_\_()

This operation in [Model2VecEmbeddingFunction](../Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **GeminiEmbeddingFunction()** method of Model2VecEmbeddingFunction shares the same functionality as [encode_documents()](../Model2VecEmbeddingFunction/encode_documents.md) and [encode_queries()](../Model2VecEmbeddingFunction/encode_queries.md).

## Request syntax

```python
# Instance created
gemini_ef = model.dense.GeminiEmbeddingFunction()

# __call__ method will be called
gemini_ef(
    texts: List[str]
) -> List[np.array]
```

**PARAMETERS:**

- **texts** (*List[str]*)

    A list of string values, where each string represents text that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*List[np.array]*

**RETURNS:**

A list where each element is a NumPy array.

**Exceptions:**

- **ImportError**

    This exception will be raised when the model2vec module is not installed.

## Examples

```python
from pymilvus import model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name="gemini-embedding-exp-03-07",
    api_key="YOUR_API_KEY",
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = gemini_ef.encode_documents(docs)

# Embeddings: [array([-0.00894029,  0.00573813,  0.013351  , ..., -0.00042766,
#        -0.00603091, -0.00341043], shape=(3072,)), array([ 0.00222347,  0.03725113,  0.01152256, ...,  0.01047272,
#        -0.01701597,  0.00565377], shape=(3072,)), array([ 0.00661134,  0.00232328, -0.01342973, ..., -0.00514429,
#        -0.02374139, -0.00701721], shape=(3072,))]
# Dim: 3072 (3072,)
```

