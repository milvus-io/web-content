# createAlias()

A MilvusClient interface. This method creates an alias for a collection. Alias cannot be duplicated. Same alias cannot be assigned to different collections. Instead, you can specify multiple aliases for each collection.

```Java
R<RpcStatus> createAlias(CreateAliasParam requestParam);
```

## CreateAliasParam

Use the `CreateAliasParam.Builder` to construct a `CreateAliasParam` object.

```Java
import io.milvus.param.CreateAliasParam;
CreateAliasParam.Builder builder = CreateAliasParam.newBuilder();
```

Methods of `CreateAliasParam.Builder`:

| Method                                       | Description                                                  | Parameters                                                   |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName( String collectionName)` | Sets the target collection name. Collection name cannot be empty or null. | `collectionName`: The name of the collection to create an alias for. |
| `withAlias(String alias)`                    | Sets the collection alias. Collection alias cannot be empty or null. | `alias`: The alias to create for the target collection.                 |
| `build()`                                    | Constructs a `CreateAliasParam` object.                      |   N/A                                                        |

`CreateAliasParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

CreateAliasParam param = CreateAliasParam.newBuilder()
        .withCollectionName("collection1")
        .withAlias("alias1")
        .build();
R<RpcStatus> response = client.createAlias(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
