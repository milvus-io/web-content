# dropAlias()

A MilvusClient interface. This method drops an alias for the specified collection.

```java
R<RpcStatus> dropAlias(DropAliasParam requestParam);
```

#### DropAliasParam

Use the `DropAliasParam.Builder` to construct a `DropAliasParam` object.

```java
import io.milvus.param.DropAliasParam;
DropAliasParam.Builder builder = DropAliasParam.newBuilder();
```

Methods of `DropAliasParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withAlias(String alias)</p></td>
        <td><p>Sets the collection alias. <br/>The alias cannot be empty or null.</p></td>
        <td><p>alias: The alias to drop.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a CreateAliasParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DropAliasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

DropAliasParam param = DropAliasParam.newBuilder()
        .withAlias("alias1")
        .build();
R<RpcStatus> response = client.dropAlias(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
