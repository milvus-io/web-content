# insertAsync()

A MilvusClient interface. This method inserts entities asynchronously into a specified collection.

```java
ListenableFuture<R<MutationResult>> insertAsync(InsertParam requestParam);
```

This method uses the same parameter as `insert()`, it invokes the RPC interface and returns a `ListenableFuture` object immediately.

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.param.R;
import java.util.ArrayList;
import java.util.List;
import io.milvus.param.dml.InsertParam;

int rowCount = 10000;
List<List<Float>> vectors = generateFloatVectors(rowCount);

// insert data by columns
List<Long> ids = new ArrayList<>();
for (long i = 0L; i < rowCount; ++i) {
    ids.add(i);
}

List<InsertParam.Field> fields = new ArrayList<>();
fields.add(new InsertParam.Field("id", ids));
fields.add(new InsertParam.Field("vector", vectors));

ListenableFuture<R<MutationResult>> future = client.insertAsync(InsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFields(fields)
        .build());
R<MutationResult> response = future.get(); // wait for the result to be returned
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

MutationResultWrapper wrapper = new MutationResultWrapper(response.getData());
System.out.println(wrapper.getInsertCount() + " rows inserted");

// insert data by rows
Gson gson = new Gson();
List<JsonObject> rows = new ArrayList<>();
for (int i = 1; i <= rowCount; ++i) {
    JsonObject row = new JsonObject();
    row.addProperty("id", (long)i);
    row.add("vector", gson.toJsonTree(vectors.get(i)));
    rows.add(row);
}

future = client.insertAsync(InsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withRows(rows)
        .build());
response = future.get(); // wait for the result to be returned
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
