# renameCollection()

A MilvusClient interface. This method renames the specified collection.

```java
R<RpcStatus> renameCollection(RenameCollectionParam requestParam)
```

#### RenameCollectionParam

Use the `RenameCollectionParam.Builder` to construct a `RenameCollectionParam` object.

```java
import io.milvus.param.RenameCollectionParam;
RenameCollectionParam.Builder builder = RenameCollectionParam.newBuilder();
```

Methods of `RenameCollectionParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withOldCollectionName(String oldCollectionName)</p></td>
        <td><p>Sets the old collection name. Old collection name cannot be empty or null.</p></td>
        <td><p>oldCollectionName: The old name of the collection to rename.</p></td>
    </tr>
    <tr>
        <td><p>withNewCollectionName(String newCollectionName)</p></td>
        <td><p>Sets the new collection name. New collection name cannot be empty or null.</p></td>
        <td><p>newCollectionName: The new name of the collection to rename.</p></td>
    </tr>
    <tr>
        <td><p>withOldDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name of the old collection. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withNewDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name of the new collection. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a RenameCollectionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `RenameCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

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
