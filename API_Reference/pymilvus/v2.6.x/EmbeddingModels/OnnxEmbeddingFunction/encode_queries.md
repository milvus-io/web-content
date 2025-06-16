# encode_queries()

This operation takes in a list of query strings and encodes each query into a vector embedding.

## Request syntax

```python
encode_queries(
    queries: List[str], 
) -> List[np.array]
```

**PARAMETERS:**

- **queries** (*List[str]*)

    A list of string values, where each string represents a query that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

**RETURN TYPE:**

*List[np.array]*

**RETURNS:**

A list where each element is a NumPy array.

**Exceptions:**

*None*

## Examples

```python
from pymilvus.model.dense import OnnxEmbeddingFunction

onnx_ef = OnnxEmbeddingFunction(
    model_name="GPTCache/paraphrase-albert-onnx", # Defaults to `GPTCache/paraphrase-albert-onnx`
    tokenizer_name="GPTCache/paraphrase-albert-small-v2" # Defaults to `GPTCache/paraphrase-albert-small-v2`
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = onnx_ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", onnx_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([-1.09502957e-02, -2.61731189e-02, -1.14003704e-02,  1.87525299e-02,
#         4.06063837e-02,  1.50731323e-02, -3.68221761e-03,  1.09151563e-03,
#         5.71931723e-02, -3.04123055e-02, -1.23123940e-02, -1.68146057e-02,
#        -9.35562516e-03, -4.28719301e-02,  1.35385097e-02, -1.47082414e-02,
# ...
#         2.29728036e-02,  1.30193396e-02, -3.18266590e-02, -2.95146697e-03,
#         2.25738962e-02,  7.75775969e-02, -2.46181466e-02,  3.65723938e-02,
#         8.26405265e-02, -3.07154769e-02,  3.95052996e-03, -3.55286066e-02])]
# Dim 768 (768,)
```
