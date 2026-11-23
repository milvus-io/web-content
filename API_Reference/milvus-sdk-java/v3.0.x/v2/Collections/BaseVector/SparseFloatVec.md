# SparseFloatVec

A sparse float vector used in search and insert requests, stored as a sorted map of dimension index to value so that only the non-zero dimensions need to be provided. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.SparseFloatVec
```

## Constructor

Constructs a sparse float vector from a sorted map of dimension index to value.

```java
SparseFloatVec(SortedMap<Long, Float> data)
```

**RETURNS:**

A **SparseFloatVec** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of a sparse float vector, `PlaceholderType.SparseFloatVector`.

- `getData()` (*Object*)

    Returns the sparse float vector data as a map of dimension index to value.

## Example

```java
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import java.util.TreeMap;

TreeMap<Long, Float> data = new TreeMap<>();
data.put(1L, 0.5f);
data.put(5L, 1.2f);
SparseFloatVec vec = new SparseFloatVec(data);
```
