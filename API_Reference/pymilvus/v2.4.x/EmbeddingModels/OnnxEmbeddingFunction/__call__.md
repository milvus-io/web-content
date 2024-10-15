# \_\_call\_\_()

This operation in [OnnxEmbeddingFunction](OnnxEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The `call` method of OnnxEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created
onnx_ef = OnnxEmbeddingFunction()

# __call__ method will be called
onnx_ef(
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

onnx_ef(docs)

# [array([ 1.07279094e-02, -3.58951056e-02,  1.87497448e-02,  1.63487596e-02,
#          3.65169223e-02,  3.58818956e-03, -4.00472457e-04,  2.85293215e-02,
#          2.27457494e-03,  1.83626742e-03,  4.22583687e-03,  2.71739219e-02,
# ...
#         -1.82832424e-02,  4.70027002e-02, -8.62051580e-02, -5.58088603e-03,
#         -7.23840262e-02,  5.29176208e-02,  3.04039875e-02,  6.54351067e-02,
#          4.97930995e-02,  4.34017292e-02, -4.95981596e-02,  2.43449939e-02,
#          1.97417933e-02,  2.92120624e-02, -4.64168786e-02,  3.49774291e-03,
#          7.58170658e-02, -5.85279444e-02, -7.13737298e-03, -4.12926800e-02])]
```
