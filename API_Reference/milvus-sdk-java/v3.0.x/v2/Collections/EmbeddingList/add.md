# add()

This operation adds vector embeddings to an **[EmbeddingList](EmbeddingList.md)** instance.

```java
public void add(BaseVector vector)
```

**PARAMETERS:**

- **vector** (*BaseVector*) -

    A vector embedding to be added to the current EmbeddingList. 

**RETURN TYPE:**

*[EmbeddingList](EmbeddingList.md)*

**RETURNS:**

An EmbeddingList instance that can be used again to chain up other `add()` methods.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception arises if different types of vector embeddings are provided.

## Examples:

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;

// 1. Initialize an EmbeddingList
EmbeddingList embeddingList = new EmbeddingList();

// 2. Add vector embedding
embeddingList.add(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}));
```
