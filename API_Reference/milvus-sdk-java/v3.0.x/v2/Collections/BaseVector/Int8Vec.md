# Int8Vec

An int8 vector used in search and insert requests, where each byte represents one dimension of the vector. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.Int8Vec
```

## Constructor

Constructs an int8 vector from a byte buffer or a byte array.

```java
Int8Vec(ByteBuffer data)
Int8Vec(byte[] data)
```

**RETURNS:**

An **Int8Vec** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of an int8 vector, `PlaceholderType.Int8Vector`.

- `getData()` (*Object*)

    Returns the int8 vector data as a `ByteBuffer`.

## Example

```java
import io.milvus.v2.service.vector.request.data.Int8Vec;

Int8Vec vec = new Int8Vec(new byte[]{1, 2, 3, 4});
```
