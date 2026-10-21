# getData()

This getter returns the raw embedding data contained in this embedding list.

```java
public Object getData()
```

**RETURN TYPE:**

*Object*

**RETURNS:**

The raw embedding data contained in this embedding list.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;
import java.util.Arrays;

// Initialize an EmbeddingList
EmbeddingList embeddingList = new EmbeddingList();
embeddingList.add(new FloatVec(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f)));

// Get the underlying data
Object data = embeddingList.getData();
```

