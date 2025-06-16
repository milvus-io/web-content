# Model2VecEmbeddingFunction

**Model2VecEmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using the model2vec module to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.Model2VecEmbeddingFunction
```

## Constructor

Constructs an Model2VecEmbeddingFunction for common use cases.

```python
Model2VecEmbeddingFunction(
    model_source: Union[str, Path] = "minishlab/potion-base-8M",
    **kwargs
)
```

**PARAMETERS:**

- **model_source (string) -**

    The source of the model, which can either be a Hugging Face model identifier or a local path to a model2vec embedding model. 

    Valid options for Hugging Face model identifier are **minishlab/potion-base-8M** (default), **minishlab/potion-base-4M**, **minishlab/potion-base-2M**, **minishlab/potion-base-32M**, and **minishlab/potion-retrieval-32M**

- ****kwargs**

    Allows additional keyword arguments to be passed to the model initialization when loading a model from the Hugging Face Hub, including parameters such as huggingface authentication tokens.

## Examples

```python
from pymilvus import model

model2vec_ef = Model2VecEmbeddingFunction(
    model_source="minishlab/potion-base-8M" # Specify the model source (loads from Hugging Face or local path)
)
```

