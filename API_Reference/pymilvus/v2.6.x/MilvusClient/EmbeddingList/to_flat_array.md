# to_flat_array()

This operation converts the current **EmbeddingList** instance into a flattened NumPy array containing all vector embeddings concatenated.

## Request Syntax

```python
to_flat_array()
```

**RETURN TYPE:**

*np.ndarray*

**RETURNS:**

A flattened NumPy array containing all vector embeddings concatenated.

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

embeddingList.to_flat_array()
```
