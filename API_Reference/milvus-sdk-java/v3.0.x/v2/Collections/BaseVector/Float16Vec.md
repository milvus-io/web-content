# Float16Vec

A float16 vector used in search and insert requests, stored in half-precision so that each two bytes represent one dimension of the vector. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.Float16Vec
```

## Constructor

Constructs a float16 vector from a byte buffer, a byte array, or a float32 array (the values are cast to float16 and stored in a `ByteBuffer`).

```java
Float16Vec(ByteBuffer data)
Float16Vec(byte[] data)
Float16Vec(List<Float> data)
```

**RETURNS:**

A **Float16Vec** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of a float16 vector, `PlaceholderType.Float16Vector`.

- `getData()` (*Object*)

    Returns the float16 vector data as a `ByteBuffer`.

## Example

```java
import io.milvus.v2.service.vector.request.data.Float16Vec;
import java.util.Arrays;

Float16Vec vec = new Float16Vec(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f));
```
