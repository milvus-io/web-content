# EmbeddingList

An **EmbeddingList** instance represents a list of vector embeddings. You can use an **EmbeddingList** instance to build the query vectors in a search against a vector field in an Array of Structs field.

```java
io.milvus.v2.service.vector.request.data.EmbeddingList
```

## Constructor

Constructs an empty embedding list or a list of given vector embeddings.

```java
EmbeddingList()
```

**RETURN TYPE:**

EmbeddingList

**RETURNS:**

An EmbeddingList instance comprises one or multiple vector embeddings. You can use it to search against the vector fields in the Struct elements of an Array of Structs field.

## Examples:

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Initialize EmbeddingList
EmbeddingList embeddingList1 = new EmbeddingList();
embeddingList1.add(new FloatVec(new float[]{0.1f, 0.2f, 0.3f}));
embeddingList1.add(new FloatVec(new float[]{0.4f, 0.5f, 0.6f}));

EmbeddingList embeddingList2 = new EmbeddingList();
embeddingList2.add(new FloatVec(new float[]{0.7f, 0.8f, 0.9f}));
embeddingList2.add(new FloatVec(new float[]{0.2f, 0.4f, 0.6f}));

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("test")
        .annsField("clips")
        .data(Arrays.asList(embeddingList1, embeddingList2))
        .limit(10)
        .build());
```

