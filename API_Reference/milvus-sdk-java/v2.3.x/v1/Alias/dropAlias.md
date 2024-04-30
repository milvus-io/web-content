# dropAlias()

A MilvusClient interface. This method drops an alias for the specified collection.

```java
R<RpcStatus> dropAlias(DropAliasParam requestParam);
```

## DropAliasParam

Use the `DropAliasParam.Builder` to construct a `DropAliasParam` object.

```java
import io.milvus.param.DropAliasParam;
DropAliasParam.Builder builder = DropAliasParam.newBuilder();
```

Methods of `DropAliasParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withAlias(String alias)</td>
        <td>Sets the collection alias. The alias cannot be empty or null.</td>
        <td>alias: The alias to drop.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a CreateAliasParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DropAliasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
