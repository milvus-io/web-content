# BinaryVec

A **BinaryVec** instance represents a binary vector. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.BinaryVec
```

## Constructor

Constructs a binary vector from a byte buffer or a byte array.

```java
BinaryVec(ByteBuffer data)
BinaryVec(byte[] data)
```

**PARAMETERS:**

- **data** (*ByteBuffer* | *byte[]*) -

    The binary vector data.

**RETURN TYPE:**

BinaryVec

**RETURNS:**

A BinaryVec instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the vector data.

## Example

```java
import io.milvus.v2.service.vector.request.data.BinaryVec;

BinaryVec vector = new BinaryVec(new byte[]{1, 2, 3, 4});
```
