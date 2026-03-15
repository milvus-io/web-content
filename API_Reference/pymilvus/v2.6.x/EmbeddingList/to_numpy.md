# to_numpy()

This operation converts the current **EmbeddingList** instance into a two-dimensional (2D) NumPy array containing all vector embeddings.

## Request Syntax

```python
to_numpy()
```

**RETURN TYPE:**

*np.ndarray*

**RETURNS:**

A 2D NumPy array containing all vector embeddings in the shape **(num_embeddings, dim)**.

**EXCEPTIONS:**

- **ValueError**:

    This exception will be raised if the current **EmbeddingList** instance is empty.

## Examples

```python
from pymilvus import EmbeddingList

# create an empty embedding list
embeddingList = EmbeddingList()

# add multiple vector embeddings in a batch
embeddingList.add_batch(
    embeddings=[[0.1, 0.2, 0.3, 0.4, 0.5], [0.5, 0.4, 0.3, 0.2, 0.1]]
)

embeddingList.to_numpy()
```

