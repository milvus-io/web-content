# add_batch()

This operation adds multiple vector embeddings to the current **EmbeddingList** instance.

## Request syntax

```python
add_batch(
    self,
    embedding: Union[List[np.ndarray], np.ndarray]
)
```

**PARAMETERS:**

- **embeddings** (*List[np.ndarray], np.ndarray*) - 

    The vector embeddings that are to be added to the current **EmbeddingList** instance.

**RETURN TYPE:**

*EmbeddingList*

**RETURNS:**

The current **EmbeddingList** instance itself for method chaining

**EXCEPTIONS:**

- **ValueError**:

    This exception will be raised if the provided vector embeddings do not match the existing ones in dimensionality.

## Examples

```python
from pymilvus import EmbeddingList

# create an empty embedding list
embeddingList = EmbeddingList()

# add multiple vector embeddings in a batch
embeddingList.add_batch(
    embeddings=[[0.1, 0.2, 0.3, 0.4, 0.5], [0.5, 0.4, 0.3, 0.2, 0.1]]
)
```

