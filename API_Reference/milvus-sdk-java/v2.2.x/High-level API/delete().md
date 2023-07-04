# delete()

A MilvusClient interface. This method deletes entity(s) based on their primary keys.

```Java
R<DeleteResponse> delete(DeleteIdsParam requestParam);
```

## DeleteIdsParam

Use the `DeleteIdsParam.Builder` to construct a `DeleteIdsParam` object.

```Java
import io.milvus.param.highlevel.dml.DeleteIdsParam;
DeleteIdsParam.Builder builder = DeleteIdsParam.newBuilder();
```

Methods of `DeleteIdsParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the target collection name.<br>The value cannot be empty or null. | `collectionName`: Name of the collection from which the entities specified by their primary keys are to be deleted. |
| `withPrimaryIds(List<T> primaryIds)` | Sets the IDs of the entities to be deleted.<br>The value cannot be empty or null. | `primaryIds`: A list of primary keys of the entities to be deleted. |
| `addPrimaryId(T primaryId)` | Sets the ID of the entity you want to delete.<br>The value cannot be empty or null.<br>Use only the values of the primary key. | `primaryId`: ID of the entity you want to delete. |
| `build()` | Constructs a `DeleteIdsParam` object. | N/A |

The `DeleteIdsParam.Builder.build()` method can throw the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DeleteResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns a valid `DeleteResponse` held by the R template. 

## Example

```Java
import io.milvus.param.highlevel.*;
import io.milvus.response.MutationResultWrapper;
import io.milvus.grpc.MutationResult;

List<String> ids = Lists.newArrayList("441966745769900131", "441966745769900133");
DeleteIdsParam param = DeleteIdsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withPrimaryIds(ids)
        .build();
        
R<DeleteResponse> response = client.delete(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

for (Object deleteId : response.getData().getDeleteIds()) {
    System.out.println(deleteId);
}
```
