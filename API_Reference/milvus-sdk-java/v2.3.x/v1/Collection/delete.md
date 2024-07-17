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
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to delete the entity or entities from.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionName(String partitionName)</p></td>
        <td><p>Sets the target partition name (Optional).</p></td>
        <td><p>partitionName: The name of the partition to delete the entity or entities from.</p></td>
    </tr>
    <tr>
        <td><p>withExpr(String expr)</p></td>
        <td><p>Sets the expression filtering to pick out the entities to be deleted.</p></td>
        <td><p>expr: The expression used for filtering.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a DeleteParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DeleteParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the `R` template. You can use `MutationResultWrapper` to get the returned information. See the corresponding section in `insert()` for more information about `MutationResultWrapper`.

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
