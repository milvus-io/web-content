# BaseVector

The base interface for all vector data types that can be used in search and insert requests, such as float, binary, sparse float, int8, float16, and bfloat16 vectors. Each concrete vector type implements this interface.

```java
io.milvus.v2.service.vector.request.data.BaseVector
```

## Methods

The following are the methods of the `BaseVector` interface:

- `getPlaceholderType()`

    Returns the placeholder type of the vector, which describes how the vector data is packed in the request.

- `getData()`

    Returns the vector data.

## Related operations

The following vector types implement the `BaseVector` interface:

- [FloatVec](FloatVec.md)

- [BinaryVec](BinaryVec.md)

- [SparseFloatVec](SparseFloatVec.md)

- [Int8Vec](Int8Vec.md)

- [Float16Vec](Float16Vec.md)

- [BFloat16Vec](BFloat16Vec.md)

- [EmbeddedText](EmbeddedText.md)

- [EmbeddingList](../../Collections/EmbeddingList/EmbeddingList.md)

## Example

```java
import io.milvus.v2.service.vector.request.data.BaseVector;
import io.milvus.v2.service.vector.request.data.BinaryVec;
import io.milvus.v2.service.vector.request.data.FloatVec;
import java.util.Collections;
import java.util.List;

// BaseVector is the interface implemented by every vector data type.
List<BaseVector> data = Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f}));
List<BaseVector> binary = Collections.singletonList(new BinaryVec(new byte[]{1, 2, 3, 4}));
```
