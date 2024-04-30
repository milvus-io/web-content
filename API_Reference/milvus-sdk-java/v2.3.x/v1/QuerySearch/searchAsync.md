# searchAsync()

The MilvusClient interface. This method conducts an approximate nearest neighbor (ANN) search asynchronously.

```java
ListenableFuture<R<SearchResults>> searchAsync(SearchParam requestParam);
```

This method uses the same parameter as `search()`, it invokes RPC interface and returns a `ListenableFuture` object immediately.

## Example

```java
import io.milvus.param.dml.*;
import io.milvus.grpc.SearchResults;
import com.google.common.util.concurrent.ListenableFuture;

SearchParam param = SearchParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withMetricType(MetricType.IP)
        .withTopK(10)
        .withVectors(targetVectors)
        .withVectorFieldName("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .build();
ListenableFuture<R<SearchResults>> futureResults = client.searchAsync(param);
R<SearchResults> response = futureResults.get();
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
