# insertAsync()

A MilvusClient interface. This method inserts entities asynchronously into a specified collection. 

```Java
ListenableFuture<R<MutationResult>> insertAsync(InsertParam requestParam);
```

This method uses the same parameter as [insert()](insert().md#InsertParam), invokes the RPC interface and returns a `ListenableFuture` object immediately.

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

