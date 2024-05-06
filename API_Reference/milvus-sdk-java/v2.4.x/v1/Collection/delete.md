# delete()

A MilvusClient interface. This method deletes entity(s) based on the primary key filtered by boolean expression.

```java
R<MutationResult> delete(DeleteParam requestParam);
```

#### DeleteParam

Use the `DeleteParam.Builder` to construct a `DeleteParam` object.

```java
import io.milvus.param.DeleteParam;
DeleteParam.Builder builder = DeleteParam.newBuilder();
```

Methods of `DeleteParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to delete the entity or entities from.</td>
    </tr>
    <tr>
        <td>withPartitionName(String partitionName)</td>
        <td>Sets the target partition name (Optional).</td>
        <td>partitionName: The name of the partition to delete the entity or entities from.</td>
    </tr>
    <tr>
        <td>withExpr(String expr)</td>
        <td>Sets the expression filtering to pick out the entities to be deleted.</td>
        <td>expr: The expression used for filtering.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a DeleteParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DeleteParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the `R` template. You can use `MutationResultWrapper` to get the returned information. See the corresponding section in `insert()` for more information about MutationResultWrapper.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.MutationResult;

DeleteParam param = DeleteParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withPartitionName(PARTITION_NAME)
        .withExpr("id in [100, 200, 300]")
        .build();
R<MutationResult> response = milvusClient.delete(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
