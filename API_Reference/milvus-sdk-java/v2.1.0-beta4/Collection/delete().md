# delete()

A MilvusClient interface. This method deletes an entity or entities from a collection by filtering the primary key field with [boolean expression](https://milvus.io/docs/v2.1.x/boolean.md). 

```Java
R<MutationResult> delete(DeleteParam requestParam);
```

## DeleteParam

Use the `DeleteParam.Builder` to construct a `DeleteParam` object.

```Java
import io.milvus.param.DeleteParam;
DeleteParam.Builder builder = DeleteParam.newBuilder();
```

Methods of `DeleteParam.Builder`:

| Method                                    | Description                                                  | Parameters                                                   |
| ----------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to delete the entity or entities from. |
| `withPartitionName(String partitionName)` | Sets the target partition name (Optional).                   | `partitionName`: The name of the partition to delete the entity or entities from. |
| `withExpr(String expr)`                   | Sets the expression filtering to pick out the entities to be deleted. Currently, only expression in the format of "pk_field in [1, 2, ...]" is supported. | `expr`: The expression used for filtering the primary key field.                   |
| `build()`                                 | Constructs a `DeleteParam` object.                           | N/A                                                          |

The `DeleteParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<MutationResult>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `MutationResult` held by the R template. You can use `MutationResultWrapper` to get the returned information. See the corresponding section in [insert()](insert().md#MutationResultWrapper) for more information about `MutationResultWrapper`.

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.MutationResult;

DeleteParam param = DeleteParam.newBuilder()
        .withCollectionName(collectionName)
        .withPartitionName(partitionName)
        .withExpr("id in [100, 200, 300]")
        .build();
R<MutationResult> response = milvusClient.delete(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

