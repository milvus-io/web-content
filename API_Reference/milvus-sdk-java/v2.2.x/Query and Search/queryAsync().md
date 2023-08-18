# queryAsync()

A MilvusClient interface. This method queries entity(s) asynchronously based on scalar field(s) filtered by boolean expression.

<div class="alert note">
The order of the returned entities cannot be guaranteed.
</div>

```Java
ListenableFuture<R<QueryResults>> queryAsync(QueryParam requestParam);
```

This method uses the same parameter as <code><a href="query().md">query()</a></code>. It invokes RPC interface and returns a `ListenableFuture` object immediately.

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.QueryResults;
import com.google.common.util.concurrent.ListenableFuture;

QueryParam param = QueryParam.newBuilder()
        .withCollectionName("collection1")
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
