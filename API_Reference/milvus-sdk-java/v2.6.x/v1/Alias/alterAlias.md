# alterAlias()

A MilvusClient interface. This method alters an alias from one collection to another.

```java
R<RpcStatus> alterAlias(AlterAliasParam requestParam);
```

#### AlterAliasParam

Use the `AlterAliasParam.Builder` to construct an `AlterAliasParam` object.

```java
import io.milvus.param.AlterAliasParam;
AlterAliasParam.Builder builder = AlterAliasParam.newBuilder();
```

Methods of `AlterAliasParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p><br/>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the target collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the target collection to alter the alias to.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withAlias(String alias)</p></td>
        <td><p>Sets the collection alias to alter. Collection alias cannot be empty or null.</p></td>
        <td><p>alias: The alias to alter.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a CreateAliasParam object.</p></td>
        <td></td>
    </tr>
</table>

The `AlterAliasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

AlterAliasParam param = AlterAliasParam.newBuilder()
        .withCollection(COLLECTION_NAME)
        .withAlias("alias1")
        .build();
R<RpcStatus> response = client.alterAlias(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
