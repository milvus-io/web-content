# getPlaceholderType()

This getter returns the placeholder type of the embedding list, which indicates the vector data format.

```java
public PlaceholderType getPlaceholderType()
```

**RETURNS:**

*PlaceholderType*

**EXCEPTIONS:**

- **[MilvusClientException](../../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.grpc.PlaceholderType;
import java.util.Arrays;

// Initialize an EmbeddingList
EmbeddingList embeddingList = new EmbeddingList();
embeddingList.add(new FloatVec(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f)));

// Get the placeholder type
PlaceholderType type = embeddingList.getPlaceholderType();
```
