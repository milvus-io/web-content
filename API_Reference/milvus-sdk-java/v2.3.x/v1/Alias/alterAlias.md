# alterAlias()

A MilvusClient interface. This method alters an alias from one collection to another.

```java
R<RpcStatus> alterAlias(AlterAliasParam requestParam);
```

## AlterAliasParam

Use the `AlterAliasParam.Builder` to construct an `AlterAliasParam` object.

```java
import io.milvus.param.AlterAliasParam;
AlterAliasParam.Builder builder = AlterAliasParam.newBuilder();
```

Methods of `AlterAliasParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the target collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the target collection to alter the alias to.</td>
    </tr>
    <tr>
        <td>withAlias(String alias)</td>
        <td>Sets the collection alias to alter. Collection alias cannot be empty or null.</td>
        <td>alias: The alias to alter.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a CreateAliasParam object.</td>
        <td>null</td>
    </tr>
</table>

The `AlterAliasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
