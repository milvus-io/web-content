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
from pymilvus.model.dense import InstructorEmbeddingFunction

ef = InstructorEmbeddingFunction(
    model_name="hkunlp/instructor-xl", # Defaults to `hkunlp/instructor-xl`
    query_instruction="Represent the question for retrieval:",
    doc_instruction="Represent the document for retrieval:"
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

docs_embeddings = ef.encode_documents(docs)

# Print embeddings
print("Embeddings:", docs_embeddings)
# Print dimension and shape of embeddings
print("Dim:", ef.dim, docs_embeddings[0].shape)

# Embeddings: [array([ 1.08575663e-02,  3.87877878e-03,  3.18090729e-02, -8.12458917e-02,
#        -4.68971021e-02, -5.85585833e-02, -5.95418774e-02, -8.55880603e-03,
#        -5.54775111e-02, -6.08020350e-02,  1.76202394e-02,  1.06648318e-02,
#        -5.89960292e-02, -7.46861771e-02,  6.60329172e-03, -4.25189249e-02,
#        ...
#        -1.26921125e-02,  3.01475357e-02,  8.25323071e-03, -1.88470203e-02,
#        6.04814291e-03, -2.81618331e-02,  5.91602828e-03,  7.13866428e-02],
#        dtype=float32)]
# Dim: 768 (768,)
```
