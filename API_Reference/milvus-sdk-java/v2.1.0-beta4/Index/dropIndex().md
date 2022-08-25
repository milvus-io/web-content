# dropIndex()

A MilvusClient interface. This method drops an index and its corresponding index file in the collection.

```Java
R<RpcStatus> dropIndex(DropIndexParam requestParam);
```

## DropIndexParam

Use the `DropIndexParam.Builder` to construct a `DropIndexParam` object.

```Java
import io.milvus.param.DropIndexParam;
DropIndexParam.Builder builder = DropIndexParam.newBuilder();
```

Methods of `DropIndexParam.Builder`:

| Method                               | Description                                                  | Parameters                                    |
| ------------------------------------ | ------------------------------------------------------------ | --------------------------------------------- |
| `withCollectionName(collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose index needs to be dropped.     |
| `withIndexName(String indexName)`    | Sets the name of the index to drop. If no index name is specified, the default index name `_default_idx` is used. | `indexName`: The name of the index to drop. |
| `build()`                            | Constructs a `DropIndexParam` object.                      | N/A                                           |

The `DropIndexParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.


## Example

```Java
import io.milvus.param.*;

DropIndexParam param = DropIndexParam.newBuilder()
        .withCollectionName("collection1")
        .withIndexName("index1")
        .build();
R<RpcStatus> response = client.dropIndex(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
