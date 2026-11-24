# BFloat16Vec

A **BFloat16Vec** instance represents a bfloat16 vector. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.BFloat16Vec
```

## Constructor

Constructs a bfloat16 vector from a byte buffer, a byte array, or a list of float values.

```java
BFloat16Vec(ByteBuffer data)
BFloat16Vec(byte[] data)
BFloat16Vec(List<Float> data)
```

**PARAMETERS:**

- **data** (*ByteBuffer* | *byte[]* | *List\<Float\>*) -

    The bfloat16 vector data.

**RETURN TYPE:**

BFloat16Vec

**RETURNS:**

A BFloat16Vec instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the vector data.

## Example

```java
import io.milvus.v2.service.vector.request.data.BFloat16Vec;
import java.util.Arrays;
import java.util.List;

List<Float> data = Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f);
BFloat16Vec vector = new BFloat16Vec(data);
```
