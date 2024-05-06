# createAlias()

A MilvusClient interface. This method creates an alias for a collection. Alias cannot be duplicated. The same alias cannot be assigned to different collections. Instead, you can specify multiple aliases for each collection.

```java
R<RpcStatus> createAlias(CreateAliasParam requestParam);
```

## CreateAliasParam

Use the `CreateAliasParam.Builder` to construct a `CreateAliasParam` object.

```java
import io.milvus.param.CreateAliasParam;
CreateAliasParam.Builder builder = CreateAliasParam.newBuilder();
```

Methods of `CreateAliasParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(<br/>String collectionName)</td>
        <td>Sets the target collection name. <br/>Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the target collection to create an alias for.</td>
    </tr>
    <tr>
        <td>withAlias(String alias)</td>
        <td>Sets the collection alias.<br/>Collection alias cannot be empty or null.</td>
        <td>alias: The alias of the target collection.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a CreateAliasParam object.</td>
        <td>N/A</td>
    </tr>
</table>

`CreateAliasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
