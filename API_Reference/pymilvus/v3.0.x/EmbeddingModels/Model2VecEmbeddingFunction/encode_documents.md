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

    This exception will be raised when the model2vec module is not installed.

## Examples

```python
from pymilvus import model

model2vec_ef = Model2VecEmbeddingFunction(
    model_source="minishlab/potion-base-8M" # Specify the model source (loads from Hugging Face or local path)
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = model2vec_ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", model2vec_ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([ 0.02220882,  0.11436888, -0.15094341,  0.08149259,  0.20425692,
#       -0.15727402, -0.25320682, -0.00669029,  0.03157463,  0.08974048,
#       -0.00148778, -0.01803541,  0.00230828, -0.0137875 , -0.19242321,
#       -0.01353845, -0.17632745,  0.03382885,  0.07306298,  0.0569298 ,
# ...
#       -4.66700038e-03,  9.53254756e-03,  1.12857306e-02, -2.91118585e-02,
#       -7.29782460e-03, -2.15345751e-02, -4.13905866e-02,  3.70773636e-02,
#        5.45082428e-02,  1.36436718e-02,  1.38598625e-02,  3.91175086e-03],
#      dtype=float32)]
# Dim: 256 (256,)
```

