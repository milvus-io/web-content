# insertAsync()

A MilvusClient interface. This method inserts entities asynchronously into a specified collection. 

```java
ListenableFuture<R<MutationResult>> insertAsync(InsertParam requestParam);
```

This method uses the same parameter as `insert()`, it invokes the RPC interface and returns a ListenableFuture object immediately.

## Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;

int rowCount = 10000;
List<Long> ids = new ArrayList<>();
for (long i = 0L; i < rowCount; ++i) {
    ids.add(i);
}
List<List<Float>> vectors = generateFloatVectors(rowCount);

List<InsertParam.Field> fields = new ArrayList<>();
fields.add(new InsertParam.Field("id", ids));
fields.add(new InsertParam.Field("vec", vectors));

InsertParam param = InsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFields(fields)
        .build();
ListenableFuture<R<MutationResult>> response = client.insertAsync(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

R<MutationResult> result = response.get();
MutationResultWrapper wrapper = new MutationResultWrapper(result.getData());
System.out.println(wrapper.getInsertCount() + " rows inserted");
```
