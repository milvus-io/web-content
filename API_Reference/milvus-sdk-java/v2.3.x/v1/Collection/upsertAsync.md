# upsertAsync()

A MilvusClient interface. This method inserts new entities into a specified collection, and replaces them if the entities already exist.

```java
ListenableFuture<R<MutationResult>> upsertAsync(UpsertParam requestParam);
```

This method uses the same parameter as `upsert()`, it invokes the RPC interface and returns a ListenableFuture object immediately.

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

List<List<Float>> vectors = generateFloatVectors(1);
List<JsonObject> rows = new ArrayList<>();
JsonObject row = new JsonObject();
row.addProperty("id", (long)i);
row.add("vector", gson.toJsonTree(vectors.get(0)));
rows.add(row);

UpsertParam param = UpsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withRows(rows)
        .build();
ListenableFuture<R<MutationResult>> response = client.upsertAsync(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

R<MutationResult> result = response.get();
MutationResultWrapper wrapper = new MutationResultWrapper(result.getData());
System.out.println(wrapper.getInsertCount() + " rows upserted");
```
