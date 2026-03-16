# delete()

A MilvusClient interface. This method deletes entity(s) based on the primary key ids.

```java
R<DeleteResponse> delete(DeleteIdsParam requestParam);
```

#### DeleteIdsParam

Use the `DeleteIdsParam.Builder` to construct a `DeleteIdsParam` object.

```java
import io.milvus.param.highlevel.dml.DeleteIdsParam;
DeleteIdsParam.Builder builder = DeleteIdsParam.newBuilder();
```

Methods of `DeleteIdsParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the target collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to insert data into.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionName(tring partitionName)</p></td>
        <td><p>Sets the partition name (Optional).</p></td>
        <td><p>partitionName: The target partition name.</p></td>
    </tr>
    <tr>
        <td><p>withPrimaryIds(List&lt;T> primaryIds)</p></td>
        <td><p>Specifies primaryField ids. PrimaryIds cannot be empty or null.<br/>Note only support the value of primary key.</p></td>
        <td><p>primaryIds: A list of primary field id.</p></td>
    </tr>
    <tr>
        <td><p>addPrimaryId(T primaryId)</p></td>
        <td><p>Specifies primaryField id. PrimaryId cannot be empty or null.<br/>Note only support the value of primary key.</p></td>
        <td><p>primaryId: The id of primary field key.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs an DeleteIdsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DeleteIdsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<DeleteResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `DeleteResponse` held by the `R` template.

#### Example

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

