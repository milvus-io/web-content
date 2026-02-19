# add()

This operation adds a single vector embedding to the current **EmbeddingList** instance.

## Request syntax

```python
add(
    self,
    embedding: Union[np.ndarray, List[Any]]
)
```

**PARAMETERS:**

- **embedding** (*np.ndarray, List[Any]*) - 

    The vector embedding that is to be added to the current **EmbeddingList** instance.

**RETURN TYPE:**

*EmbeddingList*

**RETURNS:**

The current **EmbeddingList** instance itself for method chaining

**EXCEPTIONS:**

- **ValueError**:

    This exception will be raised if the provided vector embedding does not match the existing ones in dimensionality.

## Examples

```python
from pymilvus import EmbeddingList

# create an empty embedding list
embeddingList = EmbeddingList()

# add multiple vector embeddings one after another
embeddingList.add([0.1, 0.2, 0.3, 0.4, 0.5])
embeddingList.add([0.5, 0.4, 0.3, 0.2, 0.1])
```
