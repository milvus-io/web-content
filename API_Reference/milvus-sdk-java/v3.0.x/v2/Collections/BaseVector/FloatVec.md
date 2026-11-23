# FloatVec

A float vector used in search and insert requests, where each element represents one dimension of the vector. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.FloatVec
```

## Constructor

Constructs a float vector from a list of float values or a float array.

```java
FloatVec(List<Float> data)
FloatVec(float[] data)
```

**RETURNS:**

A **FloatVec** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of a float vector, `PlaceholderType.FloatVector`.

- `getData()` (*Object*)

    Returns the float vector data as a list of float values.

## Example

```java
import io.milvus.v2.service.vector.request.data.FloatVec;

FloatVec vec = new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f});
```
