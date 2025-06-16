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

- **ImportError**

    This exception will be raised when the OpenAI module is not installed.

## Examples

```python
from pymilvus import model

openai_ef = model.dense.OpenAIEmbeddingFunction(
    model_name='text-embedding-3-large', # Specify the model name
    dimensions=512 # Set the embedding dimensionality according to MRL feature.
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = openai_ef.encode_queries(queries)

# Print embeddings
print("Embeddings:", query_embeddings)
# Print dimension and shape of embeddings
print("Dim:", openai_ef.dim, query_embeddings[0].shape)

# Embeddings: [array([ 0.00530251, -0.01907905, -0.01672608, -0.05030033,  0.01635982,
#        -0.03169853, -0.0033602 ,  0.09047844,  0.00030747,  0.11853652,
#        -0.02870182, -0.01526102,  0.05505067,  0.00993909, -0.07165466,
# ...
#        -9.78106782e-02, -2.22669560e-02,  1.21873049e-02, -4.83198799e-02,
#         5.32377362e-02, -1.90469325e-02,  5.62430918e-02,  1.02650477e-02,
#        -6.21757433e-02,  7.88027793e-02,  4.91846527e-04, -1.51633881e-02])]
# Dim: 512 (512,)
```
