# \_\_call\_\_()

This operation in [SentenceTransformerEmbeddingFunction](SentenceTransformerEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

To prevent potential errors when directly using the **\_\_call()\_\_** method, avoid using **query_instruction** or **doc_instruction** for SentenceTransformerEmbeddingFunction initialization. For more information, refer to [SentenceTransformerEmbeddingFunction](SentenceTransformerEmbeddingFunction.md).

## Request syntax

```python
# Instance created
sentence_transformer_ef = SentenceTransformerEmbeddingFunction()

# __call__ method will be called
sentence_transformer_ef(
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

    This exception will be raised when the necessary sentence-transformers module is not installed.

## Examples

```python
from pymilvus import model

sentence_transformer_ef = model.dense.SentenceTransformerEmbeddingFunction(
    model_name='all-MiniLM-L6-v2', # Specify the model name
    device='cpu' # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

sentence_transformer_ef(docs)

# [array([-3.09392996e-02, -1.80662833e-02,  1.34775648e-02,  2.77156215e-02,
#         -4.86349640e-03, -3.12581174e-02, -3.55921760e-02,  5.76934684e-03,
#          2.80773244e-03,  1.35783911e-01,  3.59678417e-02,  6.17732145e-02,
# ...
#         -1.43224243e-02,  4.15765122e-02, -2.97174603e-02,  4.85958979e-02,
#          1.26190051e-01,  6.31634071e-02,  8.69929418e-02,  5.49541414e-03,
#         -4.61330153e-02, -4.85207550e-02,  3.13997865e-02,  7.82178566e-02,
#         -4.75336798e-02,  5.21207601e-02,  9.04406682e-02, -5.36676683e-02],
#        dtype=float32)]
```
