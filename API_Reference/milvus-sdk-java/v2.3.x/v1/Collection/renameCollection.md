# renameCollection()

A MilvusClient interface. This method renames the specified collection.

```java
R<RpcStatus> renameCollection(RenameCollectionParam requestParam)
```

## RenameCollectionParam

Use the `RenameCollectionParam.Builder` to construct a `RenameCollectionParam` object.

```java
import io.milvus.param.RenameCollectionParam;
RenameCollectionParam.Builder builder = RenameCollectionParam.newBuilder();
```

Methods of `RenameCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withOldCollectionName(String oldCollectionName)</td>
        <td>Sets the old collection name. Old collection name cannot be empty or null.</td>
        <td>oldCollectionName: The old name of the collection to rename.</td>
    </tr>
    <tr>
        <td>withNewCollectionName(String newCollectionName)</td>
        <td>Sets the new collection name. New collection name cannot be empty or null.</td>
        <td>newCollectionName: The new name of the collection to rename.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a RenameCollectionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `RenameCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

RenameCollectionParam param = RenameCollectionParam.newBuilder()
        .withOldCollectionName(OLD_COLLECTION_NAME)
        .withNewCollectionName(NEW_COLLECTION_NAME)
        .build();
R<Boolean> response = client.renameCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
