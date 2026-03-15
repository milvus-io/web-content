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

*None*

## Examples

```python
from pymilvus.model.dense import OnnxEmbeddingFunction

onnx_ef = OnnxEmbeddingFunction(
    model_name="GPTCache/paraphrase-albert-onnx", # Defaults to `GPTCache/paraphrase-albert-onnx`
    tokenizer_name="GPTCache/paraphrase-albert-small-v2" # Defaults to `GPTCache/paraphrase-albert-small-v2`
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = onnx_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", onnx_ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([ 1.07279094e-02, -3.58951056e-02,  1.87497448e-02,  1.63487596e-02,
#         3.65169223e-02,  3.58818956e-03, -4.00472457e-04,  2.85293215e-02,
#         2.27457494e-03,  1.83626742e-03,  4.22583687e-03,  2.71739219e-02,
#        -3.68434680e-03,  3.07914883e-02,  4.50544517e-03,  4.42281208e-02,
# ...
#         4.97930995e-02,  4.34017292e-02, -4.95981596e-02,  2.43449939e-02,
#         1.97417933e-02,  2.92120624e-02, -4.64168786e-02,  3.49774291e-03,
#         7.58170658e-02, -5.85279444e-02, -7.13737298e-03, -4.12926800e-02])]
# Dim: 768 (768,)
```
