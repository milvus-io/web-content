# getFunctions()

This getter returns the list of functions defined in this FunctionScore object.

```java
public List<CreateCollectionReq.Function> getFunctions()
```

**RETURNS:**

*List\<CreateCollectionReq.Function\>*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.vector.request.FunctionScore;
import java.util.List;

// Build a rerank function
CreateCollectionReq.Function func = CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name("boost")
        .param("reranker", "boost")
        .param("weight", "0.5")
        .build();

// Add the function to a FunctionScore and retrieve the function list
FunctionScore score = FunctionScore.builder()
    .addFunction(func)
    .build();
List<CreateCollectionReq.Function> functions = score.getFunctions();
```
