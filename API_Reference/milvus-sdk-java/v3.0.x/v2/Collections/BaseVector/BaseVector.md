# BaseVector

The base interface for all vector data types that can be used in search and insert requests, such as float, binary, sparse float, int8, float16, and bfloat16 vectors.

```java
io.milvus.v2.service.vector.request.data.BaseVector
```

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of the vector, which describes how the vector data is packed in the request.

- `getData()` (*Object*)

    Returns the vector data.

## Related types

The following concrete implementations of `BaseVector` are available:

- [FloatVec](FloatVec.md)

- [Int8Vec](Int8Vec.md)

- [BinaryVec](BinaryVec.md)

- [SparseFloatVec](SparseFloatVec.md)

- [Float16Vec](Float16Vec.md)

- [BFloat16Vec](BFloat16Vec.md)

- [EmbeddedText](EmbeddedText.md)

- [EmbeddingList](../EmbeddingList/EmbeddingList.md)

## Example

```java
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;

EmbeddingList embeddingList = new EmbeddingList();
embeddingList.add(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}));
```
