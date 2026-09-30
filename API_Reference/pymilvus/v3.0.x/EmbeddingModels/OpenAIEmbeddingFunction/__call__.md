# \_\_call\_\_()

This operation in [OpenAIEmbeddingFunction](OpenAIEmbeddingFunction.md) takes a list of text strings and directly encodes them into vector embeddings.

The **\_\_call\_\_()** method of OpenAIEmbeddingFunction shares the same functionality as [encode_documents()](encode_documents.md) and [encode_queries()](encode_queries.md).

## Request syntax

```python
# Instance created
openai_ef = OpenAIEmbeddingFunction()

# __call__ method will be called
openai_ef(
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

openai_ef(docs)

# [array([ 1.77358780e-02, -2.06100717e-02, -1.10160727e-02, -5.27569763e-02,
#          4.22616638e-02, -6.68976083e-03,  4.18110052e-03,  1.04632668e-01,
# ...
#          3.78031246e-02, -4.20645699e-02, -4.66991328e-02, -3.67034003e-02,
#         -2.61381622e-02, -7.74914995e-02,  1.88917443e-02,  2.48224158e-02,
#         -8.93921182e-02,  6.78001530e-03,  3.54858451e-02, -5.09016626e-02,
#          3.80731490e-03,  4.72489968e-02,  2.11893879e-02,  9.96136945e-03,
#         -5.77749610e-02,  9.73062310e-03,  4.63456511e-02, -4.32428494e-02])]
```

