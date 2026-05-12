# clear()

This operation clears the vector embeddings from the current **[EmbeddingList](EmbeddingList.md)** instance.

## Request Syntax

```python
clear()
```

**RETURN TYPE:**

*[EmbeddingList](EmbeddingList.md)*

**RETURNS:**

An empty **[EmbeddingList](EmbeddingList.md)** instance.

## Examples

```python
from pymilvus import EmbeddingList

# create an empty embedding list
embeddingList = EmbeddingList()

# add multiple vector embeddings in a batch
embeddingList.add_batch(
    embeddings=[[0.1, 0.2, 0.3, 0.4, 0.5], [0.5, 0.4, 0.3, 0.2, 0.1]]
)

# clear the vector embeddings from the instance
embeddingList.clear()
```
