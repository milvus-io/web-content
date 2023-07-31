# upsert()

This method upserts entities into Milvus. An upsert is a data-level operation that will overwrite an existing entity if a specified field already exists in a collection, and insert a new entity if the specified value doesn’t already exist.

## Invocation

```python
upsert(data, partition_name=None, timeout=None, **kwargs)
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `data`            | Data to upsert.                                               | list-like(list, tuple)          | True     |
| `partition_name`  | Name of the partition to upsert data into.                    | String                          | False    |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                 | Float                           | False    |

## Return

A MutationResult object.

## Raises

- `CollectionNotExistException`: error if the collection does not exist.
- `ParamError`: error if the parameters are invalid.
- `BaseException`: error if the specified partition does not exist.

## Example

```python
import random
nb = 3000
dim = 8
vectors = [[random.random() for _ in range(dim)] for _ in range(nb)]
data = [
    [i for i in range(nb)],
    [str(i) for i in range(nb)],
    [i for i in range(10000, 10000+nb)],
    vectors,
    [str("dy"*i) for i in range(nb)]
]
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
mr = collection.upsert(data)
```