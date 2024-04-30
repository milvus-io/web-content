# queryAsync()

The MilvusClient interface. This method queries entity(s) asynchronously based on scalar field(s) filtered by boolean expression. Note that the order of the returned entities cannot be guaranteed.

```java
ListenableFuture<R<QueryResults>> queryAsync(QueryParam requestParam);
```

This method uses the same parameter as `query()`, it invokes RPC interface and returns a ListenableFuture object immediately.

## Example

```java
import io.milvus.param.dml.*;
import io.milvus.grpc.QueryResults;
import com.google.common.util.concurrent.ListenableFuture;

QueryParam param = QueryParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withExpr("id in [100, 101]")
        .addOutFields("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .build();
ListenableFuture<R<QueryResults>> futureResults = client.queryAsync(param);
R<QueryResults> response = futureResults.get();
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
