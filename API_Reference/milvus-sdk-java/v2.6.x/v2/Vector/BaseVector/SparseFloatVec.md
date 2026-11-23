# SparseFloatVec

A **SparseFloatVec** instance represents a sparse float vector. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.SparseFloatVec
```

## Constructor

Constructs a sparse float vector from a sorted map of dimension indices to values.

```java
SparseFloatVec(SortedMap<Long, Float> data)
```

**PARAMETERS:**

- **data** (*SortedMap\<Long, Float\>*) -

    The sparse vector data, mapping each dimension index to its value.

**RETURN TYPE:**

SparseFloatVec

**RETURNS:**

A SparseFloatVec instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the vector data.

## Example

```java
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import java.util.SortedMap;
import java.util.TreeMap;

SortedMap<Long, Float> data = new TreeMap<>();
data.put(0L, 0.1f);
data.put(100L, 0.2f);
SparseFloatVec vector = new SparseFloatVec(data);
```
