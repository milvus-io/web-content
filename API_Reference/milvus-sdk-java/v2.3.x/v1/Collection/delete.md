# delete()

A MilvusClient interface. This method deletes entity(s) based on the primary key ids.

```java
R<DeleteResponse> delete(DeleteIdsParam requestParam);
```

## DeleteIdsParam

Use the `DeleteIdsParam.Builder` to construct a `DeleteIdsParam` object.

```java
import io.milvus.param.highlevel.dml.DeleteIdsParam;
DeleteIdsParam.Builder builder = DeleteIdsParam.newBuilder();
```

Methods of `DeleteIdsParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the target collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td>withPartitionName(tring partitionName)</td>
        <td>Sets the partition name (Optional).</td>
        <td>partitionName: The target partition name.</td>
    </tr>
    <tr>
        <td>withPrimaryIds(List<T> primaryIds)</td>
        <td>Specifies primaryField ids. PrimaryIds cannot be empty or null.<br/>Note only support the value of primary key.</td>
        <td>primaryIds: A list of primary field id.</td>
    </tr>
    <tr>
        <td>addPrimaryId(T primaryId)</td>
        <td>Specifies primaryField id. PrimaryId cannot be empty or null.<br/>Note only support the value of primary key.</td>
        <td>primaryId: The id of primary field key.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs an DeleteIdsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DeleteIdsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DeleteResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `DeleteResponse` held by the `R` template.

## Example

```java
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

