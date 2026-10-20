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
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;
import java.util.Arrays;
import java.util.List;

// 1. Build query vectors for an Array of Structs field
List<Float> vector1 = Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f);
List<Float> vector2 = Arrays.asList(0.2f, 0.3f, 0.4f, 0.5f);
List<Float> vector3 = Arrays.asList(0.3f, 0.4f, 0.5f, 0.6f);
List<Float> vector4 = Arrays.asList(0.4f, 0.5f, 0.6f, 0.7f);

// 2. Initialize EmbeddingList
EmbeddingList embeddingList1 = new EmbeddingList();
embeddingList1.add(new FloatVec(vector1));
embeddingList1.add(new FloatVec(vector2));

EmbeddingList embeddingList2 = new EmbeddingList();
embeddingList2.add(new FloatVec(vector3));
embeddingList2.add(new FloatVec(vector4));
```

