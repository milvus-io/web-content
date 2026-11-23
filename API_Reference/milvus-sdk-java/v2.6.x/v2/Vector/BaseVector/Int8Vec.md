# Int8Vec

An **Int8Vec** instance represents an int8 vector. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.Int8Vec
```

## Constructor

Constructs an int8 vector from a byte buffer or a byte array.

```java
Int8Vec(ByteBuffer data)
Int8Vec(byte[] data)
```

**PARAMETERS:**

- **data** (*ByteBuffer* | *byte[]*) -

    The int8 vector data.

**RETURN TYPE:**

Int8Vec

**RETURNS:**

An Int8Vec instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the vector data.

## Example

```java
import io.milvus.v2.service.vector.request.data.Int8Vec;

Int8Vec vector = new Int8Vec(new byte[]{1, 2, 3, 4});
```
