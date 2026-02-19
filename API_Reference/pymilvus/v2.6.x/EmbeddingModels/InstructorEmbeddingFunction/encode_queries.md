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
from pymilvus.model.dense import InstructorEmbeddingFunction

ef = InstructorEmbeddingFunction(
    model_name="hkunlp/instructor-xl", # Defaults to `hkunlp/instructor-xl`
    query_instruction="Represent the question for retrieval:",
    doc_instruction="Represent the document for retrieval:"
)

queries = ["When was artificial intelligence founded", 
           "Where was Alan Turing born?"]

query_embeddings = ef.encode_queries(queries)

print("Embeddings:", query_embeddings)
print("Dim", ef.dim, query_embeddings[0].shape)

# Embeddings: [array([ 1.21721877e-02,  1.88485277e-03,  3.01732980e-02, -8.10302645e-02,
#        -6.13401756e-02, -3.98149453e-02, -5.18723316e-02, -6.76784338e-03,
#        -6.59285188e-02, -5.38365729e-02, -5.13435388e-03, -2.49210224e-02,
#        -5.74403182e-02, -7.03031123e-02,  6.63730130e-03, -3.42259370e-02,
#        ...
#        7.36595877e-03,  2.85532661e-02, -1.55952033e-02,  2.13342719e-02,
#        1.51187545e-02, -2.82798670e-02,  2.69396193e-02,  6.16136603e-02],
#        dtype=float32)]
# Dim 768 (768,)
```
