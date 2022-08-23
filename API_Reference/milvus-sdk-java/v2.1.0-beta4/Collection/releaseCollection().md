# releaseCollection()

A MilvusClient interface. This method releases the specified collection and all data within it from memory.

```Java
R<RpcStatus> releaseCollection(ReleaseCollectionParam requestParam);
```

## ReleaseCollectionParam

Use the `ReleaseCollectionParam.Builder` to construct a `ReleaseCollectionParam` object.

```Java
import io.milvus.param.ReleaseCollectionParam;
ReleaseCollectionParam.Builder builder = ReleaseCollectionParam.newBuilder();
```

Methods of `ReleaseCollectionParam.Builder`:

| Method                                      | Description                                                  | Parameters                                               |
| ------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `withCollectionName(String collectionName)` | Sets the collection name. Collection name cannot be empty or null. | `collectionName`: The name of the collection to release. |
| `build()`                                   | Constructs a `ReleaseCollectionParam` object                 | N/A                                                      |

The `ReleaseCollectionParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the api fails on the server side, it returns the error code and message from the server.

- If the api fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the api succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

ReleaseCollectionParam param = ReleaseCollectionParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<Boolean> response = client.releaseCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

