# BFloat16Vec

A bfloat16 vector used in search and insert requests, stored in bfloat16 precision so that each two bytes represent one dimension of the vector. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.BFloat16Vec
```

## Constructor

Constructs a bfloat16 vector from a byte buffer, a byte array, or a float32 array (the values are cast to bfloat16 and stored in a `ByteBuffer`).

```java
BFloat16Vec(ByteBuffer data)
BFloat16Vec(byte[] data)
BFloat16Vec(List<Float> data)
```

**RETURNS:**

A **BFloat16Vec** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of a bfloat16 vector, `PlaceholderType.BFloat16Vector`.

- `getData()` (*Object*)

    Returns the bfloat16 vector data as a `ByteBuffer`.

## Example

```java
import io.milvus.v2.service.vector.request.data.BFloat16Vec;
import java.util.Arrays;

BFloat16Vec vec = new BFloat16Vec(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f));
```
