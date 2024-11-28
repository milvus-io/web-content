# SentenceTransformerEmbeddingFunction

**SentenceTransformerEmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using Sentence Transformer models to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.SentenceTransformerEmbeddingFunction
```

## Constructor

Constructs a SentenceTransformerEmbeddingFunction for common use cases.

```python
SentenceTransformerEmbeddingFunction(
    model_name: str = "all-MiniLM-L6-v2",
    batch_size: int = 32,
    query_instruction: str = "",
    doc_instruction: str = "",
    device: str = "cpu",
    normalize_embeddings: bool = True,
    **kwargs
)
```

**PARAMETERS:**

- **model_name** (*string*) -

    The name of the Sentence Transformer model to use for encoding. The value defaults to **all-MiniLM-L6-v2**. You can use any of Sentence Transformers' pre-trained models. For a list of available models, refer to [Pretrained models](https://www.sbert.net/docs/pretrained_models.html).

- **batch_size** (*int*) -

    The batch size used for the computation.

- **query_instruction** (*string*) -

    Prepends a contextual instruction to the query text to improve embedding quality for specific models (e.g., "Represent the Wikipedia question for retrieving supporting documents:").

- **doc_instruction** (*string*) -

    Prepends a contextual instruction to the document text to improve embedding quality for specific models (e.g., "Represent the Wikipedia document for retrieval:").

- **device** (*string*) -

    The device to use, with **cpu** for the CPU and **cuda:n** for the nth GPU device.

- **normalize_embeddings** (*bool*)

    Whether to normalize returned vectors to have length 1. In that case, the faster dot-product (util.dot_score) instead of cosine similarity can be used.

- ****kwargs**

    Allows additional keyword arguments to be passed to the model initialization. For more information, refer to [SentenceTransformer](https://github.com/UKPLab/sentence-transformers/blob/master/sentence_transformers/SentenceTransformer.py).

## Examples

```python
from pymilvus import model

sentence_transformer_ef = model.dense.SentenceTransformerEmbeddingFunction(
    model_name='all-MiniLM-L6-v2', # Specify the model name
    device='cpu' # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```
