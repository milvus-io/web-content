# FloatVec

A **FloatVec** instance represents a dense float vector. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.FloatVec
```

## Constructor

Constructs a float vector from a list or an array of float values.

```java
FloatVec(List<Float> data)
FloatVec(float[] data)
```

**PARAMETERS:**

- **data** (*List\<Float\>* | *float[]*) -

    The float vector data.

**RETURN TYPE:**

FloatVec

**RETURNS:**

A FloatVec instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the vector data.

## Example

```java
import io.milvus.v2.service.vector.request.data.FloatVec;

FloatVec vector = new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f});
```
