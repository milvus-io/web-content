# Float16Vec

A **Float16Vec** instance represents a float16 vector. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.Float16Vec
```

## Constructor

Constructs a float16 vector from a byte buffer, a byte array, or a list of float values.

```java
Float16Vec(ByteBuffer data)
Float16Vec(byte[] data)
Float16Vec(List<Float> data)
```

**PARAMETERS:**

- **data** (*ByteBuffer* | *byte[]* | *List\<Float\>*) -

    The float16 vector data.

**RETURN TYPE:**

Float16Vec

**RETURNS:**

A Float16Vec instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the vector data.

## Example

```java
import io.milvus.v2.service.vector.request.data.Float16Vec;
import java.util.Arrays;
import java.util.List;

List<Float> data = Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f);
Float16Vec vector = new Float16Vec(data);
```
