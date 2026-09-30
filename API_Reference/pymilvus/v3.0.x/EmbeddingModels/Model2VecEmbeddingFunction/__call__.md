# \_\_call\_\_()

This operation in [Model2VecEmbeddingFunction](Model2VecEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of Model2VecEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created
model2vec_ef = Model2VecEmbeddingFunction()

# __call__ method will be called
model2vec_ef(
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

model2vec_ef = Model2VecEmbeddingFunction(
    model_source="minishlab/potion-base-8M" # Specify the model source (loads from Hugging Face or local path)
)

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

model2vec_ef(docs)

# [array([ 0.02220882,  0.11436888, -0.15094341,  0.08149259,  0.20425692,
#       -0.15727402, -0.25320682, -0.00669029,  0.03157463,  0.08974048,
#       -0.00148778, -0.01803541,  0.00230828, -0.0137875 , -0.19242321,
#       -2.64913328e-02,  1.35472575e-02, -5.33258542e-02,  2.47090831e-02,
# ...
#       -4.66700038e-03,  9.53254756e-03,  1.12857306e-02, -2.91118585e-02,
#       -7.29782460e-03, -2.15345751e-02, -4.13905866e-02,  3.70773636e-02,
#        5.45082428e-02,  1.36436718e-02,  1.38598625e-02,  3.91175086e-03],
#      dtype=float32)]
```

