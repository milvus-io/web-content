# encode_documents()

This operation takes in documents and encodes them into vector embeddings.

## Request syntax

```python
encode_documents(
    documents: List[str], 
) -> List[np.array]
```

**PARAMETERS:**

- **documents** (*List[str]*)

    A list of string values, where each string represents a document that will be passed to the embedding model for encoding. The model will generate an embedding vector for each string in the list.

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

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = openai_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", openai_ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([ 0.01775479, -0.02049707, -0.01100917, -0.05264385,  0.04231524,
#        -0.00669057,  0.00421101,  0.10464716,  0.05100248,  0.05320431,
#        -0.03256712, -0.03667054,  0.05512591,  0.03194661, -0.14211836,
# ...
#        -8.93921182e-02,  6.78001530e-03,  3.54858451e-02, -5.09016626e-02,
#         3.80731490e-03,  4.72489968e-02,  2.11893879e-02,  9.96136945e-03,
#        -5.77749610e-02,  9.73062310e-03,  4.63456511e-02, -4.32428494e-02])]
# Dim: 512 (512,)
```
