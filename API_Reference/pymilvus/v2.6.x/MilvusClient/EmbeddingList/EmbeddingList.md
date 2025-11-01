# EmbeddingList

An **EmbeddingList** instance represents a list of vector embeddings. You can use an **EmbeddingList** instance to build the query vectors in a search against a vector field in an Array of Structs field.

```python
class pymilvus.EmbeddingList
```

## Constructor

Constructs an empty embedding list or a list of given vector embeddings.

```python
EmbeddingList(
    embeddings: Optional[Union[np.ndarray, List[np.ndarray]],
    dim: Optional[int],
    dtype: Optional[Union[np.dtype, str, DataType]]
)
```

**PARAMETERS:**

- **embeddings** (*np.ndarray, List&#91;np.ndarray*) -

    A list of vector embeddings, which can be either of the following types:

    - **np.ndarray** with shape **(n, dim)**, indicating a list of multiple vector embeddings

    - **np.ndarray** with shape **(dim,)**, indicating a single vector embedding

    - **List&#91;np.ndarray&#93;**, indicating a list of vector embedding arrays

- **dim** (*int*) -

    The dimensionality of the vector embeddings that are specified in the **embedding** parameter, for validation purposes. 

    If provided, all specified vector embeddings must adhere to the dimensionality restriction.

- **dtype** (*np.dtype, str, [DataType](../Collections/DataType.md)*) -  

    - **np.dtype**, such as `np.float32`, `np.float16`, or `np.unit8`

    - **string**, such as `'float32'`, `'float16'`, or `'uint8'`

    - **DataType**, such as `DataType.FLOAT_VECTOR`, `DataType.FLOAT16_VECTOR`, `DataType.BFLOAT16_VECTOR`, `DataType.INT8_VECTOR`, or `DataType.BINARY_VECTOR`

**RETURN TYPE:**

*EmbeddingList*

**RETURNS:**

An **EmbeddingList** instance.

## Examples

```python
from pymilvus import EmbeddingList

# create an empty embedding list
embeddingList1 = EmbeddingList()

# create an embedding list with a single vector embedding of 5 dimensions
embeddingList2 = EmbeddingList(
    embeddings=[0.1, 0.2, 0.3, 0.4, 0.5],
    dim=5
)

# create an embedding list with two vector embeddings, each having five dimensions
embeddingList3 = EmbeddingList(
    embeddings= [[0.1, 0.2, 0.3, 0.4, 0.5], [0.5, 0.4, 0.3, 0.2, 0.1]],
    dim=5
)
```

## Related methods

- [add()](add.md)

- [add_batch()](add_batch.md)

- [to_flat_array()](to_flat_array.md)

- [to_numpy()](to_numpy.md)

- [clear()](clear.md)

