# createAlias()

A MilvusClient interface. This method creates an alias for a collection. Alias cannot be duplicated. The same alias cannot be assigned to different collections. Instead, you can specify multiple aliases for each collection.

```java
R<RpcStatus> createAlias(CreateAliasParam requestParam);
```

#### CreateAliasParam

Use the `CreateAliasParam.Builder` to construct a `CreateAliasParam` object.

```java
import io.milvus.param.CreateAliasParam;
CreateAliasParam.Builder builder = CreateAliasParam.newBuilder();
```

Methods of `CreateAliasParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(<br/>String collectionName)</p></td>
        <td><p>Sets the target collection name. <br/>Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the target collection to create an alias for.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withAlias(String alias)</p></td>
        <td><p>Sets the collection alias.<br/>Collection alias cannot be empty or null.</p></td>
        <td><p>alias: The alias of the target collection.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a CreateAliasParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

`CreateAliasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

CreateAliasParam param = CreateAliasParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withAlias("alias1")
        .build();
R<RpcStatus> response = client.createAlias(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
