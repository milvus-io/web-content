# alterAlias()

A MilvusClient interface. This method alters an alias from one collection to another.

```Java
R<RpcStatus> alterAlias(AlterAliasParam requestParam);
```

## AlterAliasParam

Use the `AlterAliasParam.Builder` to construct an `AlterAliasParam` object.

```Java
import io.milvus.param.AlterAliasParam;
AlterAliasParam.Builder builder = AlterAliasParam.newBuilder();
```

Methods of `AlterAliasParam.Builder`:

| Method                                      | Description                                                  | Parameters                                                   |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | Sets the target collection name. Collection name cannot be empty or null. | `collectionName`: The name of the target collection to alter the alias to. |
| `withAlias(String alias)`                   | Sets the collection alias to alter. Collection alias cannot be empty or null. | `alias`: The alias to alter.                                 |
| `build()`                                   | Constructs a `AlterAliasParam` object.                      |     N/A                                                  |

The `AlterAliasParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.``Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

AlterAliasParam param = AlterAliasParam.newBuilder()
        .withCollection("collection1")
        .withAlias("alias1")
        .build();
R<RpcStatus> response = client.alterAlias(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

