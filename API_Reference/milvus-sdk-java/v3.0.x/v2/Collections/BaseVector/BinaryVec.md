# BinaryVec

A binary vector used in search and insert requests, where each bit of the raw bytes represents one dimension of the vector. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.BinaryVec
```

## Constructor

Constructs a binary vector from a byte buffer or a byte array.

```java
BinaryVec(ByteBuffer data)
BinaryVec(byte[] data)
```

**RETURNS:**

A **BinaryVec** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of a binary vector, `PlaceholderType.BinaryVector`.

- `getData()` (*Object*)

    Returns the binary vector data as a `ByteBuffer`.

## Example

```java
import io.milvus.v2.service.vector.request.data.BinaryVec;

BinaryVec vec = new BinaryVec(new byte[]{0x01, 0x02, 0x04, 0x08});
```
