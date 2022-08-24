# searchAsync()

A MilvusClient interface. This method conducts approximate nearest neighbor (ANN) search asynchronously.

```Java
ListenableFuture<R<SearchResults>> searchAsync(SearchParam requestParam);
```

This method uses the same parameter as `search()`, it invokes RPC interface and returns a `ListenableFuture` object immediately.

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.SearchResultsWrapper;
import io.milvus.grpc.SearchResults;

SearchParam param = SearchParam.newBuilder()
        .withCollectionName("collection1")
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
