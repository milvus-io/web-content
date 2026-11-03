# FunctionType

This is an enumeration that provides the following constants.
```java
public enum FunctionType
```


**Constants:**

- **UNKNOWN** (0)

    The function type is unknown.

- **BM25** (1)

    Sets the function type to **BM25**.

- **TEXTEMBEDDING** (2)

    Sets the function type to **TextEmbedding**.

- **RERANK** (3)

    Sets the function type to **Rerank**.

## Example

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Arrays;

CreateCollectionReq.Function function = CreateCollectionReq.Function.builder()
        .name("bm25")
        .functionType(FunctionType.BM25)
        .inputFieldNames(Arrays.asList("text"))
        .outputFieldNames(Arrays.asList("sparse_vector"))
        .build();
```
